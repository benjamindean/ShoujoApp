import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '../components/Toolbar';
import Loading from '../components/Loading';
import Open from '../components/Open';
import styles from './Home.scss';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
          <div id="clearfix"></div>
          <Open />
          <Loading />
          <Toolbar
              count={0}
          />
      </div>
    );
  }
}
