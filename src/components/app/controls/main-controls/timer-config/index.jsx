import React, { useState, useMemo } from 'react';
import './timer-config.scss';

const TimerConfigComponent = ({
  lastDurationsMS,
  remainingMS,
  startTimer,
  updateTimer,
  done,
}) => {
  const [customDuration, setCustomDuration] = useState('');

  const isStartDisabled = useMemo(() => {
    const parsedValue = Number.parseInt(customDuration, 10);
    return Number.isNaN(parsedValue) || parsedValue <= 0;
  }, [customDuration]);

  const startTimerAndClose = durationMS => {
    done();
    startTimer(durationMS);
  };

  return (
    <div className="timer-box">
      <h4 className="timer-box__title">Play Timer</h4>
      <ul className="last-durations">
        {lastDurationsMS.map((durationMS, i) => (
          <li key={i} className="last-durations__item">
            <button
              type="button"
              className="last-durations__item__btn"
              onClick={() => startTimerAndClose(durationMS)}
            >{`${durationMS / 60000} minutes`}</button>
          </li>
        ))}
      </ul>
      <input
        type="number"
        size={3}
        className="timer-box__input"
        value={customDuration}
        onChange={event => setCustomDuration(event.target.value)}
      />
      minutes
      <button
        type="button"
        className="timer-box__start-btn"
        disabled={isStartDisabled}
        onClick={() => startTimerAndClose(customDuration * 60 * 1000)}
      >
        Start
      </button>
    </div>
  );
};

export default TimerConfigComponent;
