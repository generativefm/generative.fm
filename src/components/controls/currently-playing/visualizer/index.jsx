import React, { Component, createRef } from 'react';
import propTypes from 'prop-types';
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
    const visualization = createVisualization(this.containerElement.current);
    if (this.props.isRunning) {
      visualization.start();
    }
    this.setState({
      visualization,
    });
  }
  componentWillUnmount() {
    this.state.visualization.stop();
  }
  componentDidUpdate(previousProps) {
    if (previousProps.isRunning && !this.props.isRunning) {
      this.state.visualization.stop();
    } else if (!previousProps.isRunning && this.props.isRunning) {
      this.state.visualization.start();
    }
  }
}

VisualizerComponent.propTypes = {
  isRunning: propTypes.bool,
};

VisualizerComponent.defaultProps = {
  isRunning: true,
};

export default VisualizerComponent;
