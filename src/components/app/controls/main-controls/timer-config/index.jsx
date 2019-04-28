import React, { useState, useMemo } from 'react';
import propTypes from 'prop-types';
import './timer-config.scss';

const StartTimerContent = ({ lastDurationsMS, startTimer }) => {
  const [customDuration, setCustomDuration] = useState('');

  const isStartDisabled = useMemo(() => {
    const parsedValue = Number.parseInt(customDuration, 10);
    return Number.isNaN(parsedValue) || parsedValue <= 0;
  }, [customDuration]);

  const handleDurationSelect = durationMS => {
    startTimer(durationMS);
  };

  return (
    <div>
      <ul className="timer-box__durations">
        {lastDurationsMS.map((durationMS, i) => (
          <li key={i} className="timer-box__durations__item">
            <button
              type="button"
              className="timer-box__durations__item__btn"
              onClick={() => handleDurationSelect(durationMS)}
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
        className="timer-box__btn timer-box__btn--inline"
        disabled={isStartDisabled}
        onClick={() => handleDurationSelect(customDuration * 60 * 1000)}
      >
        Start
      </button>
    </div>
  );
};

StartTimerContent.propTypes = {
  lastDurationsMS: propTypes.array.isRequired,
  startTimer: propTypes.func.isRequired,
};

const ADD_MS = [1 * 60 * 1000, 3 * 60 * 1000, 5 * 60 * 1000];

const InProgressContent = ({ remainingMS, updateTimer, cancelTimer }) => {
  const remainingMinutes = Math.round(remainingMS / 60 / 1000);
  const remainingSeconds = Math.round(remainingMS / 1000);
  return (
    <div>
      <span className="timer-box__time">
        {remainingMinutes > 1
          ? `${remainingMinutes} minutes left`
          : `${remainingSeconds} seconds left`}
      </span>
      <ul className="timer-box__durations">
        {ADD_MS.map((addMS, i) => (
          <li key={i} className="timer-box__durations__item">
            <button
              type="button"
              className="timer-box__durations__item__btn"
              onClick={() => updateTimer(addMS)}
            >{`+ ${addMS / 60 / 1000} minutes`}</button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="timer-box__btn"
        onClick={() => cancelTimer()}
      >
        Cancel Timer
      </button>
    </div>
  );
};

InProgressContent.propTypes = {
  remainingMS: propTypes.number.isRequired,
  updateTimer: propTypes.func.isRequired,
  cancelTimer: propTypes.func.isRequired,
};

const TimerConfigComponent = ({
  lastDurationsMS,
  remainingMS,
  startTimer,
  updateTimer,
  cancelTimer,
}) => {
  const Content = remainingMS > 0 ? InProgressContent : StartTimerContent;
  return (
    <div className="timer-box">
      <h4 className="timer-box__title">Play Timer</h4>
      <Content
        lastDurationsMS={lastDurationsMS}
        startTimer={startTimer}
        remainingMS={remainingMS}
        updateTimer={updateTimer}
        cancelTimer={cancelTimer}
      />
    </div>
  );
};

TimerConfigComponent.propTypes = {
  lastDurationsMS: propTypes.array.isRequired,
  remainingMS: propTypes.number.isRequired,
  startTimer: propTypes.func.isRequired,
  updateTimer: propTypes.func.isRequired,
  cancelTimer: propTypes.func.isRequired,
};

export default TimerConfigComponent;
