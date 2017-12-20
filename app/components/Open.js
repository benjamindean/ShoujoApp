import React, { Component }  from 'react';

export default class LoadFile extends Component {
    render() {
        return (
            <div id="openFile">
                <a href="#" className="link" onClick={this.props.increment}>Open File</a>
            </div>
        );
    }
}