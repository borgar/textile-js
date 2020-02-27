# Change Log
All notable changes to the "textile-js" library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [UNRELEASED]
### Changed
- [DEPENDENCIEs] Update dependencies, following main repo.
- [DOC] Move CHANGELOG to the right place
- [INTERNAL] Linting


## [2.0.102] - 20200219
### Added
- [LIBRARY] Add a `tokenize( textileString, options )` member, to get the JSONML tree without a global 'html' node.


## [2.0.101] - 20200204
### Added
- [LIBRARY] Add original line number to inline HTML tags.

### Fixed
- [LIBRARY] Import "Fixing an error in phrase bounds" from original repo
- [LIBRARY] Ignore blanks between blocks. Fixes borgar/textile-js#52


## [2.0.99] - 20191027
### Added
- [LIBRARY] Option "showOriginalLineNumber" : adds original (source) line number to the generated HTML, by adding the HTML attribute "data-line" to each relevant tag.
- [LIBRARY] Option "cssClassOriginalLineNumber" : adds this CSS className to each generated tag in which original line number is added.
- [BIN] Option --show-original-line-number : activate the corresponding option of the library.

### Changed
- Updated dev dependencies
- Added VSCode projects files