'use strict';

// use ` require("xxx") ` for import polyfils

require("react-app-polyfill/ie9")
require("intersection-observer/intersection-observer.js")

import _ResizeObserver from 'resize-observer-polyfill';

if (!window.ResizeObserver) {
  window.ResizeObserver = _ResizeObserver;
}