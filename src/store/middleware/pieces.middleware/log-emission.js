import uuid from 'uuid/v4';
import isProduction from '@config/is-production';

const EMISSION_API_ENDPOINT = 'https://stats.api.generative.fm/v1/emissions';
const STORAGE_KEY = 'emission-queue';

let storedQueue;
try {
  storedQueue = JSON.parse(localStorage.getItem(STORAGE_KEY));
} catch (error) {
  // do nothing
}

const queue = storedQueue || [];
let postInProgress = false;

const maybeSendEmissions = () => {
  if (!postInProgress) {
    postInProgress = true;
    const emissions = queue.slice(0, 25);
    fetch(EMISSION_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emissions }),
    })
      .then(response => {
        if (response.ok) {
          emissions.forEach(e => {
            const index = queue.indexOf(e);
            queue.splice(index, 1);
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
        }
        postInProgress = false;
        if (response.ok && queue.length > 0) {
          maybeSendEmissions();
        }
      })
      .catch(() => {
        postInProgress = false;
      });
  }
};

if (queue.length > 0) {
  maybeSendEmissions();
}

const logEmission = ({ startTime, endTime, pieceId, userId }) => {
  if (!isProduction) {
    return;
  }

  const emission = {
    emissionId: uuid(),
    startTime,
    endTime,
    pieceId,
    userId,
  };
  queue.push(emission);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  maybeSendEmissions();
};

export default logEmission;
