import React from 'react';
import propTypes from 'prop-types';
import { applyUpdate } from 'offline-plugin/runtime';
import './audio-issues.scss';

const handleUpdateClick = e => {
  e.preventDefault();
  applyUpdate(() => {
    window.location.reload();
  });
};

const AudioIssuesTabComponent = ({ version, isUpdateAvailable, isOnline }) => (
  <div className="audio-issues-tab">
    <p>
      If you are experiencing audio issues, please try the following:
    </p>
    <p>
      1. Turn the site volume down and turn the computer volume up. If on mobile
      and using external speakers, turn the device down and the speakers up.
    </p>
    <p>
      2. Use a more powerful device. If on mobile, try using a computer instead.
    </p>
    <p>
      If the steps above do not correct the issue, or if you have questions or 
      feedback, send an email to{' '}
      <a href="mailto:alex@alexbainter.com?Subject=Generative Music">
        alex@alexbainter.com
      </a>
    </p>
    <br />
    <p>
      {`v${version}`}
      {isUpdateAvailable &&
        isOnline && (
          <span>
            {' '}
            -{' '}
            <a href="/" onClick={handleUpdateClick}>
              Load latest version
            </a>
          </span>
        )}
    </p>
    <p>
      Made by{' '}
      <a href="https://alexbainter.com" target="_noblank">
        Alex Bainter
      </a>
    </p>
  </div>
);

AudioIssuesTabComponent.propTypes = {
  version: propTypes.string,
  isUpdateAvailable: propTypes.bool,
  isOnline: propTypes.bool,
};

export default AudioIssuesTabComponent;
