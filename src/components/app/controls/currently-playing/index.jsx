import React, { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import { react, animators } from '@generative-music/visualizer';
import pieces from '@pieces';
import FavoriteButton from '@containers/favorite-button.container';
import MoreButton from '@components/shared/more-button';
import './currently-playing.scss';

const { Static, Animated } = react;

const CurrentlyPlayingComponent = ({ selectedPieceId, isPlaying }) => {
  const hasSelection = selectedPieceId !== null;
  const { title } = hasSelection
    ? pieces.find(({ id }) => id === selectedPieceId)
    : { artist: '', title: '' };
  const containerRef = useRef(null);
  const [animator, setAnimator] = useState(null);
  const [height, setHeight] = useState(null);
  useEffect(() => {
    if (isPlaying) {
      setAnimator(
        animators.makeEndlessAnimator({
          animationDuration: 30 * 1000,
          now: Date.now,
        })
      );
    } else {
      setAnimator(null);
    }
  }, [isPlaying]);

  useEffect(() => {
    setHeight(containerRef.current.clientHeight);
  }, [containerRef]);

  const visualizer =
    isPlaying && animator !== null ? (
      <Animated width={height} height={height} animator={animator} />
    ) : (
      <Static width={height} height={height} />
    );

  return (
    <div className="currently-playing" ref={containerRef}>
      <div className="currently-playing__visualizer">
        {hasSelection && visualizer}
      </div>
      <div className="currently-playing__info">
        {hasSelection && (
          <div className="currently-playing__info__title">{title}</div>
        )}
        {hasSelection && (
          <div className="currently-playing__info__btns">
            <FavoriteButton
              className="currently-playing__info__btns__btn"
              pieceId={selectedPieceId}
            />
            <MoreButton
              className="currently-playing__info__btns__btn"
              pieceId={selectedPieceId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

CurrentlyPlayingComponent.propTypes = {
  selectedPieceId: propTypes.string,
  isPlaying: propTypes.bool.isRequired,
};

export default CurrentlyPlayingComponent;
