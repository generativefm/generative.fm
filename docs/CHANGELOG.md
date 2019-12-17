# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

(none)

## [1.24.0] - 2019-12-11

### Changed

- Update Patron list

## [1.23.0] - 2019-12-01

### Fixed

- "Above the Rain" releases all resources when stopped

### Changed

- Update Patron list

### Added

- New piece: "Beneath Waves"

## [1.22.0] - 2019-11-24

### Added

- New piece: "Documentary Films"

## [1.21.0] - 2019-11-17

### Changed

- Update Patron list

### Added

- New piece: "Transmission"

## [1.20.0] - 2019-11-10

### Fixed

- Wonky update process

### Changed

- Update Patron list

### Added

- New piece: "Ritual"

## [1.19.0] - 2019-11-03

### Fixed

- Update link (hopefully)

### Changed

- Update Patron list

### Added

- New piece: "Uun"

## [1.18.1] - 2019-10-27

### Fixed

- Add missing patron

## [1.18.0] - 2019-10-27

### Changed

- Update default global sortings

### Added

- New piece: "Eyes Closed"

## [1.17.0] - 2019-10-20

### Changed

- Update Nakaii to latest version

### Added

- New piece: "Remembering"

## [1.16.1] - 2019-10-18

### Fixed

- Fix global stats daily refresh

## [1.16.0] - 2019-10-13

### Changed

- Update Patron list
- Update Last Transit to latest version
- Update Pulse-code Modulation to latest version

### Added

- New piece: "Nakaii"

## [1.15.0] - 2019-10-06

### Changed

- Pieces will no longer resort by playtime while a piece is playing
- Update Patron list

### Added

- New sortings based on global data: trending, global play time, and global favorites
- New piece: "Soundtrack"

## [1.14.0] - 2019-09-29

### Added

- New piece: "Western Medicine"

## [1.13.0] - 2019-09-22

### Added

- New piece: "Above the Rain"

## [1.12.0] - 2019-09-15

### Fixed

- Switching from the square cut visualization to the partial lattice while playing displays correctly

### Removed

- Analytics

### Changed

- Update Patron list

### Added

- Send state data to database on page unload
- New piece: "Animalia Chordata"

## [1.11.1] - 2019-09-09

### Fixed

- Add missing Patrons to list

## [1.11.0] - 2019-09-08

### Added

- New piece: "Agua Ravine"

## [1.10.1] - 2019-09-01

### Fixed

- Update "No Refrain" to latest patch version

### [1.10.0] - 2019-09-01

### Changed

- Update Patron list

### Added

- New piece: "No Refrain"

## [1.9.0] - 2019-08-24

### Fixed

- App background covers entire About tab

### Changed

- Update Patron list

### Added

- New piece: "At Sunrise"

## [1.8.0] - 2019-08-18

### Changed

- Update Patron list
- Reword site descriptions for better SEO ranking

### Added

- New piece: "Last Transit"
- Alternative visualization

## [1.7.0] - 2019-08-11

### Changed

- Update Patron list

### Added

- New piece: "Yesterday"

## [1.6.1] - 2019-08-04

### Fixed

- Add missing Patrons

## [1.6.0] - 2019-08-04

### Changed

- Include "ambient" in site descriptions

### Added

- New piece: "Stratospheric"

## [1.5.0] - 2019-07-28

### Fixed

- Ignore keyboard shortcuts if a modifier key is also pressed

### Changed

- Update Patron list

### Added

- New piece: "Bhairav"

## [1.4.0] - 2019-07-21

### Fixed

- Meditation doesn't stutter
- Spring again piano doesn't stop

### Added

- New piece: Pulse-code Modulation
- Show total playtime at the bottom of the Play tab

## [1.3.0] - 2019-07-14

### Fixed

- Moment release date added

### Added

- Google Cast support
- Patron names from Patreon added to About tab
- New piece: Substrate

## [1.2.1] - 2019-07-07

### Fixed

- Always recalculate visiblePieceIds on load so new pieces are displayed right away

## [1.2.0] - 2019-07-07

### Added

- New piece: Moment

## [1.1.2] - 2019-07-03

### Fixed

- The button for queueing a record job will show up properly

## [1.1.1] - 2019-06-30

### Fixed

- Display new pieces which match the current filter after an update

## [1.1.0] - 2019-06-30

### Added

- New piece: Homage

## [1.0.0] - 2019-06-23

### Changed

- Site is dark-themed
- Hover effects removed on touch devices, site redesigned with this constraint
- Instead of using Chrome's "mini-info toolbar" for PWA installs, use a custom Install button

### Fixed

- Add a maximum piece history of 20
- Volume slider is exponential instead of linear
- Uncached pieces are displayed as disabled while offline
- Users without Web Audio support are not able to initiate playback
- App won't crash when attempting to open the record tab without a piece selected
- (dev) .jsx files are linted

### Added

- Pieces can be added to/removed from favorites and the piece list can be filtered to only show favorites
- Piece tags are displayed and the piece list is filterable by tag
- Piece links can be copied from the "more" menu
- Configurable sorting (by release date or play time)

## [0.22.0] - 2019-06-15

### Added

- New piece: Day/Dream

### Changed

- Reword help and about tabs

## [0.21.0] - 2019-06-09

### Added

- New piece: Quarter Eyes

## [0.20.0] - 2019-06-02

### Fixed

- Recording generation for Observable streams

### Added

- New piece: Expand/Collapse

## [0.19.0] - 2019-05-26

### Fixed

- Possible recording issues with Didgeridoobeats, Little Bells, Meditation, Pinwheels, Sevenths, and Impact

### Added

- New piece: Neuroplasticity

## [0.18.0] - 2019-05-19

### Added

- New piece: Peace

## [0.17.0] - 2019-05-12

### Added

- New piece: Enough

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

## [0.3.0] - 2019-02-11

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

[unreleased]: https://github.com/generative-music/generative.fm/compare/v1.24.0...HEAD
[1.24.0]: https://github.com/generative-music/generative.fm/compare/v1.23.0...v1.24.0
[1.23.0]: https://github.com/generative-music/generative.fm/compare/v1.22.0...v1.23.0
[1.22.0]: https://github.com/generative-music/generative.fm/compare/v1.21.0...v1.22.0
[1.21.0]: https://github.com/generative-music/generative.fm/compare/v1.20.0...v1.21.0
[1.20.0]: https://github.com/generative-music/generative.fm/compare/v1.19.0...v1.20.0
[1.19.0]: https://github.com/generative-music/generative.fm/compare/v1.18.1...v1.19.0
[1.18.1]: https://github.com/generative-music/generative.fm/compare/v1.18.0...v1.18.1
[1.18.0]: https://github.com/generative-music/generative.fm/compare/v1.17.0...v1.18.0
[1.17.0]: https://github.com/generative-music/generative.fm/compare/v1.16.1...v1.17.0
[1.16.1]: https://github.com/generative-music/generative.fm/compare/v1.16.0...v1.16.1
[1.16.0]: https://github.com/generative-music/generative.fm/compare/v1.15.0...v1.16.0
[1.15.0]: https://github.com/generative-music/generative.fm/compare/v1.14.0...v1.15.0
[1.14.0]: https://github.com/generative-music/generative.fm/compare/v1.13.0...v1.14.0
[1.13.0]: https://github.com/generative-music/generative.fm/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/generative-music/generative.fm/compare/v1.11.1...v1.12.0
[1.11.1]: https://github.com/generative-music/generative.fm/compare/v1.11.0...v1.11.1
[1.11.0]: https://github.com/generative-music/generative.fm/compare/v1.10.1...v1.11.0
[1.10.1]: https://github.com/generative-music/generative.fm/compare/v1.10.0...v1.10.1
[1.10.0]: https://github.com/generative-music/generative.fm/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/generative-music/generative.fm/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/generative-music/generative.fm/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/generative-music/generative.fm/compare/v1.6.1...v1.7.0
[1.6.1]: https://github.com/generative-music/generative.fm/compare/v1.6.0...v1.6.1
[1.6.0]: https://github.com/generative-music/generative.fm/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/generative-music/generative.fm/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/generative-music/generative.fm/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/generative-music/generative.fm/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/generative-music/generative.fm/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/generative-music/generative.fm/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/generative-music/generative.fm/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/generative-music/generative.fm/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/generative-music/generative.fm/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/generative-music/generative.fm/compare/v0.22.0...v1.0.0
[0.22.0]: https://github.com/generative-music/generative.fm/compare/v0.21.0...v0.22.0
[0.21.0]: https://github.com/generative-music/generative.fm/compare/v0.20.0...v0.21.0
[0.20.0]: https://github.com/generative-music/generative.fm/compare/v0.19.0...v0.20.0
[0.19.0]: https://github.com/generative-music/generative.fm/compare/v0.18.0...v0.19.0
[0.18.0]: https://github.com/generative-music/generative.fm/compare/v0.17.0...v0.18.0
[0.17.0]: https://github.com/generative-music/generative.fm/compare/v0.16.0...v0.17.0
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
