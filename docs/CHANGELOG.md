# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

(none)

## [0.16.0] - 2019-05-05

### Fixed

- Recording generation for Drones
- Recording generation for Drones II
- Recording generation for Townsend
- Generated recordings always have the proper ".wav" extension

### Added

- New piece: Awash

## [0.15.0] - 2019-04-28

### Fixed

- Desktop users will be asked to confirm when navigating away from the site while a recording is in progress

### Added

- Play timer
- Change button color when they are pressed to signify actuation
- Dismissable Patreon link notification which appears after 10 hours of playtime
- New piece: Drones II

### Removed

- Shuffle removed from mobile devices to make room for timer button

## [0.14.0] - 2019-04-21

### Added

- Users can now generate recordings of pieces

### Changed

- Reword help tab

## [0.13.1] - 2019-04-06

### Fixed

- Improve Didgeridoobeats timing accuracy

## [0.13.0] - 2019-04-06

### Fixed

- Page will not scroll when adjusting the volume by using a mouse wheel while the mouse is hovering over the volume slider

### Added

- New piece: Return to Form
- Patreon link in about page

### Changed

- Update indicator dot bounces
- Set `Tone.context.latencyHint` to `'balanced'` to hopefully reduce crackling and such

## [0.12.0] - 2019-03-31

### Fixed

- Controls no longer overlap the last row of pieces in Safari

### Added

- Implement the [Media Session API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) which adds better control integration for Android Chrome users (including bluetooth)
- New piece: Buttafingers
- 'm' key will mute/unmute

### Changed

- (dev) Keyboard shortcuts refactored into a Redux middleware
- (dev) Online status refactored into a Redux middleware

## [0.11.0] - 2019-03-24

### Fixed

- Quickly switching between pieces while music is playing should no longer allow multiple pieces to play simultaneously

### Added

- Space bar will play/stop music ([@rossvz])
- Right arrow key will select next track ([@rossvz])
- Left arrow key will select previous track ([@rossvz])
- Scroll wheel will adjust volume when the mouse is over the volume slider
- Desktop users will be prompted to confirm when attempting to navigate away while music is playing
- Pieces will display an animated spinner when loading
- Paypal link in "About" tab so nice people can support the site
- New piece: Didgeridoobeats

## [0.10.1] - 2019-03-20

### Fixed

- Sound will play on iOS devices even when the device is in silent mode
- Sound will play on iOS devices even when the app is not the currently active view
- Improved Progressive Web App support in Safari on iOS devices
- Twitter follow button code is cached for offline usage
- Support using local sample files during development

## [0.10.0] - 2019-03-19

### Fixed

- Pieces tab is styled as intended on mobile

### Added

- Add id to state
- Help tab
- Better signifiers for available updates
- CONTRIBUTING.md
- Log link to Github repository in console (production only)

### Changed

- Reworded "about" tab
- Mobile volume is now 95% instead of 100% to help with audio issues
- Deployment supports multiple environments

## [0.9.0] - 2019-03-13

### Added

- New piece: Drones

## [0.8.1] - 2019-02-22

### Fixed

- Fix broken piece packages

## [0.8.0] - 2019-02-22

### Added

- New piece: Spring Again

## [0.7.0] - 2019-02-21

### Fixed

- Cache the sample index file

### Changed

- Use the [samples.generative.fm npm package](https://www.npmjs.com/package/@generative-music/samples.generative.fm) to load samples
- All samples are now stored in external npm packages

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

[unreleased]: https://github.com/generative-music/generative.fm/compare/v0.16.0...HEAD
[0.16.0]: https://github.com/generative-music/generative.fm/compare/v0.15.0...v0.16.0
[0.15.0]: https://github.com/generative-music/generative.fm/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/generative-music/generative.fm/compare/v0.13.1...v0.14.0
[0.13.1]: https://github.com/generative-music/generative.fm/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/generative-music/generative.fm/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/generative-music/generative.fm/compare/v0.11.1...v0.12.0
[0.11.0]: https://github.com/generative-music/generative.fm/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/generative-music/generative.fm/compare/v0.9.0...v0.10.1
[0.10.0]: https://github.com/generative-music/generative.fm/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/generative-music/generative.fm/compare/v0.8.1...v0.9.0
[0.8.1]: https://github.com/generative-music/generative.fm/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/generative-music/generative.fm/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/generative-music/generative.fm/compare/v0.6.2...v0.7.0
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
[@rossvz]: https://github.com/rossvz
