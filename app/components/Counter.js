import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.scss';

export default class Counter extends Component {
  render() {
    return (
      <div>{this.props.count}</div>
    );
  }
}