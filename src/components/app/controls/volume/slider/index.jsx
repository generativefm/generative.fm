import React, { useState, useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import './slider.scss';

const preventDefault = event => event.preventDefault();

const calculatePct = (mouseEvent, el) => {
  const { clientWidth, offsetLeft } = el;
  const elementX = mouseEvent.clientX - offsetLeft;
  const limitedX = Math.min(clientWidth, Math.max(0, elementX));
  const pct = (limitedX / clientWidth) * 100;
  return pct;
};

const SliderComponent = ({ pct, onChange }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const isMouseOverRef = useRef(false);
  const sliderBarRef = useRef(null);

  const handleScroll = event => {
    if (isMouseOverRef.current) {
      preventDefault(event);
      if (event.deltaY < 0 || event.deltaX < 0) {
        onChange(Math.min(pct + 5, 100));
      } else if (event.deltaY > 0 || event.deltaX > 0) {
        onChange(Math.max(pct - 5, 0));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () =>
      window.removeEventListener('wheel', handleScroll, { passive: false });
  });

  const handleMouseMove = event => {
    onChange(calculatePct(event, sliderBarRef.current));
  };

  const handleMouseUp = event => {
    if (event.button === 0) {
      setIsMouseDown(false);
      handleMouseMove(event);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    }
  };

  const handleMouseDown = event => {
    if (event.button === 0) {
      setIsMouseDown(true);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleMouseOver = () => {
    isMouseOverRef.current = true;
  };

  const handleMouseLeave = () => {
    isMouseOverRef.current = false;
  };

  return (
    <div
      className="slider"
      onMouseDown={handleMouseDown}
      onDrag={preventDefault}
      onDragStart={preventDefault}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      title="Click or drag to change volume"
    >
      <div
        className="slider__bar"
        ref={sliderBarRef}
        onDrag={preventDefault}
        onDragStart={preventDefault}
      >
        <div
          className={classnames('slider__bar__level', {
            'slider__bar__level--active': isMouseDown,
          })}
          style={{ width: `${pct}%` }}
          onDrag={preventDefault}
          onDragStart={preventDefault}
        />
        <div
          className={classnames('slider__bar__indicator', {
            'slider__bar__indicator--active': isMouseDown,
          })}
          onDrag={preventDefault}
          onDragStart={preventDefault}
        />
      </div>
    </div>
  );
};

SliderComponent.propTypes = {
  pct: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
};

export default SliderComponent;
