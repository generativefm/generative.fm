import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OverflowZone from './overflow-zone';
import noop from '../../../util/noop';
import './styles.scss';

const makeGetVolumePctForClientY = controlRef => clientY => {
  const { clientHeight, offsetTop } = controlRef.current;
  const controlY = clientY - offsetTop;
  const pct = ((clientHeight - controlY) / clientHeight) * 100;
  return Math.min(100, Math.max(0, pct));
};

class VolumeControl extends Component {
  constructor(props) {
    super(props);
    this.state = { changing: false };
    this.controlRef = React.createRef();
    this.getVolumePctForClientY = makeGetVolumePctForClientY(
      this.controlRef,
      this.props.onChange
    );

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleDragEvent = this.handleDragEvent.bind(this);
  }
  render() {
    return (
      <div>
        <OverflowZone
          handleMouseDown={this.handleMouseDown}
          handleDragEvent={this.handleDragEvent}
          handleTouchStart={this.handleTouchStart}
        />
        <div
          className="volume-control"
          onMouseDown={this.handleMouseDown}
          onDragStart={this.handleDragEvent}
          onDrag={this.handleDragEvent}
          onTouchStart={this.handleTouchStart}
          ref={this.controlRef}
          title="Volume"
        >
          <div
            className={`volume-level${
              this.props.isMuted ? ' volume-level--is-muted' : ''
            }`}
            style={{ height: `${this.props.pctFilled}%` }}
            onDragStart={this.handleDragEvent}
            onDrag={this.handleDragEvent}
          />
        </div>
        <OverflowZone
          handleMouseDown={this.handleMouseDown}
          handleDragEvent={this.handleDragEvent}
          handleTouchStart={this.handleTouchStart}
        />
      </div>
    );
  }
  handleMouseDown(event) {
    if (event.button === 0) {
      this.activateWithMouse();
    }
  }
  handleTouchStart() {
    this.activateWithTouch();
  }
  handleDragEvent(event) {
    event.preventDefault();
    this.activateWithMouse();
  }
  activateWithMouse() {
    this.activate();
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  activateWithTouch() {
    this.activate();
    window.addEventListener('touchend', this.handleTouchEnd);
    window.addEventListener('touchmove', this.handleTouchMove);
  }
  activate() {
    this.setState({ changing: true });
  }
  handleTouchMove(event) {
    if (event.touches.length > 0) {
      this.setVolumePctForClientY(event.touches[0].clientY);
    }
  }
  handleMouseMove(event) {
    if (this.state.changing) {
      this.setVolumePctForClientY(event.clientY);
    }
  }
  handleMouseUp(event) {
    if (event.button === 0) {
      window.removeEventListener('mouseup', this.handleMouseUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
      this.deactivateAtClientY(event.clientY);
    }
  }
  handleTouchEnd(event) {
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('touchmove', this.handleTouchMove);
    this.deactivateAtClientY(event.touches[0].clientY);
  }
  deactivateAtClientY(clientY) {
    this.setVolumePctForClientY(clientY);
    this.setState({ changing: false });
  }
  setVolumePctForClientY(clientY) {
    this.props.onChange(this.getVolumePctForClientY(clientY));
  }
}

VolumeControl.propTypes = {
  onChange: PropTypes.func,
  pctFilled: PropTypes.number,
  isMuted: PropTypes.bool,
};

VolumeControl.defaultProps = {
  onChange: noop,
  pctFilled: 0,
  isMuted: false,
};

export default VolumeControl;
