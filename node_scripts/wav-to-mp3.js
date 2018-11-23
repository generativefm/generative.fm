'use strict';

const path = require('path');
const { Lame } = require('node-lame');
const glob = require('glob');

glob('./samples/kasper-singing-bowls/articulation1/*.wav', (err, files) => {
  files.forEach(filename => {
    const basename = path.basename(filename, '.wav');
    const decoder = new Lame({
      output: `./samples/kasper-singing-bowls-mp3/articulation1/${basename}.mp3`,
    }).setFile(filename);
    decoder.decode();
  });
});
