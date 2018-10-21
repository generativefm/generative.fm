import React, { Component, createRef } from 'react';
import createVisualization from './create-visualization';
import './visualizer.scss';

class VisualizerComponent extends Component {
  constructor(props) {
    super(props);
    this.containerElement = createRef();
  }
  render() {
    return <div className="visualizer" ref={this.containerElement} />;
  }
  componentDidMount() {
    createVisualization(this.containerElement.current);
  }
}

export default VisualizerComponent;
