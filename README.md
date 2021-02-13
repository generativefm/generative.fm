# :exclamation: Archival notice

This was the original player for [Generative.fm](https://generative.fm). It was retired on February 12, 2021 and replaced by [generative-fm/play](https://github.com/generative-fm/play).

# generative.fm

A platform for playing [generative music](https://medium.com/@metalex9/introduction-to-generative-music-91e00e4dba11) in the browser.

https://generative.fm

## Overview

### Audio

This site uses [Tone.js](https://tonejs.github.io/) to play audio in the browser through the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

### Music

Source code for the music generators can be found in the [generative-music/pieces-alex-bainter](https://github.com/generative-music/pieces-alex-bainter) repository.

## Installation

You will need [Node.js](https://nodejs.org/en/) installed on your machine.

1. Clone to your machine.
2. Navigate to the project's directory.
3. Run `npm i`.
4. Run `npm start`.
5. Navigate to [localhost:9999](http://localhost:9999).

### Local Sample Files

To play music locally, first you need to follow these instructions:

Requests for sample files from the generative.fm sample CDN are blocked, see [#38](https://github.com/generative-music/generative.fm/issues/38). In order to play music locally, you will need to follow the instructions for [building](https://github.com/generative-music/samples-alex-bainter#building) and [serving](https://github.com/generative-music/samples-alex-bainter#serving-locally-with-docker) the sample files.

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md).

[generative-music/samples.generative.fm]: https://github.com/generative-music/samples.generative.fm
