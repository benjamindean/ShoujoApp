import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CounterActions from '../actions/counter';
import * as ImageActions from '../actions/image';
import Toolbar from '../components/Toolbar';
import Loading from '../components/Loading';
import Thumbnail from '../components/Thumbnail';
import Open from '../components/Open';
import { ipcRenderer } from 'electron';

function mapStateToProps(state) {
  console.log(state);

  return {
    counter: state.counter,
    list: state.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
      counterActions: bindActionCreators(CounterActions, dispatch),
      imageActions: bindActionCreators(ImageActions, dispatch)
  };
}

class HomePage extends Component {
  componentDidMount() {
    const { addImage } = this.props.imageActions;
  }

  render() {
    console.log(this.props);
    const { increment, counter } = this.props.counterActions;

    return (
      <div className="container">
          <div id="clearfix" />
          <Open increment={increment} />
          <Loading />
          <Toolbar counter={counter} />
          <div id="thumbnails">
            {this.props.list.map((image) => {
                return <Thumbnail id={image.id} src={image.path} />;
            })}
          </div>
      </div>
    );
  }
}

HomePage.defaultProps = {
  list: []
};

HomePage.propTypes = {
  list: PropTypes.array,
  counterActions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);