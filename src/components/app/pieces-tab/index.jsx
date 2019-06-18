import React from 'react';
import propTypes from 'prop-types';
import { Redirect, Link } from 'react-router';
import pieces from '@pieces';
import piecesById from '@pieces/by-id';
import LinkButton from '@components/shared/link-button';
import Dropdown from './drop-down';
import Piece from './piece';
import tags from '@pieces/tags';
import sortings from '@pieces/sortings';
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
  history,
  sorting,
  changeSorting,
  state,
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
  } else if (filter === 'all') {
    filteredPieces = pieces;
  } else if (filter === 'favorites') {
    filteredPieces = pieces.filter(({ id }) => favorites.has(id));
  } else {
    filteredPieces = pieces.filter(piece =>
      piece.tags.some(tag => tag === filter)
    );
  }

  const clearAndChangeFilter = (newFilter = 'all') => {
    changeFilter(newFilter);
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  if (filteredPieces.length === 0) {
    changeFilter('all');
    return <Redirect to="/" />;
  }

  const currentSorting = sortings[sorting.key];

  filteredPieces = currentSorting.fn(filteredPieces, state);
  if (sorting.isReversed) {
    filteredPieces.reverse();
  }

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
          <span>
            viewing{' '}
            <Dropdown
              selected={filter}
              options={['all']
                .concat(favorites.size > 0 ? ['favorites'] : [])
                .concat(tags)}
              onSelect={newFilter => clearAndChangeFilter(newFilter)}
            />
            {filteredPieces.length > 1 && (
              <span>
                {' '}
                sorted by{' '}
                <Dropdown
                  selected={currentSorting.label}
                  options={Reflect.ownKeys(sortings).map(
                    key => sortings[key].label
                  )}
                  onSelect={newSortingLabel => {
                    if (newSortingLabel !== currentSorting.label) {
                      const key = Reflect.ownKeys(sortings).find(
                        sortingKey =>
                          sortings[sortingKey].label === newSortingLabel
                      );
                      changeSorting(key);
                    }
                  }}
                />{' '}
                (
                <Dropdown
                  selected={
                    sorting.isReversed
                      ? currentSorting.reverseDirectionLabel
                      : currentSorting.defaultDirectionLabel
                  }
                  options={[
                    currentSorting.defaultDirectionLabel,
                    currentSorting.reverseDirectionLabel,
                  ]}
                  onSelect={newDirectionLabel =>
                    changeSorting(
                      sorting.key,
                      newDirectionLabel === currentSorting.reverseDirectionLabel
                    )
                  }
                />
                )
              </span>
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
              isDisabled={isRecordingGenerationInProgress}
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
};

export default PiecesTabComponent;
