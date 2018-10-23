import React, { Component, createRef } from 'react';
import propTypes from 'prop-types';
import './slider.scss';

const preventDefault = event => event.preventDefault();

const calculatePct = (mouseEvent, el) => {
  const { clientWidth, offsetLeft } = el;
  const elementX = mouseEvent.clientX - offsetLeft;
  const limitedX = Math.min(clientWidth, Math.max(0, elementX));
  const pct = (limitedX / clientWidth) * 100;
  return pct;
};

class SliderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { mouseDown: false };
    this.sliderBar = createRef();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  render() {
    return (
      <div
        className="slider"
        onMouseDown={this.handleMouseDown}
        onDrag={preventDefault}
        onDragStart={preventDefault}
      >
        <div
          className="slider__bar"
          ref={this.sliderBar}
          onDrag={preventDefault}
          onDragStart={preventDefault}
        >
          <div
            className="slider__bar__level"
            style={{ width: `${this.props.pct}%` }}
            onDrag={preventDefault}
            onDragStart={preventDefault}
          />
          <div
            className="slider__bar__indicator"
            onDrag={preventDefault}
            onDragStart={preventDefault}
          />
        </div>
      </div>
    );
  }
  handleMouseDown(event) {
    if (event.button === 0) {
      this.setState({ mouseDown: true });
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }
  handleMouseMove(event) {
    this.props.onChange(calculatePct(event, this.sliderBar.current));
  }
  handleMouseUp(event) {
    if (event.button === 0) {
      this.setState({ mouseDown: false });
      this.handleMouseMove(event);
      window.removeEventListener('mouseup', this.handleMouseUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
    }
  }
}

SliderComponent.propTypes = {
  pct: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
};

export default SliderComponent;
