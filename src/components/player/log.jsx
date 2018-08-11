import React, { Component } from 'react';
import { scrolled } from 'react-stay-scrolled';
import PropTypes from 'prop-types';

class Log extends Component {
  render() {
    return <div>{this.props.message.toLowerCase()}</div>;
  }
}

Log.propTypes = {
  scrollBottom: PropTypes.func,
  message: PropTypes.string,
};

export default scrolled(Log);
