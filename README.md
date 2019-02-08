# Generative Music by Alex Bainter

A collection of [generative music](https://medium.com/@metalex9/introduction-to-generative-music-91e00e4dba11) pieces played in the browser.

https://generative.fm

## Overview

### Audio

This site uses [Tone.js](https://tonejs.github.io/) to play audio in the browser through the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). Most of the samples are provided by the [Versilian Studios Chamber Orchestra 2 Community Edition](https://vis.versilstudios.com/vsco-community.html). The [singing bowl samples](https://kasper.bandcamp.com/album/singing-bowls) were provided by [Kasper](https://kasper.bandcamp.com/). All other samples were recorded for the site.

### Music Creation

Code for each piece can be found in [src/pieces](src/pieces). A few pieces are defined in separate [npm](https://www.npmjs.com/) packages; code for these pieces can by found by inspecting the `import` statements in [src/pieces/index.js](src/pieces/index.js) and locating the piece's repository [here](https://github.com/generative-music?utf8=%E2%9C%93&q=piece&type=&language=).

### UI

The interface uses [React](https://reactjs.org/) and [Redux](https://redux.js.org/).

## Installation

You will need [Node.js](https://nodejs.org/en/) installed on your machine.

1. Clone to your machine.
2. Navigate to the project's directory.
3. Run `npm i`.
4. Run `npm start`.
5. Navigate to [localhost:9999](http://localhost:9999).

## Issues and Feedback

Problems or general feedback can be reported [here on Github](https://github.com/generative-music/site/issues) or by sending an email to alex@alexbainter.com. Thanks!
