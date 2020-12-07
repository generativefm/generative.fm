import React, { useState, useMemo, useCallback } from 'react';
import propTypes from 'prop-types';
import TextButton from '@components/shared/text-button';
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

  const handleDurationInputChange = useCallback(event => {
    setCustomDuration(event.target.value);
  }, []);

  return (
    <div>
      <ul className="timer-box__durations">
        {lastDurationsMS.map((durationMS, i) => (
          <li key={i} className="timer-box__durations__item">
            <button
              type="button"
              className="timer-box__durations__item__btn"
              onClick={() => handleDurationSelect(durationMS)}
              title={`Start ${durationMS / 60000}-minute timer`}
            >{`${durationMS / 60000} minutes`}</button>
          </li>
        ))}
      </ul>
      <input
        type="number"
        size={3}
        className="timer-box__input"
        value={customDuration}
        onChange={handleDurationInputChange}
        title="Timer duration in minutes"
      />
      minutes
      <TextButton
        className="timer-box__btn timer-box__btn--inline"
        isDisabled={isStartDisabled}
        onClick={() => handleDurationSelect(customDuration * 60 * 1000)}
        title={
          isStartDisabled
            ? 'Please select or enter a duration'
            : `Start ${customDuration}-minute timer`
        }
      >
        Start
      </TextButton>
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

  const handleCancelClick = useCallback(() => cancelTimer(), [cancelTimer]);

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
              onClick={() => updateTimer(addMS, true)}
              title={`Add ${addMS / 60000} minutes to timer`}
            >{`+ ${addMS / 60 / 1000} minutes`}</button>
          </li>
        ))}
      </ul>
      <TextButton
        className="timer-box__btn"
        onClick={handleCancelClick}
        title="Cancel timer and resume endless playback"
      >
        Cancel Timer
      </TextButton>
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
