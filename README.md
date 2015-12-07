Node compatibility for Tabris.js
================================

Tabris.js already provides some built-in node.js compatibility:

* The module system uses the same API (`module`, `exports`, `require`).
* The `__dirname` and `__filename` variables.
* The global object `global`.

This module provides some of the core modules of node.js in tabris.js, specifically:
* `assert` - works fully
* `util` - works fully
* `punycode` - works fully
* `path` - works fully
* `constants` - works fully
* `events` - works fully
* `process` - works within limits, specifically `process.nextTick` is implemented.
* `timers` - works within limits: setTimeout ignores additional arguments for callback.
* `console` - provides the additional methods `dir`, `time`, `timeEnd`, `trace` and `assert`

## License

* Code copied from [node](https://github.com/joyent/node) is published under the MIT license.
* All other code published under BSD 3-Clause.
