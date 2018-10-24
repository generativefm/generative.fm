import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faInfinity,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import pieces from '../../pieces';
import './tracks-tabs.scss';

const TracksTabComponent = ({ selectedTrackId, isPlaying, onTrackClick }) => (
  <div className="tracks-tab">
    <div className="tracks-tab__table-container">
      <table className="tracks-tab__table-container__table">
        <thead>
          <tr>
            <th className="index-column">#</th>
            <th>TITLE</th>
            <th>
              <FontAwesomeIcon icon={faClock} />
            </th>
          </tr>
        </thead>
        <tbody>
          {pieces.map((piece, i) => (
            <tr
              key={piece.link}
              onClick={() => onTrackClick(piece)}
              className={classnames({
                'is-selected': selectedTrackId === piece.link,
              })}
            >
              <td className="index-column">
                {selectedTrackId === piece.link && isPlaying ? (
                  <FontAwesomeIcon icon={faVolumeUp} />
                ) : (
                  i + 1
                )}
              </td>
              <td>{piece.title}</td>
              <td>
                <FontAwesomeIcon icon={faInfinity} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

TracksTabComponent.propTypes = {
  selectedTrackId: propTypes.string,
  isPlaying: propTypes.bool.isRequired,
  onTrackClick: propTypes.func.isRequired,
};

export default TracksTabComponent;
