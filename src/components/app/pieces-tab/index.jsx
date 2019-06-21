import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router';
import pieces from '@pieces';
import piecesById from '@pieces/by-id';
import LinkButton from '@components/shared/link-button';
import PieceFilter from './piece-filter';
import Piece from './piece';
import tags from '@pieces/tags';
import sortings from '@pieces/sortings';
import isSupported from '@config/is-supported';
import FAVORITES_FILTER from '@config/favorites-filter';
import ALL_FILTER from '@config/all-filter';
import './pieces-tab.scss';

const PiecesTabComponent = ({
  selectedPieceId,
  isPlaying,
  onPieceClick,
  onStopClick,
  onPlayClick,
  playTime,
  filter,
  pieceId,
  isLoading,
  isRecordingGenerationInProgress,
  changeFilter,
  favorites,
  sorting,
  changeSorting,
  visiblePieceIds,
  isOnline,
  cachedPieceIds,
  history,
}) => {
  let isValidSinglePiece = false;
  let filteredPieces;
  if (typeof pieceId === 'string') {
    const piece = pieces.find(({ id }) => id === pieceId);
    if (piece) {
      isValidSinglePiece = true;
      filteredPieces = [piece];
      onPieceClick(piece);
    } else {
      return <Redirect to="/" />;
    }
  } else {
    filteredPieces = visiblePieceIds.map(id => piecesById[id]);
  }

  const clearAndChangeFilter = (newFilter = ALL_FILTER) => {
    changeFilter(newFilter);
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  if (filteredPieces.length === 0) {
    changeFilter(ALL_FILTER);
    return <Redirect to="/" />;
  }

  const currentSorting = sortings[sorting.key];

  const isPieceDisabled = piece =>
    !isSupported ||
    isRecordingGenerationInProgress ||
    (!isOnline && !cachedPieceIds.has(piece.id));

  return (
    <div className="pieces-tab">
      <div className="filter-bar">
        {isValidSinglePiece ? (
          <span>
            viewing &quot;{piecesById[pieceId].title},&quot;{' '}
            <LinkButton
              title="Click to view all pieces"
              onClick={() => clearAndChangeFilter()}
            >
              click here to show all
            </LinkButton>
          </span>
        ) : (
          <span className="filter-bar__filters">
            <PieceFilter
              label="view"
              value={filter}
              options={[ALL_FILTER]
                .concat(favorites.size > 0 ? [FAVORITES_FILTER] : [])
                .concat(tags)
                .map(tag => ({ value: tag, name: tag }))}
              onChange={newFilter => clearAndChangeFilter(newFilter)}
              title="Change filter"
            />
            {filteredPieces.length > 1 && (
              <PieceFilter
                label="sorted by"
                value={sorting.key}
                options={Reflect.ownKeys(sortings).map(key => ({
                  name: sortings[key].label,
                  value: key,
                }))}
                onChange={newSorting => {
                  changeSorting(newSorting);
                }}
                title="Change sorting"
              />
            )}
            {filteredPieces.length > 1 && (
              <PieceFilter
                label="start with"
                value={sorting.isReversed}
                options={[
                  {
                    value: false,
                    name: currentSorting.defaultDirectionLabel,
                  },
                  {
                    value: true,
                    name: currentSorting.reverseDirectionLabel,
                  },
                ]}
                onChange={isReversed =>
                  changeSorting(sorting.key, isReversed === 'true')
                }
                title="Change order"
              />
            )}
          </span>
        )}
      </div>
      <div className="pieces-container">
        <div className="pieces">
          {filteredPieces.map(piece => (
            <Piece
              key={piece.id}
              piece={piece}
              playTime={playTime[piece.id]}
              isSelected={selectedPieceId === piece.id}
              isPlaying={isPlaying}
              isDisabled={isPieceDisabled(piece)}
              isLoading={isLoading}
              onPieceClick={onPieceClick}
              onPlayClick={onPlayClick}
              onStopClick={onStopClick}
              changeFilter={clearAndChangeFilter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

PiecesTabComponent.propTypes = {
  selectedPieceId: propTypes.string,
  isPlaying: propTypes.bool.isRequired,
  isRecordingGenerationInProgress: propTypes.bool.isRequired,
  onPieceClick: propTypes.func.isRequired,
  onPlayClick: propTypes.func.isRequired,
  onStopClick: propTypes.func.isRequired,
  playTime: propTypes.object.isRequired,
  isLoading: propTypes.bool.isRequired,
  filter: propTypes.string,
  pieceId: propTypes.string,
  changeFilter: propTypes.func.isRequired,
  favorites: propTypes.object.isRequired,
  sorting: propTypes.object.isRequired,
  changeSorting: propTypes.func.isRequired,
  visiblePieceIds: propTypes.array.isRequired,
  isOnline: propTypes.bool.isRequired,
  cachedPieceIds: propTypes.object.isRequired,
  history: propTypes.object.isRequired,
};

export default PiecesTabComponent;
