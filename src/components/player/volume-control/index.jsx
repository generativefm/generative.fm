import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OverflowZone from './overflow-zone';
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
    this.state = { mouseDown: false };
    this.controlRef = React.createRef();
    this.getVolumePctForClientY = makeGetVolumePctForClientY(
      this.controlRef,
      this.props.onChange
    );

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.activate = this.activate.bind(this);
    this.handleDragEvent = this.handleDragEvent.bind(this);
  }
  render() {
    return (
      <div>
        <OverflowZone
          handleMouseDown={this.handleMouseDown}
          handleDragEvent={this.handleDragEvent}
        />
        <div
          className="volume-control"
          onMouseDown={this.handleMouseDown}
          onDragStart={this.handleDragEvent}
          onDrag={this.handleDragEvent}
          ref={this.controlRef}
          title="Volume"
        >
          <div
            className="volume-level"
            style={{ height: `${this.props.pctFilled}%` }}
            onDragStart={this.handleDragEvent}
            onDrag={this.handleDragEvent}
          />
        </div>
        <OverflowZone
          handleMouseDown={this.handleMouseDown}
          handleDragEvent={this.handleDragEvent}
        />
      </div>
    );
  }
  handleMouseDown(event) {
    if (event.button === 0) {
      this.activate();
    }
  }
  handleDragEvent(event) {
    event.preventDefault();
    this.activate();
  }
  activate() {
    this.setState({ mouseDown: true });
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  handleMouseMove(event) {
    if (this.state.mouseDown) {
      this.setVolumePctForEvent(event);
    }
  }
  handleMouseUp(event) {
    if (event.button === 0) {
      window.removeEventListener('mouseup', this.handleMouseUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
      this.setVolumePctForEvent(event);
      this.setState({ mouseDown: false });
    }
  }
  setVolumePctForEvent(event) {
    this.props.onChange(this.getVolumePctForClientY(event.clientY));
  }
}

VolumeControl.propTypes = {
  onChange: PropTypes.func,
  pctFilled: PropTypes.number,
};

VolumeControl.defaultProps = {
  //eslint-disable-next-line no-empty-function
  onChange: () => {},
  pctFilled: 0,
};

export default VolumeControl;
