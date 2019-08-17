import React, { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import { react, visualizations } from '@generative-music/visualizer';
import pieces from '@pieces';
import FavoriteButton from '@containers/favorite-button.container';
import MoreButton from '@components/shared/more-button';
import './currently-playing.scss';

const DEFAULT_VISUALIZATION_TYPE = 'squareCut';
const { Static, Animated } = react;

const CurrentlyPlayingComponent = ({ selectedPieceId, isPlaying }) => {
  const hasSelection = selectedPieceId !== null;
  const { title, visualizationType } = hasSelection
    ? pieces.find(({ id }) => id === selectedPieceId)
    : { title: '', visualizationType: DEFAULT_VISUALIZATION_TYPE };
  const containerRef = useRef(null);
  const [animator, setAnimator] = useState(null);
  const [height, setHeight] = useState(null);
  const [drawCanvas, setDrawCanvas] = useState(
    () => visualizations[visualizationType].drawCanvas
  );
  useEffect(() => {
    if (isPlaying) {
      setAnimator(
        visualizations[visualizationType].animators.makeEndlessAnimator({
          height, // used for partialLattice
          width: height, // used for partialLattice
          getAnimationDuration: () => Math.random() * 10000 + 10000, // used for partialLattice
          animationDuration: 30 * 1000, // used for squareCut
          now: Date.now,
        })
      );
    } else {
      setAnimator(null);
    }
    setDrawCanvas(() => visualizations[visualizationType].drawCanvas);
  }, [isPlaying, visualizationType]);

  useEffect(() => {
    setHeight(containerRef.current.clientHeight);
  }, [containerRef]);

  const visualizer =
    isPlaying && animator !== null ? (
      <Animated
        width={height}
        height={height}
        animator={animator}
        drawCanvas={drawCanvas}
      />
    ) : (
      <Static
        width={height}
        height={height}
        drawCanvas={drawCanvas}
        config={{}}
      />
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
