# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Fixed

- Pieces won't rebuild themselves infinitely when a different piece is selected during playback
- Pieces won't build twice when a different piece is selected during playback

### Changed

- Samples are now hosted on a separate site (currently at samples.generative.fm)

### Added

- New piece: "Observable Streams"

## [0.2.1] - 2018-02-08

### Fixed

- Play time tracking properly switches when a different piece is selected during playback

## [0.2.0] - 2018-02-07

### Changed

- Significant update to piece selection UI
  - "Pieces" tab renamed to "Music"
  - Piece selection changed from table to grid with images
- Title changed to "Generative.fm"
- Link to alexbainter.com moved into the "About" tab; replaced with tagline
- About tab wording modified slightly

### Added

- Artist is displayed in the currently playing area
- Play time is now tracked and stored in the browser

## [0.1.2] - 2018-02-03

### Fixed

- Single piano pieces will now release resources when they're stopped.

## [0.1.1] - 2018-02-03

### Changed

- Sound files will no longer be fetched and cached during service worker installation. They'll be cached once they are fetched for the first time. This significantly reduces cache usage since only one audio format is used per client.

[0.3.0][0.2.1]: https://github.com/generative-music/site/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/generative-music/site/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/generative-music/site/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/generative-music/site/compare/v0.1.0...v0.1.1
