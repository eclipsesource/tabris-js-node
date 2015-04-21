/*
Copyright (c) 2015 EclipseSource Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Tabris.js nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var globals = {
  process: "process/browser.js",
  util: "./node_lib/util.js",
  assert: "./node_lib/assert.js"
};

var nonGlobals = {
  timers: "timers-browserify",
  console: "console-browserify",
  punycode: "./node_lib/punycode.js",
  path: "./node_lib/path.js",
  constants: "constants-browserify"
};

var init = ["console"];

for (var moduleName in globals) {
  mapModule(moduleName, globals[moduleName]);
  makeGlobal(moduleName);
}

for (var moduleName in nonGlobals) {
  mapModule(moduleName, nonGlobals[moduleName]);
}

for (var i = 0; i < init.length; i++) {
  require(init[i]);
}

tabris._defineModule("buffer", function(module) {
  module.exports = {Buffer: window.Buffer, INSPECT_MAX_BYTES: 50};
});

window.Buffer = function() {
  throw new Error("tabris.js does not support the Buffer class");
};

window.Buffer.isBuffer = function() {
  return false;
};

function mapModule(aliasModule, orgModule) {
  tabris._defineModule(aliasModule, function(module) {
    module.exports = require(orgModule);
  });
}

function makeGlobal(moduleName) {
  Object.defineProperty(window, moduleName, {
    get: function() {
      return require(moduleName);
    }
  });
}
