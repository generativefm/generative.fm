import React from 'react';
import { Link } from 'react-router-dom';
import pieces from '../../pieces';
import './styles.scss';

const TrackSelector = () => (
  <div className="track-selector">
    <h1 className="title">Generative Music</h1>
    <ul className="track-list">
      {pieces.map((piece, i) => (
        <li className="track-list__track" key={i}>
          <Link to={`/${piece.link}`}>{piece.title}</Link>
        </li>
      ))}
    </ul>
    <div className="alex-bainter-link">
      <a href="https://alexbainter.com">made by alex bainter</a>
    </div>
  </div>
);

export default TrackSelector;
