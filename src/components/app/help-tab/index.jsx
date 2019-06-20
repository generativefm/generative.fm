import React from 'react';
import isMobile from '@config/is-mobile';
import isSupported from '@config/is-supported';
import './help-tab.scss';

const BadAudio = () => (
  <div>
    <h2 className="help-tab__topic">If the audio crackles or pops</h2>
    Here&apos;s some steps you can try:
    <ol>
      {!isMobile && (
        <li>
          Try turning the site volume down and using your computer&apos;s volume
          instead.
        </li>
      )}
      {isMobile && (
        <li>
          If you&apos;re using external speakers, try turning your device&apos;s
          volume down and using your speakers&apos; volume instead.
        </li>
      )}
      <li>Try another piece. Some pieces play better than others.</li>
      <li>Try using a different browser.</li>
      <li>
        Try using a more powerful device
        {isMobile && ', like a desktop or laptop'}.
      </li>
    </ol>
    You can also report issues{' '}
    <a
      href="https://github.com/generative-music/generative.fm/issues/new?title=The%20audio%20sucks&body=Please%20describe%20your%20device%2C%20operating%20system%2C%20and%20internet%20browser..."
      target="_blank"
      rel="noreferrer noopener"
    >
      on Github
    </a>{' '}
    or by sending an email to{' '}
    <a href="mailto:alex@alexbainter.com?Subject=Generative.fm%20issue">
      alex@alexbainter.com
    </a>
    .
  </div>
);

const NotSupported = () => (
  <div>
    <h2 className="help-tab__topic">Browser not supported</h2>
    Your internet browser isn&apos;t supported by Generative.fm. Make sure
    you&apos;re using the latest version, or switch to a different browser, like
    Google Chrome, Mozilla Firefox, or Safari.
    <br />
    <br /> If you think this is a mistake, you can report the issue{' '}
    <a
      href="https://github.com/generative-music/generative.fm/issues/new?title=The%20audio%20sucks&body=Please%20describe%20your%20device%2C%20operating%20system%2C%20and%20internet%20browser..."
      target="_blank"
      rel="noreferrer noopener"
    >
      on Github
    </a>{' '}
    or by sending an email to{' '}
    <a href="mailto:alex@alexbainter.com?Subject=Generative.fm%20issue">
      alex@alexbainter.com
    </a>
    .
  </div>
);

const HelpTabComponent = () => (
  <div className="centered-tab help-tab">
    {isSupported && <BadAudio />}
    {!isSupported && <NotSupported />}
  </div>
);

export default HelpTabComponent;
