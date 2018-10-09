import React, { Component } from 'react';
import './styles.scss';

const makeGetVolumePctForClientY = controlRef => clientY => {
  const { clientHeight, offsetTop } = controlRef.current;
  const controlY = clientY - offsetTop;
  const pct = (clientHeight - controlY) / clientHeight;
  return pct > 0.005 ? 100 * pct : 0;
};

const alwaysFalse = () => false;

class VolumeControl extends Component {
  constructor(props) {
    super(props);
    this.state = { pctFilled: 75, mouseDown: false };
    this.controlRef = React.createRef();
    this.getVolumePctForClientY = makeGetVolumePctForClientY(this.controlRef);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMaxZoneMouseUp = this.handleMaxZoneMouseUp.bind(this);
    this.handleMinZoneMouseUp = this.handleMinZoneMouseUp.bind(this);
  }
  render() {
    return (
      <div>
        <div className="overflow-zone" onMouseUp={this.handleMaxZoneMouseUp} />
        <div
          className="volume-control"
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
          ref={this.controlRef}
        >
          <div
            onDragStart={alwaysFalse}
            className="volume-level"
            style={{ height: `${this.state.pctFilled}%` }}
          />
        </div>
        <div className="overflow-zone" onMouseUp={this.handleMinZoneMouseUp} />
      </div>
    );
  }
  handleMaxZoneMouseUp() {
    this.setState({ pctFilled: 100 });
  }
  handleMinZoneMouseUp() {
    this.setState({ pctFilled: 0 });
  }
  handleMouseDown(event) {
    if (event.button === 0) {
      this.setState({ mouseDown: true });
    }
  }
  handleMouseMove(event) {
    if (this.state.mouseDown) {
      this.setVolumePctForEvent(event);
    }
  }
  handleMouseUp(event) {
    if (event.button === 0) {
      this.setVolumePctForEvent(event);
      this.setState({ mouseDown: false });
    }
  }
  handleMouseLeave(event) {
    if (this.state.mouseDown) {
      this.setVolumePctForEvent(event);
      this.setState({ mouseDown: false });
    }
  }
  setVolumePctForEvent(event) {
    this.setState({ pctFilled: this.getVolumePctForClientY(event.clientY) });
  }
}

export default VolumeControl;
