import React from 'react';
import { Link } from 'react-router-dom';
import pieces from '../../pieces';
import './styles.scss';

const TrackSelector = () => (
  <div className="track-selector">
    <h1 className="title">Generative Music</h1>
    <h2 className="subtitle">Select a piece</h2>
    <ul className="track-list">
      {pieces.map((piece, i) => (
        <li className="track-list__track" key={i}>
          <Link to={`/${piece.link}`}>{piece.title}</Link>
        </li>
      ))}
    </ul>
    <h2 className="subtitle">What is generative music?</h2>
    <div className="description">
      Generative music is a term popularized by Brian Eno to describe music that
      is ever-different and changing, and that is created by a system.
    </div>
  </div>
);

export default TrackSelector;
