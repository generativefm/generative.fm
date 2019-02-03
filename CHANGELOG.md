# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2018-02-03

### Fixed

- Single piano pieces will now release resources when they're stopped.

## [0.1.1] - 2018-02-03

### Changed

- Sound files will no longer be fetched and cached during service worker installation. They'll be cached once they are fetched for the first time. This significantly reduces cache usage since only one audio format is used per client.

[0.1.2]: https://github.com/generative-music/site/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/generative-music/site/compare/v0.1.0...v0.1.1
