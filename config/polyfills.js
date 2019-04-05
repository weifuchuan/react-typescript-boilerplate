'use strict';

// use ` require("xxx") ` for import polyfils

require("@babel/polyfill")
require("react-app-polyfill/ie9")
require("intersection-observer/intersection-observer.js")

import EventEmitter from "wolfy87-eventemitter";

window.EventEmitter = EventEmitter;
window.bus = new EventEmitter();