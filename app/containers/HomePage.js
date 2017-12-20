import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CounterActions from '../actions/counter';
import Toolbar from '../components/Toolbar';
import Loading from '../components/Loading';
import Open from '../components/Open';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

class HomePage extends Component {
  render() {
    const { increment, counter } = this.props;
    
    return (
      <div className="container">
          <div id="clearfix"></div>
          <Open increment={increment} />
          <Loading />
          <Toolbar counter={counter} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);