# generative.fm

A platform for playing [generative music](https://medium.com/@metalex9/introduction-to-generative-music-91e00e4dba11) in the browser.

https://generative.fm

## Overview

### Audio

This site uses [Tone.js](https://tonejs.github.io/) to play audio in the browser through the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

#### Samples

Most of the samples are provided by the [Versilian Studios Chamber Orchestra 2 Community Edition](https://vis.versilstudios.com/vsco-community.html) and the [Versilian Community Sample Library](https://vis.versilstudios.com/vcsl.html). Other samples provided by the [Sonatina Symphonic Orchestra](https://github.com/peastman/sso). The [singing bowl samples](https://kasper.bandcamp.com/album/singing-bowls) were provided by [Kasper](https://kasper.bandcamp.com/). [Lo-Fi Hip-Hop Drum Kit samples are from ItsLucid](https://soundpacks.com/free-sound-packs/lo-fi-hip-hop-drum-kit/). All other samples were specially recorded for the site. Sample files can be found in the [generative-music/samples.generative.fm] repository.

### Music

Source code for the music generators can be found in the [generative-music/pieces-alex-bainter](https://github.com/generative-music/pieces-alex-bainter) repository.

## Issues and Feedback

Problems or general feedback can be reported [here on Github](https://github.com/generative-music/site/issues) or by sending an email to [alex@alexbainter.com](mailto:alex@alexbainter.com?subject="Generative.fm"). Thanks!

## Installation

You will need [Node.js](https://nodejs.org/en/) installed on your machine.

1. Clone to your machine.
2. Navigate to the project's directory.
3. Run `npm i`.
4. Run `npm start`.
5. Navigate to [localhost:9999](http://localhost:9999).

### Local Sample Files
To play music locally, first you need to follow these instructions:

1. Clone [generative-music/samples-alex-bainter](https://github.com/generative-music/samples-alex-bainter) to your machine.
2. Follow the instructions for [building the sample files](https://github.com/generative-music/samples-alex-bainter#building).
3. Follow the instructions for [serving the sample files locally with Docker](https://github.com/generative-music/samples-alex-bainter#serving-locally-with-docker).

With the sample files served on your local network, you should be able to play the pieces locally.

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md).

[generative-music/samples.generative.fm]: https://github.com/generative-music/samples.generative.fm
