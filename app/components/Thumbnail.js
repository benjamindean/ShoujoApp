import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Thumbnail extends Component {
    render() {
        return (
            <div className="thumb-wrapper">
                <img alt={this.props.id} className="thumb" src={this.props.src}/>
                <span className="thumb-id">{this.props.id}</span>
            </div>
        );
    }
}

Thumbnail.propTypes = {
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired
};

export default Thumbnail;
