import React, { useState, useRef } from 'react';
import propTypes from 'prop-types';
import Popover from 'react-tiny-popover';
import isMobile from '@config/is-mobile';
import TimerConfigContainer from '@containers/timer-config.container';
import {
  faPlay,
  faRandom,
  faStepBackward,
  faStepForward,
  faStop,
  faHourglassStart,
  faHourglassHalf,
  faHourglassEnd,
} from '@fortawesome/free-solid-svg-icons';
import ControlButtonComponent from '../control-button';
import './main-controls.scss';

const getTimerIcon = ({ lastDurationsMS, remainingMS }) => {
  const [lastDurationMS] = lastDurationsMS;
  const percentComplete = remainingMS / lastDurationMS;

  if (percentComplete >= 0.66) {
    return faHourglassStart;
  } else if (percentComplete >= 0.33) {
    return faHourglassHalf;
  }
  return faHourglassEnd;
};

const makePrimaryButton = (faIcon, onClick) =>
  function PrimaryButtonComponent() {
    return (
      <ControlButtonComponent
        faIcon={faIcon}
        onClick={onClick}
        isPrimary={true}
      />
    );
  };

const MainControlsComponent = ({
  isPlaying,
  isShuffleActive,
  enableShuffle,
  disableShuffle,
  onPreviousClick,
  onNextClick,
  onStopClick,
  onPlayClick,
  isRecordingGenerationInProgress,
  timer,
}) => {
  if (isRecordingGenerationInProgress) {
    return <div className="main-controls">Generating recording...</div>;
  }

  const [isPopoverOpen, setIsPopoverOpen] = useState(true);
  const timerConfigContainerRef = useRef(null);

  const toggleIsPopoverOpen = () => {
    setIsPopoverOpen(val => !val);
  };
  const PrimaryButtonComponent = isPlaying
    ? makePrimaryButton(faStop, onStopClick)
    : makePrimaryButton(faPlay, onPlayClick);

  const isTimerButton = el =>
    el &&
    el.type === 'button' &&
    typeof el.className === 'string' &&
    el.className.includes('timer-box');

  return (
    <div className="main-controls">
      <Popover
        isOpen={isPopoverOpen}
        content={
          <div className="timer-popover-content" ref={timerConfigContainerRef}>
            <TimerConfigContainer />
          </div>
        }
        onClickOutside={event => {
          if (!isTimerButton(event.target)) {
            setIsPopoverOpen(false);
          }
        }}
        transitionDuration="0"
        contentLocation={({ targetRect, popoverRect }) => ({
          top: targetRect.top - popoverRect.height - 5,
          left: targetRect.x + targetRect.width / 2 - popoverRect.width / 2,
        })}
      >
        <ControlButtonComponent
          faIcon={getTimerIcon(timer)}
          onClick={toggleIsPopoverOpen}
          isActive={timer.remainingMS > 0}
        />
      </Popover>
      <ControlButtonComponent
        faIcon={faStepBackward}
        onClick={onPreviousClick}
      />
      <PrimaryButtonComponent />
      <ControlButtonComponent faIcon={faStepForward} onClick={onNextClick} />
      {!isMobile && (
        <ControlButtonComponent
          faIcon={faRandom}
          onClick={isShuffleActive ? disableShuffle : enableShuffle}
          isActive={isShuffleActive}
        />
      )}
    </div>
  );
};

MainControlsComponent.propTypes = {
  isPlaying: propTypes.bool.isRequired,
  isShuffleActive: propTypes.bool.isRequired,
  isRecordingGenerationInProgress: propTypes.bool.isRequired,
  enableShuffle: propTypes.func.isRequired,
  disableShuffle: propTypes.func.isRequired,
  onPreviousClick: propTypes.func.isRequired,
  onNextClick: propTypes.func.isRequired,
  onStopClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
};

export default MainControlsComponent;
