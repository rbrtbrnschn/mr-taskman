# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.3] - 2020-11-29
### Added
- node package mongoose (**mongodbd library**)
- setup mongoose to connect to mongodb atlas cluster with readonly access for developers // may change
- setup boilerplate schemas for task, guild


## [0.0.2] - 2020-11-28
### Added
- error command to view error message of correlating code
### Changed
- refactored all messages out to ./src/data/messages.ts
- refactored ./src/config.ts to use proper types
- refactored getErrorCode / getErrorMessage to return type ErrorCode instead of string

## [0.0.1] - 2020-11-28
### Added
- Base boilerplate code setup.
- Using a command handler to validate all necessities.
- Setup a Ci /Cd pipeline.
- Non priority commands like: ping, utpime

[Unreleased]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.0.3...HEAD
[1.0.0]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.0.8...v0.1.0
[0.0.8]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/rbrtbrnschn/mr-taskman/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/rbrtbrnschn/mr-taskman/releases/tag/v0.0.1
