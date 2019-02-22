# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## UNRELEASED

### Fixed

- Cache the sample index file

### Changed

- Use the [samples.generative.fm npm package](https://www.npmjs.com/package/@generative-music/samples.generative.fm) to load samples

## [0.6.2] - 2019-02-17

### Fixed

- All samples will now cache properly

## [0.6.1] - 2019-02-17

### Added

- Analytics

## [0.6.0] - 2019-02-16

### Added

- New Piece: "Townsend"

## [0.5.1] - 2019-02-15

### Fixed

- All Music link width won't cause a horizontal scroll bar

## [0.5.0] - 2019-02-14

### Fixed

- Link to alexbainter.com will actually work

### Added

- If a filter results in a single piece and nothing is playing, select it automatically

### Changed

- Move "All Music" link to the top of the music tab

## [0.4.0] - 2019-02-14

### Fixed

- Cleanup of "Observable Streams" won't crash
- Lowered volume of pieces which were significantly louder than others

## Added

- Routing

## UNRELEASED

### Fixed

- Pieces won't rebuild themselves infinitely when a different piece is selected during playback
- Pieces won't build twice when a different piece is selected during playback

### Changed

- Samples are now hosted on a separate site (currently at samples.generative.fm)

### Added

- New piece: "Observable Streams"

## [0.2.1] - 2019-02-08

### Fixed

- Play time tracking properly switches when a different piece is selected during playback

## [0.2.0] - 2019-02-07

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

## [0.1.2] - 2019-02-03

### Fixed

- Single piano pieces will now release resources when they're stopped.

## [0.1.1] - 2019-02-03

### Changed

- Sound files will no longer be fetched and cached during service worker installation. They'll be cached once they are fetched for the first time. This significantly reduces cache usage since only one audio format is used per client.

[0.6.2]: https://github.com/generative-music/generative.fm/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/generative-music/generative.fm/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/generative-music/generative.fm/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/generative-music/generative.fm/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/generative-music/generative.fm/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/generative-music/generative.fm/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/generative-music/generative.fm/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/generative-music/generative.fm/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/generative-music/generative.fm/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/generative-music/generative.fm/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/generative-music/generative.fm/compare/v0.1.0...v0.1.1
