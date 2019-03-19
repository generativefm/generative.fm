import React from 'react';
import { isMobile } from 'react-device-detect';
import './help-tab.scss';

const HelpTabComponent = () => (
  <div className="info-tab help-tab">
    <h2 className="help-tab__topic">
      I'm on an iOS device and I can't hear anything
    </h2>
    <p>
      Some iOS devices require silent mode to be off in order to hear the music.
      This might be resolved in a future update.
    </p>
    <h2 className="help-tab__topic">The audio pops, crackles, or snaps</h2>
    <p>
      Here's some steps you can try:
      <ol>
        {!isMobile && (
          <li>
            Try turning the site volume down and using your computer's volume
            instead.
          </li>
        )}
        {isMobile && (
          <li>
            If you're using external speakers, try turning your device's volume
            down and using your speakers' volume instead.
          </li>
        )}
        <li>
          Try listening to the pieces towards the end of the list. Some pieces
          play better than others.
        </li>
        <li>
          Try using a more powerful device
          {isMobile && ', like a desktop or laptop'}.
        </li>
      </ol>
      You can also report the issue{' '}
      <a
        href="https://github.com/generative-music/generative.fm/issues/new?title=The%20audio%20sucks&body=Please%20describe%20your%20device%2C%20operating%20system%2C%20and%20internet%20browser..."
        target="_blank"
        rel="noreferrer noopener"
      >
        on Github
      </a>{' '}
      or by sending an email to{' '}
      <a href="mailto:alex@alexbainter.com?Subject=Generative Music sucky audio">
        alex@alexbainter.com
      </a>
      .
    </p>
  </div>
);

export default HelpTabComponent;
