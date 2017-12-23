import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

export default class LoadFile extends Component {
    openFile() {
        ipcRenderer.send('open-file', 1);
    }

    render() {
        return (
            <div id="openFile">
                <a className="link" onClick={this.openFile}>Open File</a>
            </div>
        );
    }
}