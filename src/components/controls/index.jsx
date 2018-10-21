import React, { Component } from 'react';
import MainControlsComponent from './main-controls';
import './controls.scss';

class ControlsComponent extends Component {
  render() {
    return (
      <div className="controls">
        <MainControlsComponent />
      </div>
    );
  }
}

export default ControlsComponent;
