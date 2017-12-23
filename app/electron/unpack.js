import * as path from 'path';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as unpack from 'unpack-all';
import * as chokidar from 'chokidar';

class Archive {
  constructor() {
    this.fullPath = null;
    this.tempDir = path.join(os.tmpdir(), 'shoujo_temp');
    fs.ensureDir(this.tempDir);
  }

  async startWatcher() {
    return new Promise((resolve, reject) => {
      const watcher = chokidar.watch(this.tempDir);

      watcher.on('add', (filePath, stats) => {
        console.log(filePath, stats);
      });

      watcher.on('ready', () => {
        resolve();
      });

      watcher.on('error', (error) => {
        reject(error);
      });
    });
  }

  async unpack(file) {
    const fileName = path.basename(file[0]).replace(/\.[^/.]+$/, ''),
      fullPath = path.join(this.tempDir, fileName);

    await this.startWatcher();

    unpack.unpack(file[0], {
      unar: path.join(__dirname, '../../bin/unar'),
      targetDir: fullPath
    }, async (err, files, text) => {
      this.fullPath = fullPath;
      if (err) return console.error(err);
      if (files) console.log('files', files);
      if (text) console.log('text', text);
    });
  }

  async deleteFolder(fullPath = this.fullPath) {
    if (fullPath && await fs.pathExists(fullPath)) {
      await fs.remove(fullPath);
    }
  }
}

export default new Archive();
