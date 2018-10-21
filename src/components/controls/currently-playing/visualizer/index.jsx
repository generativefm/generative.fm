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
    this.setState({
      visualization: createVisualization(this.containerElement.current),
    });
  }
  componentWillUnmount() {
    this.state.visualization.stop();
  }
}

export default VisualizerComponent;
