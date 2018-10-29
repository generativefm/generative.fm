import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faInfinity,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import pieces from '../../../pieces';
import './pieces-tab.scss';

const PiecesTabComponent = ({ selectedPieceId, isPlaying, onPieceClick }) => (
  <div className="pieces-tab">
    <div className="pieces-tab__table-container">
      <table className="pieces-tab__table-container__table">
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
              key={piece.id}
              onClick={() => onPieceClick(piece)}
              className={classnames({
                'is-selected': selectedPieceId === piece.id,
              })}
            >
              <td className="index-column">
                {selectedPieceId === piece.id && isPlaying ? (
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

PiecesTabComponent.propTypes = {
  selectedPieceId: propTypes.string,
  isPlaying: propTypes.bool.isRequired,
  onPieceClick: propTypes.func.isRequired,
};

export default PiecesTabComponent;
