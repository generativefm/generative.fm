import React, { useEffect, useState } from 'react';
import Tone from 'tone';
import classNames from 'classnames';
import streamDestination from '@store/middleware/stream-destination';
import './air-play.scss';

const WEBKIT_PLAYBACK_TARGET_AVAILABILITY_CHANGED_EVENT =
  'webkitplaybacktargetavailabilitychanged';

const WEBKIT_CURRENT_PLAYBACK_TARGET_IS_WIRELESS_CHANGED_EVENT =
  'webkitcurrentplaybacktargetiswirelesschanged';

const AirPlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [audioEl, setAudioEl] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleWebkitPlaybackTargetAvailabilityChanged = event => {
    if (event.availability === 'available') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const makeHandleWebkitCurrentPlaybackTargetIsWirelessChanged = audio => () => {
    const isWireless = Boolean(audio.webkitCurrentPlaybackTargetIsWireless);
    Tone.master.mute = isWireless;
    setIsConnected(isWireless);
  };

  useEffect(() => {
    if (window.WebKitPlaybackTargetAvailabilityEvent) {
      const audio = document.createElement('audio');
      audio.srcObject = streamDestination.stream;
      setAudioEl(audio);

      audio.addEventListener(
        WEBKIT_PLAYBACK_TARGET_AVAILABILITY_CHANGED_EVENT,
        handleWebkitPlaybackTargetAvailabilityChanged
      );

      const handleWebkitCurrentPlaybackTargetIsWirelessChanged = makeHandleWebkitCurrentPlaybackTargetIsWirelessChanged(
        audio
      );

      audio.addEventListener(
        WEBKIT_CURRENT_PLAYBACK_TARGET_IS_WIRELESS_CHANGED_EVENT,
        handleWebkitCurrentPlaybackTargetIsWirelessChanged
      );

      return () => {
        audio.removeEventListener(
          WEBKIT_PLAYBACK_TARGET_AVAILABILITY_CHANGED_EVENT,
          handleWebkitPlaybackTargetAvailabilityChanged
        );
        audio.removeEventListener(
          WEBKIT_CURRENT_PLAYBACK_TARGET_IS_WIRELESS_CHANGED_EVENT,
          handleWebkitCurrentPlaybackTargetIsWirelessChanged
        );
      };
    }
    //eslint-disable-next-line no-empty-function
    return () => {};
  }, []);

  const showPlaybackTargetPicker = () => {
    audioEl.webkitShowPlaybackTargetPicker();
  };

  return (
    isVisible && (
      <svg
        version="1.1"
        id="text-OL"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 125 125"
        xmlSpace="preserve"
        className={classNames('airplay', {
          'airplay--is-connected': isConnected,
        })}
        onClick={showPlaybackTargetPicker}
      >
        <title>AirPlay</title>
        <rect className="st0" width="125" height="125" />
        <g id="_Group_">
          <g id="_Group_2">
            <path
              id="_Path_"
              className="st1"
              d="M43.5,84.1l1.3-1.5c0.3-0.3,0.3-0.8,0-1.1c-10.5-9.7-11.2-26.2-1.4-36.7s26.2-11.2,36.7-1.4s11.2,26.2,1.4,36.7c-0.5,0.5-0.9,1-1.4,1.4c-0.3,0.3-0.3,0.8,0,1.1l1.3,1.5c0.3,0.3,0.8,0.3,1.1,0.1c0,0,0,0,0,0c12-11.1,12.7-29.7,1.7-41.7c-11.1-12-29.7-12.7-41.7-1.7s-12.7,29.7-1.7,41.7c0.5,0.6,1.1,1.1,1.7,1.7C42.8,84.4,43.2,84.4,43.5,84.1z"
            />
            <path
              id="_Path_2"
              className="st1"
              d="M44.8,62.5c0-9.7,7.9-17.6,17.6-17.6S80,52.9,80,62.6c0,4.8-2,9.5-5.5,12.8c-0.3,0.3-0.3,0.8,0,1.1l1.3,1.5c0.3,0.3,0.8,0.4,1.1,0.1c0,0,0,0,0,0c8.5-8,8.9-21.3,1-29.8s-21.3-8.9-29.8-1S39.1,68.5,47,77c0.3,0.3,0.6,0.7,1,1c0.3,0.3,0.8,0.3,1.1,0c0,0,0,0,0,0l1.3-1.5c0.3-0.3,0.3-0.8,0-1.1C46.9,72.1,44.8,67.4,44.8,62.5z"
            />
            <path
              id="_Path_3"
              className="st1"
              d="M53.2,62.5c0-5.1,4.1-9.2,9.2-9.2c5.1,0,9.2,4.1,9.2,9.2c0,2.5-1,4.8-2.8,6.6c-0.3,0.3-0.3,0.8,0,1.1l1.3,1.5c0.3,0.3,0.8,0.3,1.1,0c0,0,0,0,0,0c5-4.9,5.2-12.9,0.3-18s-12.9-5.2-18-0.3s-5.2,12.9-0.3,18c0.1,0.1,0.2,0.2,0.3,0.3c0.3,0.3,0.8,0.3,1.1,0c0,0,0,0,0,0l1.3-1.5c0.3-0.3,0.3-0.8,0-1.1C54.2,67.4,53.2,65,53.2,62.5z"
            />
          </g>
          <path
            id="_Path_4"
            className="st1"
            d="M80.9,89.1L63.5,69.3c-0.5-0.6-1.3-0.6-1.9-0.1c0,0-0.1,0.1-0.1,0.1L43.9,89.1c-0.4,0.5-0.4,1.2,0.1,1.7c0.2,0.2,0.5,0.3,0.7,0.3h35.3c0.6,0,1.2-0.5,1.2-1.2C81.2,89.6,81.1,89.3,80.9,89.1z"
          />
        </g>
      </svg>
    )
  );
};

export default AirPlay;
