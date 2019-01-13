'use strict';

const path = require('path');
const { Lame } = require('node-lame');
const glob = require('glob');

glob('./samples/otherness-wav/*.wav', (err, files) => {
  files.forEach(filename => {
    const basename = path.basename(filename, '.wav');
    const decoder = new Lame({
      output: `./samples/otherness-mp3/${basename}.mp3`,
    }).setFile(filename);
    decoder.decode();
  });
});
