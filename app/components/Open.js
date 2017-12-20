import React, { Component }  from 'react';
import { ipcRenderer, remote } from 'electron';

export default class LoadFile extends Component {
    openFile() {
        ipcRenderer.send('open-file', 1);
    }

    render() {
        return (
            <div id="openFile">
                <a href="#" className="link" onClick={this.openFile}>Open File</a>
            </div>
        );
    }
}