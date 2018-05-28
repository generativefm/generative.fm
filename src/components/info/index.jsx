import React from 'react';
import PropTypes from 'prop-types';
import renderHtml from 'react-render-html';
import './styles.scss';

const Info = ({ title, description }) => (
  <div>
    <h2 className="title">{title}</h2>
    <div className="description">{renderHtml(description)}</div>
  </div>
);

Info.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Info;
