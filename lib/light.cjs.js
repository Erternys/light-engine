'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var globalMap = new Map();
var GlobalEventEmitter = (function () {
    function GlobalEventEmitter() {
        this.events = globalMap;
    }
    GlobalEventEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!(this.events.has(event) && this.events.get(event).length > 0))
            return false;
        this.events.set(event, (this.events.get(event) || []).map(function (v) {
            if (v instanceof Array) {
                if (!v[1]) {
                    v[0].apply(v, args);
                    return [v[0], true];
                }
                return v;
            }
            else
                v.apply(void 0, args);
            return v;
        }));
        return true;
    };
    GlobalEventEmitter.prototype.on = function (event, listener) {
        this.events.set(event, __spreadArrays((this.events.get(event) || []), [listener]));
        return this;
    };
    GlobalEventEmitter.prototype.once = function (event, listener) {
        this.events.set(event, __spreadArrays((this.events.get(event) || []), [
            [listener, false],
        ]));
        return this;
    };
    GlobalEventEmitter.prototype.off = function (event, listener) {
        if (!(this.events.has(event) && this.events.get(event).length > 0))
            return false;
        var content = this.events.get(event);
        if (!content)
            return false;
        this.events.set(event, content.filter(function (v) { return v !== listener; }));
        if (content.length === 0)
            return this.events.delete(event);
        return true;
    };
    GlobalEventEmitter.prototype.offAll = function (event) {
        if (event)
            this.events.set(event, []);
        else
            this.events.clear();
        return true;
    };
    return GlobalEventEmitter;
}());
var EventEmitter = (function (_super) {
    __extends(EventEmitter, _super);
    function EventEmitter() {
        var _this = _super.call(this) || this;
        _this.events = new Map();
        return _this;
    }
    Object.defineProperty(EventEmitter.prototype, "globals", {
        get: function () {
            return new GlobalEventEmitter();
        },
        enumerable: false,
        configurable: true
    });
    return EventEmitter;
}(GlobalEventEmitter));

var Manager = (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = Symbol(null);
        _this.hooks = [];
        _this.hookIndex = 0;
        return _this;
    }
    Object.defineProperty(Manager, "Types", {
        get: function () {
            return this._types;
        },
        enumerable: false,
        configurable: true
    });
    Manager.createType = function (name) {
        this._types[name] = Symbol(name);
        return this;
    };
    Manager._types = {};
    return Manager;
}(EventEmitter));

var CloneAudioManager = (function (_super) {
    __extends(CloneAudioManager, _super);
    function CloneAudioManager(game, audio, key) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.audio = audio;
        _this.key = key;
        _this.isPlaying = false;
        _this.isPaused = true;
        _this.isDeleted = false;
        _this.state = {};
        _this.ended = function () { return _this.emit("ended"); };
        _this.context = new AudioContext();
        _this.changePageVisible = _this.changePageVisible.bind(_this);
        _this.gain = _this.context.createGain();
        _this.gain.connect(_this.context.destination);
        _this.source = _this.context.createBufferSource();
        _this.state.started = false;
        _this.context.decodeAudioData(_this.audio.buffer).then(function (buffer) {
            _this.source.buffer = buffer;
            _this.source.loop = _this.loop;
            _this.source.connect(_this.gain);
            _this.source.addEventListener("ended", _this.ended);
        });
        _this.volume = 1;
        _this.speed = 1;
        _this.loop = true;
        _this.globals.on("page:visibilitychange", _this.changePageVisible);
        return _this;
    }
    Object.defineProperty(CloneAudioManager.prototype, "loop", {
        get: function () {
            return this.state.loop;
        },
        set: function (value) {
            this.source.loop = value;
            this.state.loop = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloneAudioManager.prototype, "volume", {
        get: function () {
            return this.state.volume;
        },
        set: function (value) {
            this.gain.gain.value = value;
            this.state.volume = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CloneAudioManager.prototype, "speed", {
        get: function () {
            return this.state.speed;
        },
        set: function (value) {
            this.source.playbackRate.value = value;
            this.state.speed = value;
        },
        enumerable: false,
        configurable: true
    });
    CloneAudioManager.prototype.play = function () {
        if (this.isPaused) {
            if (!this.state.started) {
                this.source.start();
                this.state.started = true;
            }
            else
                this.context.resume();
            this.emit("played");
            this.isPlaying = true;
            this.isPaused = false;
        }
    };
    CloneAudioManager.prototype.pause = function () {
        if (this.isPlaying) {
            this.context.suspend();
            this.emit("paused");
            this.isPaused = true;
            this.isPlaying = false;
        }
    };
    CloneAudioManager.prototype.toggle = function () {
        if (this.isPlaying)
            this.pause();
        else
            this.play();
    };
    CloneAudioManager.prototype.destroy = function () {
        this.source.removeEventListener("ended", this.ended);
        this.source.stop();
        this.gain.disconnect();
        this.source.disconnect();
        this.context.close();
        this.globals.off("page:visibilitychange", this.changePageVisible);
        this.audio = null;
        this.isDeleted = true;
        this.emit("destroy");
    };
    CloneAudioManager.prototype.changePageVisible = function () {
        if (document.hidden && this.isPlaying)
            this.context.suspend();
        else if (!document.hidden && this.isPlaying)
            this.context.resume();
    };
    return CloneAudioManager;
}(Manager));
var AudioManager = (function (_super) {
    __extends(AudioManager, _super);
    function AudioManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clones = [];
        return _this;
    }
    AudioManager.prototype.createClone = function () {
        var _this = this;
        var clone = new CloneAudioManager(this.game, this.audio, this.key);
        this.clones.push(clone);
        clone.on("destroy", function () {
            _this.clones = _this.clones.filter(function (c) { return c !== clone; });
        });
        return clone;
    };
    AudioManager.prototype.deletion = function () {
        this.destroy();
        this.clones.forEach(function (clone) { return clone.destroy(); });
        this.clones = [];
    };
    return AudioManager;
}(CloneAudioManager));

var Storage = (function (_super) {
    __extends(Storage, _super);
    function Storage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Storage.prototype[Symbol.iterator] = function () {
        var entries, _i, entries_1, entry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    entries = Object.entries(this);
                    _i = 0, entries_1 = entries;
                    _a.label = 1;
                case 1:
                    if (!(_i < entries_1.length)) return [3, 4];
                    entry = entries_1[_i];
                    return [4, entry];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3, 1];
                case 4: return [2];
            }
        });
    };
    Object.defineProperty(Storage.prototype, "size", {
        get: function () {
            return this.keys().length;
        },
        enumerable: false,
        configurable: true
    });
    Storage.prototype.get = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (!this.has(key))
            return defaultValue;
        return this[key];
    };
    Storage.prototype.set = function (key, value) {
        this[key] = value;
        return this;
    };
    Storage.prototype.has = function (key) {
        return key in this;
    };
    Storage.prototype.delete = function (key) {
        return delete this[key];
    };
    Storage.prototype.increment = function (key, i) {
        if (i === void 0) { i = 1; }
        this[key] += i;
        return this;
    };
    Storage.prototype.decrement = function (key, i) {
        if (i === void 0) { i = 1; }
        this[key] += i;
        return this;
    };
    Storage.prototype.forEach = function (callbackfn, thisArg) {
        if (thisArg)
            callbackfn = callbackfn.bind(thisArg);
        var entries = Object.entries(this);
        for (var _i = 0, entries_2 = entries; _i < entries_2.length; _i++) {
            var entry = entries_2[_i];
            callbackfn(entry[1], entry[0], this);
        }
    };
    Storage.prototype.map = function (callbackfn, thisArg) {
        if (thisArg)
            callbackfn = callbackfn.bind(thisArg);
        var entries = Object.entries(this);
        var newStorage = new Storage();
        for (var _i = 0, entries_3 = entries; _i < entries_3.length; _i++) {
            var entry = entries_3[_i];
            newStorage.set(entry[0], callbackfn(entry[1], entry[0], this));
        }
        return newStorage;
    };
    Storage.prototype.entries = function () {
        return this[Symbol.iterator]();
    };
    Storage.prototype.keys = function () {
        return Object.keys(this);
    };
    Storage.prototype.values = function () {
        return Object.values(this);
    };
    return Storage;
}(EventEmitter));

var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.set = function (set) {
        if (typeof set === "object") {
            this.x = set.x;
            this.y = set.y;
        }
        else {
            this.x = set;
            this.y = set;
        }
        return this;
    };
    Vector2.prototype.equals = function (v) {
        return v.x === this.x && v.y === this.y;
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.mul = function (mul) {
        if (typeof mul === "object") {
            return new Vector2(this.x * mul.x, this.y * mul.y);
        }
        return new Vector2(this.x * mul, this.y * mul);
    };
    Vector2.prototype.div = function (div) {
        if (typeof div === "object") {
            return new Vector2(this.x / div.x, this.y / div.y);
        }
        return new Vector2(this.x / div, this.y / div);
    };
    Vector2.prototype.add = function (add) {
        if (typeof add === "object") {
            return new Vector2(this.x + add.x, this.y + add.y);
        }
        return new Vector2(this.x + add, this.y + add);
    };
    Vector2.prototype.sub = function (sub) {
        if (typeof sub === "object") {
            return new Vector2(this.x - sub.x, this.y - sub.y);
        }
        return new Vector2(this.x - sub, this.y - sub);
    };
    Vector2.prototype.reverse = function () {
        return this.mul(-1);
    };
    Vector2.prototype.abs = function () {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    };
    Vector2.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vector2.prototype.length = function () {
        return Math.sqrt(this.dot(this));
    };
    Vector2.prototype.lengthSq = function () {
        return this.dot(this);
    };
    Vector2.prototype.setLength = function (l) {
        return this.normalize().mul(l);
    };
    Vector2.prototype.lerp = function (v, s) {
        return new Vector2(this.x + (v.x - this.x) * s, this.y + (v.y - this.y) * s);
    };
    Vector2.prototype.normalize = function () {
        return this.div(this.length());
    };
    Vector2.prototype.truncate = function (max) {
        if (this.length() > max) {
            return this.normalize().mul(max);
        }
        return this;
    };
    Vector2.prototype.dist = function (v) {
        return Math.sqrt(this.distSq(v));
    };
    Vector2.prototype.distSq = function (v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        return dx * dx + dy * dy;
    };
    Vector2.prototype.cross = function (v) {
        return this.x * v.y - this.y * v.x;
    };
    return Vector2;
}());

var buttonMap = [
    ["A"],
    ["B"],
    ["X"],
    ["Y"],
    ["Left Bumper", "LB"],
    ["Right Bumper", "RB"],
    ["Left Trigger", "LT"],
    ["Right Trigger", "RT"],
    ["Back", "View"],
    ["Start"],
    ["Left Stick"],
    ["Right Stick"],
    ["Up", "DpadUp"],
    ["Down", "DpadDown"],
    ["Left", "DpadLeft"],
    ["Right", "DpadRight"],
    ["Home", "Guide", "Xbox"],
];
function findButtonNumber(button) {
    if (typeof button === "number")
        return button;
    var buttonNumber = 0;
    for (var _i = 0, buttonMap_1 = buttonMap; _i < buttonMap_1.length; _i++) {
        var buttonAliases = buttonMap_1[_i];
        for (var _a = 0, buttonAliases_1 = buttonAliases; _a < buttonAliases_1.length; _a++) {
            var buttonAlias = buttonAliases_1[_a];
            if (button.toLowerCase() === buttonAlias.toLowerCase()) {
                return buttonNumber;
            }
        }
        buttonNumber++;
    }
    throw new Error("There is no gamepad button called \"" + button + "\"!");
}
var gamepadSticks = {
    left: { label: "Left stick", xAxis: 0, yAxis: 1 },
    right: { label: "Right stick", xAxis: 2, yAxis: 3 },
};
var GamepadInteractor = (function (_super) {
    __extends(GamepadInteractor, _super);
    function GamepadInteractor(nav) {
        if (nav === void 0) { nav = navigator; }
        var _this = _super.call(this) || this;
        _this.gamepadTimestamp = 0;
        _this.navigator = nav;
        _this.cgamepad = null;
        _this.store = {
            preferGamepad: false,
        };
        _this.on("add", function (_a) {
            var gamepad = _a.gamepad;
            if (_this.isConnected())
                return null;
            if (gamepad.mapping === "standard") {
                _this.cgamepad = gamepad;
                _this.gamepadIndex = gamepad.index;
                _this.store.preferGamepad = true;
            }
        });
        _this.on("remove", function (_a) {
            var gamepad = _a.gamepad;
            if (_this.gamepadIndex !== gamepad.index)
                return null;
            _this.gamepadIndex = undefined;
            _this.store.preferGamepad = false;
            _this.offAll();
        });
        return _this;
    }
    GamepadInteractor.prototype.isConnected = function () {
        return this.gamepadIndex !== undefined && this.gamepad.connected;
    };
    Object.defineProperty(GamepadInteractor.prototype, "gamepad", {
        get: function () {
            var gamepad = this.navigator.getGamepads()[this.gamepadIndex];
            if (!gamepad)
                return this.cgamepad;
            if (gamepad.timestamp > this.gamepadTimestamp) {
                this.store.preferGamepad = true;
                this.gamepadTimestamp = gamepad.timestamp;
            }
            return gamepad;
        },
        enumerable: false,
        configurable: true
    });
    GamepadInteractor.prototype.button = function (button) {
        var _this = this;
        var buttonNumber = findButtonNumber(button);
        var label = buttonMap[buttonNumber][0];
        return {
            label: label,
            query: function () {
                if (!_this.isConnected())
                    return false;
                return _this.gamepad.buttons[buttonNumber].pressed;
            },
        };
    };
    GamepadInteractor.prototype.stick = function (stick) {
        var _this = this;
        var gpStick;
        if (typeof stick === "string") {
            if (stick in gamepadSticks) {
                gpStick = gamepadSticks[stick];
            }
            else {
                throw new Error("Gamepad stick \"" + stick + "\" not found!");
            }
        }
        else {
            gpStick = stick;
        }
        return {
            label: gpStick.label,
            query: function () {
                if (!_this.isConnected())
                    return new Vector2(0, 0);
                return new Vector2(_this.gamepad.axes[gpStick.xAxis], _this.gamepad.axes[gpStick.yAxis]);
            },
        };
    };
    GamepadInteractor.prototype.vibrate = function (duration, _a) {
        var _b = _a === void 0 ? {} : _a, weakMagnitude = _b.weakMagnitude, strongMagnitude = _b.strongMagnitude;
        return __awaiter(this, void 0, Promise, function () {
            var actuator;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.isConnected())
                            return [2];
                        actuator = this.gamepad.vibrationActuator;
                        if (!actuator || actuator.type !== "dual-rumble")
                            return [2];
                        return [4, actuator.playEffect("dual-rumble", {
                                duration: duration,
                                strongMagnitude: strongMagnitude,
                                weakMagnitude: weakMagnitude,
                            })];
                    case 1:
                        _c.sent();
                        return [2];
                }
            });
        });
    };
    return GamepadInteractor;
}(EventEmitter));
var customStorage = new Storage();
function numberSuffix(number) {
    var partsNumber = number.toString().split("");
    if (partsNumber[partsNumber.length - 1] === "1")
        return number + "st";
    if (partsNumber[partsNumber.length - 1] === "2")
        return number + "nd";
    if (partsNumber[partsNumber.length - 1] === "3")
        return number + "rd";
    return number + "th";
}
function stringToPixelNum(value, nu) {
    if (typeof value === "number")
        return value;
    if (value.trim().endsWith("px"))
        return Number(value.replace(/px$/, ""));
    if (value.trim().endsWith("%")) {
        var p = Number(value.replace(/%$/, "")) / 100;
        return nu * p;
    }
    return 0;
}
function debugCenter(context, entity) {
    var isMouse = typeOf(entity, true) === "Mouse";
    var isCircle = typeOf(entity) === "Circle";
    var x = entity.x;
    var y = entity.y;
    context.beginPath();
    context.fillStyle = "#f00";
    context.arc(x + (isMouse ? 0 : entity.scene.camera.x), y + (isMouse ? 0 : entity.scene.camera.y), 2, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    if (isCircle) {
        if (!entity.fixed)
            context.translate(entity.scene.camera.x, entity.scene.camera.y);
        context.translate((entity.width * entity.getScale().x) / -2, (entity.height * entity.getScale().y) / -2);
        context.translate(entity.radius *
            -entity.getOrigin().x *
            entity.getScale().r, entity.radius *
            -entity.getOrigin().y *
            entity.getScale().r);
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = "green";
        context.arc(x, y, entity.radius * entity.getScale().r, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
    }
    else if (!isMouse) {
        var body = entity.getBodyBox();
        if (!entity.fixed)
            context.translate(entity.scene.camera.x, entity.scene.camera.y);
        context.translate((entity.width * entity.getScale().x) / -2, (entity.height * entity.getScale().y) / -2);
        context.translate((entity.width / 2) *
            -entity.getOrigin().x *
            entity.getScale().x, (entity.height / 2) *
            -entity.getOrigin().y *
            entity.getScale().y);
        context.lineWidth = 2;
        context.strokeStyle = "green";
        context.strokeRect(x + body.getX(), y + body.getY(), body.getWidth(), body.getHeight());
    }
    context.setTransform(1, 0, 0, 1, 0, 0);
}
function isDefined(v) {
    return v !== undefined && v !== null;
}
function isChromium() {
    return navigator.vendor === "Google Inc.";
}
function typeOf(type, constructor) {
    if (constructor === void 0) { constructor = false; }
    if (constructor)
        return type.constructor.name;
    if (typeof type === "object" || typeof type === "undefined") {
        if (type === null || type === undefined)
            return "undefined";
        if (type === Promise.prototype)
            return "Promise";
        if (type[Symbol.toStringTag] !== undefined)
            return type[Symbol.toStringTag];
        var define = Object.prototype.toString
            .call(type)
            .replace(/\[object (.*)\]/, function (_, name) { return name; });
        if (define === "global" ||
            define === "Window" ||
            define === "DedicatedWorkerGlobalScope" ||
            define === "WorkerGlobalScope") {
            return "global";
        }
        return define;
    }
    return typeof type;
}
function arrayDiff(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return true;
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i])
            return true;
    }
    return false;
}
var StateEnum;
(function (StateEnum) {
    StateEnum[StateEnum["Next"] = 0] = "Next";
    StateEnum[StateEnum["Prev"] = 1] = "Prev";
})(StateEnum || (StateEnum = {}));
var Warning;
(function (Warning) {
    Warning[Warning["Scene"] = 0] = "Scene";
    Warning[Warning["Entity"] = 1] = "Entity";
    Warning[Warning["Manager"] = 2] = "Manager";
})(Warning || (Warning = {}));
var Errors;
(function (Errors) {
    Errors[Errors["Load"] = 0] = "Load";
    Errors[Errors["Audio"] = 1] = "Audio";
    Errors[Errors["ClientKey"] = 2] = "ClientKey";
})(Errors || (Errors = {}));

var ContainerManager = (function (_super) {
    __extends(ContainerManager, _super);
    function ContainerManager(scene) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.list = [];
        return _this;
    }
    ContainerManager.prototype.add = function () {
        var entities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entities[_i] = arguments[_i];
        }
        this.list = __spreadArrays(this.list, entities.map(function (entity) {
            if (!(entity instanceof Function))
                return entity;
            return new entity();
        }));
        return this;
    };
    ContainerManager.prototype.remove = function () {
        var entities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entities[_i] = arguments[_i];
        }
        this.list = this.list.filter(function (e) { return !entities.includes(e); });
        return this;
    };
    ContainerManager.prototype.setManagers = function () {
        var list = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            list[_i] = arguments[_i];
        }
        this.list = list.map(function (entity) {
            if (entity instanceof Manager)
                return entity;
            return new entity();
        });
        return this;
    };
    ContainerManager.prototype.getManager = function (name) {
        var entity = this.list.find(function (manager) { return manager.name === name; });
        if (entity)
            return entity;
        this.globals.emit("w" + Warning.Manager, "this manager " + name + " is not create");
        return new Manager();
    };
    ContainerManager.prototype.getAllType = function (type) {
        return this.list.filter(function (manager) { return manager.type.description === type; });
    };
    ContainerManager.prototype.getAll = function () {
        return this.list;
    };
    return ContainerManager;
}(Manager));

var AudioLoader = (function (_super) {
    __extends(AudioLoader, _super);
    function AudioLoader(src) {
        var _this = _super.call(this) || this;
        _this.src = src;
        fetch(_this.src)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buffer) {
            _this.buffer = buffer;
            _this.emit("loadeddata");
        })
            .catch(function (reason) { return _this.emit("error", reason); });
        return _this;
    }
    return AudioLoader;
}(EventEmitter));

var BoundingBox = (function () {
    function BoundingBox(parent, x, y, width, height) {
        this.rebound = false;
        if (typeOf(parent) === "Scene")
            this.parent = parent.world;
        else
            this.parent = parent;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._onlyBorder = false;
        this._border = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        };
    }
    Object.defineProperty(BoundingBox.prototype, Symbol.toStringTag, {
        get: function () {
            return "BoundingBox";
        },
        enumerable: false,
        configurable: true
    });
    BoundingBox.prototype.clone = function () {
        return new BoundingBox(this.parent, this._x, this._y, this._width, this._height);
    };
    Object.defineProperty(BoundingBox.prototype, "x", {
        get: function () {
            return this.getX();
        },
        set: function (value) {
            this.setX(value);
        },
        enumerable: false,
        configurable: true
    });
    BoundingBox.prototype.getX = function () {
        if (typeof this._x === "number")
            return this._x;
        if (typeof this._x === "string")
            return stringToPixelNum(this._x, this.parent ? this.parent.bounds.getWidth() : 0);
        var value = this._x.get();
        if (typeof value === "number")
            return value;
        if (typeof value === "string")
            return stringToPixelNum(value, this.parent ? this.parent.bounds.getWidth() : 0);
        return 0;
    };
    BoundingBox.prototype.setX = function (v) {
        if (typeof this._x === "object")
            this._x.set(v);
        else
            this._x = v;
    };
    Object.defineProperty(BoundingBox.prototype, "y", {
        get: function () {
            return this.getX();
        },
        set: function (value) {
            this.setY(value);
        },
        enumerable: false,
        configurable: true
    });
    BoundingBox.prototype.getY = function () {
        if (typeof this._y === "number")
            return this._y;
        if (typeof this._y === "string")
            return stringToPixelNum(this._y, this.parent ? this.parent.bounds.getHeight() : 0);
        var value = this._y.get();
        if (typeof value === "number")
            return value;
        if (typeof value === "string")
            return stringToPixelNum(value, this.parent ? this.parent.bounds.getHeight() : 0);
        return 0;
    };
    BoundingBox.prototype.setY = function (v) {
        if (typeof this._y === "object")
            this._y.set(v);
        else
            this._y = v;
    };
    Object.defineProperty(BoundingBox.prototype, "width", {
        get: function () {
            return this.getX();
        },
        set: function (value) {
            this.setWidth(value);
        },
        enumerable: false,
        configurable: true
    });
    BoundingBox.prototype.getWidth = function () {
        if (typeof this._width === "number")
            return this._width;
        if (typeof this._width === "string")
            return stringToPixelNum(this._width, this.parent ? this.parent.bounds.getWidth() : 0);
        var value = this._width.get();
        if (typeof value === "number")
            return value;
        if (typeof value === "string")
            return stringToPixelNum(value, this.parent ? this.parent.bounds.getHeight() : 0);
        return 0;
    };
    BoundingBox.prototype.setWidth = function (v) {
        if (typeof this._width === "object")
            this._width.set(v);
        else
            this._width = v;
    };
    Object.defineProperty(BoundingBox.prototype, "height", {
        get: function () {
            return this.getX();
        },
        set: function (value) {
            this.setHeight(value);
        },
        enumerable: false,
        configurable: true
    });
    BoundingBox.prototype.getHeight = function () {
        if (typeof this._height === "number")
            return this._height;
        if (typeof this._height === "string")
            return stringToPixelNum(this._height, this.parent ? this.parent.bounds.getHeight() : 0);
        var value = this._height.get();
        if (typeof value === "number")
            return value;
        if (typeof value === "string")
            return stringToPixelNum(value, this.parent ? this.parent.bounds.getHeight() : 0);
        return 0;
    };
    BoundingBox.prototype.setHeight = function (v) {
        if (typeof this._height === "object")
            this._height.set(v);
        else
            this._height = v;
    };
    BoundingBox.prototype.moveEntity = function (entity) {
        entity.setBox(this);
        return this;
    };
    BoundingBox.prototype.fromSave = function (setter) {
        for (var key in setter) {
            if (Object.prototype.hasOwnProperty.call(setter, key) &&
                key === "rebound")
                this.rebound = setter[key];
        }
    };
    BoundingBox.prototype.toJSON = function () {
        return {
            x: this.getX(),
            y: this.getY(),
            width: this.getWidth(),
            height: this.getHeight(),
            rebound: this.rebound,
        };
    };
    return BoundingBox;
}());

var World = (function (_super) {
    __extends(World, _super);
    function World(scene) {
        var _this = _super.call(this) || this;
        var x = null;
        var y = null;
        var width = null;
        var height = null;
        _this.isActive = false;
        _this.bounds = new BoundingBox(_this, {
            get: function () {
                return x || scene.camera.x;
            },
            set: function (value) {
                x = value;
            },
        }, {
            get: function () {
                return y || scene.camera.y;
            },
            set: function (value) {
                y = value;
            },
        }, {
            get: function () {
                return width || scene.camera.width;
            },
            set: function (value) {
                width = value;
            },
        }, {
            get: function () {
                return height || scene.camera.height;
            },
            set: function (value) {
                height = value;
            },
        });
        return _this;
    }
    Object.defineProperty(World.prototype, Symbol.toStringTag, {
        get: function () {
            return "World";
        },
        enumerable: false,
        configurable: true
    });
    World.prototype.activation = function (value) {
        this.isActive = value;
    };
    World.prototype.fromSave = function (setter) {
        for (var key in setter) {
            if (Object.prototype.hasOwnProperty.call(setter, key)) {
                if (key === "boundingBox")
                    this.bounds.fromSave(setter[key]);
                else if (this[key] !== setter[key])
                    this[key] = setter[key];
            }
        }
    };
    World.prototype.toJSON = function () {
        return {
            isActive: this.isActive,
            boundingBox: this.bounds,
        };
    };
    return World;
}(EventEmitter));

var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(scene, x, y) {
        var _a;
        var _this_1 = _super.call(this) || this;
        _this_1.hidden = false;
        _this_1.name = "";
        _this_1.lineWidth = 1;
        _this_1.angle = 0;
        _this_1.alpha = 1;
        _this_1.zindex = 0;
        _this_1.fixed = false;
        _this_1.hooks = [];
        _this_1.hookIndex = 0;
        _this_1.originX = 0;
        _this_1.originY = 0;
        _this_1.scalex = 1;
        _this_1.scaley = 1;
        _this_1.bodyBox = null;
        _this_1.vx = 0;
        _this_1.vy = 0;
        _this_1._speed = 1;
        _this_1._gravity = 0;
        _this_1._bounceWithoutLosingSpeed = true;
        _this_1.scene = scene;
        _this_1.box = (_a = scene === null || scene === void 0 ? void 0 : scene.world) === null || _a === void 0 ? void 0 : _a.bounds;
        _this_1.x = x;
        _this_1.y = y;
        _this_1.isMoving = true;
        var rest = 0.9;
        _this_1.setName(_this_1.constructor.name);
        _this_1.initBodyBox(scene);
        _this_1.on("move:velocity", function (e) {
            var _a, _b;
            var restitution = rest + (e._bounceWithoutLosingSpeed ? 0.1 : 0);
            e.x += e.vx * e._speed * e.scene.game.secondsPassed;
            e.y += e.vy * (e._gravity || e._speed) * e.scene.game.secondsPassed;
            if ((_b = (_a = e.box) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.isActive) {
                if (typeOf(e) === "Circle") {
                    if (e.x - e.box.getX() <
                        e.radius * e.getScale().r +
                            e.radius * e.getScale().r * e.originX) {
                        if (e.isMoving)
                            e.isMoving = false;
                        if (e.box.rebound)
                            e.vx = Math.abs(e.vx) * restitution;
                        e.x =
                            e.radius * e.getScale().r +
                                e.radius * e.getScale().r * e.originX +
                                e.box.getX();
                    }
                    else if (e.x - e.box.getX() >
                        e.box.getWidth() +
                            e.radius * e.getScale().r +
                            e.radius * e.getScale().r * e.originX) {
                        if (e.isMoving)
                            e.isMoving = false;
                        if (e.box.rebound)
                            e.vx = -Math.abs(e.vx) * restitution;
                        e.x =
                            e.box.getWidth() +
                                e.box.getX() -
                                e.radius * e.getScale().r +
                                e.radius * e.getScale().r * e.originX;
                    }
                    if (e.y - e.box.getY() <
                        e.radius * e.getScale().r +
                            e.radius * e.getScale().r * e.originY) {
                        if (e.isMoving)
                            e.isMoving = false;
                        if (e.box.rebound)
                            e.vy = Math.abs(e.vy) * restitution;
                        e.y =
                            e.radius * e.getScale().r +
                                e.radius * e.getScale().r * e.originY -
                                e.box.getY();
                    }
                    else if (e.y - e.box.getY() >
                        e.box.getHeight() +
                            e.radius * e.getScale().r +
                            e.radius * e.getScale().r * e.originY) {
                        if (e.isMoving)
                            e.isMoving = false;
                        if (e.box.rebound)
                            e.vy = -Math.abs(e.vy) * restitution;
                        e.y =
                            e.box.getHeight() +
                                e.box.getY() -
                                e.radius * e.getScale().r +
                                e.radius * e.getScale().r * e.originY;
                    }
                }
                else if (typeOf(e) === "Rectangle") {
                    if (e.x - e.box.getX() <
                        (e.width / 2) * e.scalex +
                            (e.width / 2) * e.scalex * e.originX) {
                        if (e.isMoving)
                            e.isMoving = false;
                        if (e.box.rebound)
                            e.vx = Math.abs(e.vx) * restitution;
                        e.x =
                            (e.width / 2) * e.scalex +
                                (e.width / 2) *
                                    e.scalex *
                                    e.originX +
                                e.box.getX();
                    }
                    else if (e.x - e.box.getX() >
                        e.box.getWidth() -
                            (e.width / 2) * e.scalex +
                            (e.width / 2) * e.scalex * e.originX) {
                        if (e.isMoving)
                            e.isMoving = false;
                        if (e.box.rebound)
                            e.vx = -Math.abs(e.vx) * restitution;
                        e.x =
                            e.box.getWidth() -
                                (e.width / 2) * e.scalex +
                                (e.width / 2) *
                                    e.scalex *
                                    e.originX +
                                e.box.getX();
                    }
                    if (e.y - e.box.getY() <
                        (e.height / 2) * e.scaley +
                            (e.height / 2) *
                                e.scaley *
                                e.originY) {
                        if (e.isMoving)
                            e.isMoving = false;
                        if (e.box.rebound)
                            e.vy = Math.abs(e.vy) * restitution;
                        e.y =
                            (e.height / 2) * e.scaley +
                                (e.height / 2) *
                                    e.scaley *
                                    e.originY +
                                e.box.getY();
                    }
                    else if (e.y - e.box.getY() >
                        e.box.getHeight() -
                            (e.height / 2) * e.scaley +
                            (e.height / 2) *
                                e.scaley *
                                e.originY) {
                        if (e.isMoving)
                            e.isMoving = false;
                        if (e.box.rebound)
                            e.vy = -Math.abs(e.vy) * restitution;
                        e.y =
                            e.box.getHeight() -
                                (e.height / 2) * e.scaley +
                                (e.height / 2) *
                                    e.scaley *
                                    e.originY +
                                e.box.getY();
                    }
                }
            }
            else if (e.isMoving)
                e.isMoving = false;
        });
        return _this_1;
    }
    Object.defineProperty(Entity.prototype, "points", {
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.init = function () { };
    Entity.prototype.beforeRedraw = function () { };
    Entity.prototype.redraw = function (secondsPassed) { };
    Entity.prototype.afterRedraw = function () { };
    Entity.prototype.draw = function (context) { };
    Entity.prototype.destroy = function () {
        this.manager.remove(this);
    };
    Entity.prototype.setBox = function (box) {
        this.box = box;
        return this;
    };
    Object.defineProperty(Entity.prototype, "body", {
        get: function () {
            return this.getBodyBox();
        },
        set: function (value) {
            this.setBodyBox(value);
        },
        enumerable: false,
        configurable: true
    });
    Entity.prototype.setBodyBox = function (box) {
        if (box)
            this.bodyBox = box;
        else
            this.initBodyBox(this.scene);
        return this;
    };
    Entity.prototype.getBodyBox = function () {
        return this.bodyBox;
    };
    Entity.prototype.collide = function (entity) {
        var _a, _b, _c, _d;
        if (typeOf(entity) === "World" || typeOf(entity) === "BoundingBox") {
            if (typeOf(this) === "Circle")
                return this.collideCircWorld(this, (_b = (_a = entity) === null || _a === void 0 ? void 0 : _a.bounds) !== null && _b !== void 0 ? _b : entity);
            if (typeOf(this) === "Rectangle")
                return this.collideRectWorld(this, (_d = (_c = entity) === null || _c === void 0 ? void 0 : _c.bounds) !== null && _d !== void 0 ? _d : entity);
            return false;
        }
        if (typeOf(this) === "Circle" && typeOf(entity) === "Circle")
            return this.collideCirc(this, entity);
        if (typeOf(this) === "Rectangle" && typeOf(entity) === "Rectangle")
            return this.collideRect(this, entity);
        if (typeOf(this) === "Circle" && typeOf(entity) === "Rectangle")
            return this.collideCircRect(this, entity);
        if (typeOf(this) === "Rectangle" && typeOf(entity) === "Circle")
            return this.collideCircRect(entity, this);
        return false;
    };
    Entity.prototype.setScaleX = function (value) {
        if (this.scalex !== value)
            this.scalex = value;
        return this;
    };
    Entity.prototype.setScaleY = function (value) {
        if (this.scaley !== value)
            this.scaley = value;
        return this;
    };
    Entity.prototype.setScale = function (vx, vy) {
        this.setScaleX(vx);
        this.setScaleY(vy !== null && vy !== void 0 ? vy : vx);
        return this;
    };
    Entity.prototype.getScale = function () {
        return {
            x: this.scalex,
            y: this.scaley,
        };
    };
    Entity.prototype.setOriginX = function (value) {
        if (this.originX !== value)
            this.originX = value;
        return this;
    };
    Entity.prototype.setOriginY = function (value) {
        if (this.originY !== value)
            this.originY = value;
        return this;
    };
    Entity.prototype.setOrigin = function (vx, vy) {
        this.setOriginX(vx);
        this.setOriginY(vy !== null && vy !== void 0 ? vy : vx);
        return this;
    };
    Entity.prototype.getOrigin = function () {
        return {
            x: this.originX,
            y: this.originY,
        };
    };
    Entity.prototype.setVelocityX = function (value) {
        if (this.vx !== value)
            this.vx = value;
        return this;
    };
    Entity.prototype.setVelocityY = function (value) {
        if (this.vy !== value)
            this.vy = value;
        return this;
    };
    Entity.prototype.setVelocity = function (vx, vy) {
        this.setVelocityX(vx);
        this.setVelocityY(vy);
        return this;
    };
    Entity.prototype.getVelocity = function () {
        return {
            x: this.vx,
            y: this.vy,
        };
    };
    Entity.prototype.getSpeed = function () {
        return this._speed;
    };
    Entity.prototype.setSpeed = function (value) {
        if (this._speed !== value)
            this._speed = value;
        return this;
    };
    Entity.prototype.getGravity = function () {
        return this._gravity;
    };
    Entity.prototype.setGravity = function (value) {
        if (this._gravity !== value)
            this._gravity = value;
        return this;
    };
    Entity.prototype.setManager = function (manager) {
        this.manager = manager;
        return this;
    };
    Entity.prototype.setBounceWithoutLosingSpeed = function (value) {
        this._bounceWithoutLosingSpeed = value;
        return this;
    };
    Entity.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    Entity.prototype.getAudio = function (name) {
        return this.scene.getAudio(name);
    };
    Entity.prototype.collideCirc = function (circle1, circle2) {
        return (Math.pow((circle1.x - circle2.x), 2) + Math.pow((circle1.y - circle2.y), 2) <=
            Math.pow((circle1.radius * circle1.getScale().r +
                circle2.radius * circle2.getScale().r), 2));
    };
    Entity.prototype.collideRect = function (rect1, rect2) {
        var rect1Body = rect1.getBodyBox();
        var xRect1 = rect1.x +
            rect1Body.getX() +
            (rect1.width / 2) * -rect1.getOrigin().x * rect1.getScale().x;
        var yRect1 = rect1.y +
            rect1Body.getY() +
            (rect1.height / 2) * -rect1.getOrigin().y * rect1.getScale().y;
        if (!rect2.getBodyBox)
            return !(xRect1 - rect1Body.getWidth() / 2 >
                rect2.width + rect2.x - rect2.width / 2 ||
                rect2.x - rect2.width / 2 >
                    rect1Body.getWidth() + xRect1 - rect1Body.getWidth() / 2 ||
                yRect1 - rect1Body.getHeight() / 2 >
                    rect2.height + rect2.y - rect2.height / 2 ||
                rect2.y - rect2.height / 2 >
                    rect1Body.getHeight() + yRect1 - rect1Body.getHeight() / 2);
        var rect2Body = rect2.getBodyBox();
        var xRect2 = rect2.x +
            rect2Body.getX() +
            (rect2.width / 2) * -rect2.getOrigin().x * rect2.getScale().x;
        var yRect2 = rect2.y +
            rect2Body.getY() +
            (rect2.height / 2) * -rect2.getOrigin().y * rect2.getScale().y;
        return !(xRect1 - rect1Body.getWidth() / 2 >
            rect2Body.getWidth() + xRect2 - rect2Body.getWidth() / 2 ||
            xRect2 - rect2Body.getWidth() / 2 >
                rect1Body.getWidth() + xRect1 - rect1Body.getWidth() / 2 ||
            yRect1 - rect1Body.getHeight() / 2 >
                rect2Body.getHeight() + yRect2 - rect2Body.getHeight() / 2 ||
            yRect2 - rect2Body.getHeight() / 2 >
                rect1Body.getHeight() + yRect1 - rect1Body.getHeight() / 2);
    };
    Entity.prototype.collideCircRect = function (circle, rect) {
        var circleDistanceX = Math.abs(circle.x - rect.x - rect.width / 2);
        var circleDistanceY = Math.abs(circle.y - rect.y - rect.height / 2);
        if (circleDistanceX > rect.width / 2 + circle.radius * circle.getScale().r ||
            circleDistanceY > rect.height / 2 + circle.radius * circle.getScale().r)
            return false;
        if (circleDistanceX <= rect.width / 2 || circleDistanceY <= rect.height / 2)
            return true;
        return (Math.pow((circleDistanceX - rect.width / 2), 2) +
            Math.pow((circleDistanceY - rect.height / 2), 2) <=
            circle.radius * Math.pow(circle.getScale().r, 2));
    };
    Entity.prototype.collideCircWorld = function (circle, rect) {
        var circleDistanceX = Math.abs(circle.x - rect.getX());
        var circleDistanceY = Math.abs(circle.y - rect.getY());
        if (circleDistanceX > rect.getWidth() + circle.radius * circle.getScale().r ||
            circleDistanceY > rect.getHeight() + circle.radius * circle.getScale().r)
            return false;
        if (circleDistanceX <= rect.getWidth() ||
            circleDistanceY <= rect.getHeight())
            return true;
        return (Math.pow((circleDistanceX - rect.getWidth()), 2) +
            Math.pow((circleDistanceY - rect.getHeight()), 2) <=
            circle.radius * Math.pow(circle.getScale().r, 2));
    };
    Entity.prototype.collideRectWorld = function (rect1, rect2) {
        var rect1Body = rect1.getBodyBox();
        return !(rect1.x + rect1Body.getX() - rect1Body.getWidth() / 2 >
            rect2.getWidth() + rect2.getX() ||
            rect2.getX() > rect1Body.getWidth() + (rect1.x + rect1Body.getX()) ||
            rect1.y + rect1Body.getY() - rect1Body.getHeight() / 2 >
                rect2.getHeight() + rect2.getY() ||
            rect2.getY() > rect1Body.getHeight() + (rect1.y + rect1Body.getY()));
    };
    Entity.prototype.fromSave = function (setter) {
        for (var key in setter) {
            if (Object.prototype.hasOwnProperty.call(setter, key)) {
                if (this[key] !== setter[key])
                    this[key] = setter[key];
            }
        }
    };
    Entity.prototype.toJSON = function (entityProperties) {
        var _this_1 = this;
        var properties = {};
        entityProperties.forEach(function (property) {
            properties[property] = property in _this_1 ? _this_1[property] : null;
        });
        return __assign({ x: this.x, y: this.y, name: this.name }, properties);
    };
    Entity.prototype.initBodyBox = function (scene) {
        var x = 0;
        var y = 0;
        var width = null;
        var height = null;
        var _this = this;
        this.setBodyBox(new BoundingBox(scene, {
            get: function () {
                return x;
            },
            set: function (value) {
                x = value;
            },
        }, {
            get: function () {
                return y;
            },
            set: function (value) {
                y = value;
            },
        }, {
            get: function () {
                return (width || _this.width) * _this.scalex;
            },
            set: function (value) {
                width = value;
            },
        }, {
            get: function () {
                return (height || _this.height) * _this.scaley;
            },
            set: function (value) {
                height = value;
            },
        }));
    };
    return Entity;
}(EventEmitter));

var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(scene, x, y, w, h) {
        var _this = _super.call(this, scene, x, y) || this;
        _this.cropw = 1;
        _this.croph = 1;
        _this.width = w;
        _this.height = h;
        _this.fillColor = "#fff";
        return _this;
    }
    Object.defineProperty(Rectangle.prototype, Symbol.toStringTag, {
        get: function () {
            return "Rectangle";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "points", {
        get: function () {
            var x = this.x +
                this.body.getX() +
                (this.width / 2) * -this.getOrigin().x * this.getScale().x;
            var y = this.y +
                this.body.getY() +
                (this.height / 2) * -this.getOrigin().y * this.getScale().y;
            return [
                new Vector2(x, y),
                new Vector2(x + this.body.width, y),
                new Vector2(x, y + this.body.height),
                new Vector2(x + this.body.width, y + this.body.height),
            ];
        },
        enumerable: false,
        configurable: true
    });
    Rectangle.prototype.draw = function (context) {
        context.globalAlpha =
            this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1);
        if (!this.fixed)
            context.translate(this.scene.camera.x, this.scene.camera.y);
        context.translate((this.width * this.scalex) / -2, (this.height * this.scaley) / -2);
        context.translate((this.width / 2) * -this.originX * this.scalex, (this.height / 2) * -this.originY * this.scaley);
        if (isDefined(this.fillColor)) {
            context.fillStyle = this.fillColor.toString(16);
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        if (isDefined(this.strokeColor)) {
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.strokeColor.toString(16);
            context.strokeRect(this.x, this.y, this.width * this.scalex * this.cropw, this.height * this.scaley * this.croph);
        }
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (this.scene.game.debug)
            debugCenter(context, this);
    };
    Rectangle.prototype.setCropW = function (value) {
        if (this.cropw !== value)
            this.cropw = value;
        return this;
    };
    Rectangle.prototype.setCropH = function (value) {
        if (this.croph !== value)
            this.croph = value;
        return this;
    };
    Rectangle.prototype.setCrop = function (vw, vh) {
        if (vw === void 0) { vw = 1; }
        if (vh === void 0) { vh = 1; }
        this.setCropW(vw);
        this.setCropH(vh);
        return this;
    };
    Rectangle.prototype.getCrop = function () {
        return {
            w: this.cropw,
            h: this.croph,
        };
    };
    return Rectangle;
}(Entity));

var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(scene, x, y, r) {
        var _this = _super.call(this, scene, x, y) || this;
        _this.scaler = 1;
        delete _this.width;
        delete _this.height;
        delete _this.scalex;
        delete _this.scaley;
        delete _this.setScaleX;
        delete _this.setScaleY;
        _this.radius = r;
        _this.angle = 360;
        _this.fillColor = "#fff";
        return _this;
    }
    Object.defineProperty(Circle.prototype, Symbol.toStringTag, {
        get: function () {
            return "Circle";
        },
        enumerable: false,
        configurable: true
    });
    Circle.prototype.setScaleR = function (value) {
        this.scaler = value;
        return this;
    };
    Circle.prototype.getScale = function () {
        return {
            r: this.scaler,
        };
    };
    Circle.prototype.draw = function (context) {
        var angle = Math.PI * 2 * (this.angle / 360);
        context.globalAlpha =
            this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1);
        if (!this.fixed)
            context.translate(this.scene.camera.x, this.scene.camera.y);
        context.translate(this.radius * -this.originX * this.scaler, this.radius * -this.originY * this.scaler);
        if (isDefined(this.fillColor)) {
            context.beginPath();
            context.fillStyle = this.fillColor.toString(16);
            context.arc(this.x, this.y, this.radius * this.scaler, 0, Math.abs(angle), angle >= 0);
            context.fill();
            context.closePath();
        }
        if (isDefined(this.strokeColor)) {
            context.beginPath();
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.strokeColor.toString(16);
            context.arc(this.x, this.y, this.radius * this.scaler, 0, Math.abs(angle), angle >= 0);
            context.stroke();
            context.closePath();
        }
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (this.scene.game.debug)
            debugCenter(context, this);
    };
    return Circle;
}(Entity));

var Image = (function (_super) {
    __extends(Image, _super);
    function Image(scene, x, y, use) {
        var _this = _super.call(this, scene, x, y, null, null) || this;
        _this.use = use;
        return _this;
    }
    Image.prototype.setSize = function (image) {
        this.width = image.width;
        this.height = image.height;
    };
    Image.prototype.draw = function (context) {
        var image = this.manager.medias.images.get(this.use);
        context.globalAlpha =
            this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1);
        if (!this.fixed)
            context.translate(this.scene.camera.x, this.scene.camera.y);
        context.translate((this.width * this.scalex) / -2, (this.height * this.scaley) / -2);
        context.translate((this.width / 2) * -this.originX * this.scalex, (this.height / 2) * -this.originY * this.scaley);
        if (isDefined(image)) {
            if (!isDefined(this.width) && !isDefined(this.height))
                this.setSize(image);
            context.drawImage(image, 0, 0, this.width * this.cropw, this.height * this.croph, this.x - this.scene.camera.x, this.y - this.scene.camera.y, this.width * this.scalex * this.cropw, this.height * this.scaley * this.croph);
        }
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (this.scene.game.debug)
            debugCenter(context, this);
    };
    return Image;
}(Rectangle));

var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(scene, x, y, use) {
        var _this = _super.call(this, scene, x, y, use) || this;
        _this.sprite = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        return _this;
    }
    Sprite.prototype.draw = function (context) {
        var image = this.manager.medias.images.get(this.use);
        context.globalAlpha =
            this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1);
        if (!this.fixed)
            context.translate(this.scene.camera.x, this.scene.camera.y);
        context.translate((this.width * this.scalex) / -2, (this.height * this.scaley) / -2);
        context.translate((this.width / 2) * -this.originX * this.scalex, (this.height / 2) * -this.originY * this.scaley);
        if (isDefined(image)) {
            if (!isDefined(this.width) && !isDefined(this.height))
                this.setSize(this.sprite);
            context.drawImage(image, this.sprite.x, this.sprite.y, this.sprite.width * this.cropw, this.sprite.height * this.croph, this.x, this.y, this.width * this.scalex * this.cropw, this.height * this.scaley * this.croph);
        }
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (this.scene.game.debug)
            debugCenter(context, this);
    };
    Sprite.prototype.toJSON = function (entityProperties) {
        return __assign(__assign({}, _super.prototype.toJSON.call(this, entityProperties)), { sprite: this.sprite });
    };
    return Sprite;
}(Image));

var Text$1 = (function (_super) {
    __extends(Text, _super);
    function Text(scene, x, y, content, style) {
        var _this = _super.call(this, scene, x, y, null, null) || this;
        _this.content = content;
        _this.style = Object.assign({
            shadow: null,
            lineSpacing: 6,
            background: null,
            align: "center",
            padding: null,
            font: null,
        }, style);
        _this.style.shadow = Object.assign({
            offsetX: 0,
            offsetY: 0,
            color: "#000",
            blur: 0,
        }, _this.style.shadow);
        _this.style.padding = Object.assign({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        }, _this.style.padding);
        _this.style.font = Object.assign({
            size: 16,
            family: "Arial",
        }, _this.style.font);
        return _this;
    }
    Text.prototype.draw = function (context) {
        var _this = this;
        var align = 0;
        if (this.style.align === "right")
            align = this.width / -2;
        if (this.style.align === "left")
            align = this.width / 2;
        context.globalAlpha =
            this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1);
        if (!this.fixed)
            context.translate(this.scene.camera.x, this.scene.camera.y);
        context.textBaseline = "top";
        context.font = this.style.font.size + "px " + this.style.font.family;
        this.height = this.content.split("\n").reduce(function (rest, line, index) {
            if (index === 0) {
                _this.width = context.measureText(line.trim()).width;
                return _this.style.font.size;
            }
            if (_this.width < context.measureText(line.trim()).width)
                _this.width = context.measureText(line.trim()).width;
            return rest + _this.style.lineSpacing + _this.style.font.size;
        }, 0);
        context.translate((this.width * this.scalex) / -2, (this.height * this.scaley) / -2);
        context.translate((this.width / 2) * -this.originX * this.scalex, (this.height / 2) * -this.originY * this.scaley);
        if (isDefined(this.style.background)) {
            if (this.style.background instanceof Entity ||
                this.manager.medias.images.get(this.style.background) instanceof Entity) {
                var image = (typeOf(this.style.background) === "string"
                    ? this.manager.medias.images.get(this.style.background)
                    : this.style.background);
                if (image.getScale().x !== this.getScale().x ||
                    image.getScale().y !== this.getScale().y)
                    image.setScale(this.getScale().x, this.getScale().y);
                if (image.getOrigin().x !== this.getOrigin().x ||
                    image.getOrigin().y !== this.getOrigin().y)
                    image.setOrigin(this.getOrigin().x, this.getOrigin().y);
                if (image.box !== this.box)
                    image.setBox(this.box);
                if (image.x !== this.x)
                    image.x = this.x;
                if (image.y !== this.y)
                    image.y = this.y;
            }
            else {
                context.fillStyle = this.style.background.toString(16);
                context.fillRect(this.x, this.y, this.width + this.style.padding.left + this.style.padding.right, this.height + this.style.padding.top + this.style.padding.bottom);
            }
        }
        if (isDefined(this.fillColor)) {
            context.fillStyle = this.fillColor.toString(16);
            this.content.split("\n").forEach(function (line, index) {
                context.fillText(line.trim(), _this.x + _this.style.padding.left + align, _this.y +
                    _this.style.padding.top +
                    (_this.style.lineSpacing + _this.style.font.size) * index);
            }, 0);
        }
        if (isDefined(this.strokeColor)) {
            context.lineWidth = this.lineWidth;
            context.strokeStyle = this.strokeColor.toString(16);
            this.content.split("\n").forEach(function (line, index) {
                context.strokeText(line.trim(), _this.x + _this.style.padding.left + align, _this.y +
                    _this.style.padding.top +
                    (_this.style.lineSpacing + _this.style.font.size) * index);
            }, 0);
        }
        context.shadowBlur = this.style.shadow.blur;
        context.shadowColor = this.style.shadow.color.toString(16);
        context.shadowOffsetX = this.style.shadow.offsetX;
        context.shadowOffsetY = this.style.shadow.offsetY;
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (this.scene.game.debug)
            debugCenter(context, this);
    };
    Text.prototype.getScale = function () {
        return {
            x: 1,
            y: 1,
        };
    };
    Text.prototype.setText = function (content) {
        this.content = content;
        return this;
    };
    Text.prototype.toJSON = function (entityProperties) {
        return __assign(__assign({}, _super.prototype.toJSON.call(this, entityProperties)), { content: this.content });
    };
    return Text;
}(Rectangle));

var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera(scene) {
        var _this = _super.call(this, scene, 0, 0, 0, 0) || this;
        _this.setName("camera");
        _this.offAll("move:velocity");
        return _this;
    }
    Camera.prototype.init = function () {
        this.center = new BoundingBox(this.scene, "50%", "50%", 2, 2);
        this.width = this.scene.game.canvas.width;
        this.height = this.scene.game.canvas.height;
    };
    Camera.prototype.draw = function () { };
    Camera.prototype.setValues = function (x, y, width, height) {
        if (isDefined(x))
            this.x = x;
        if (isDefined(y))
            this.y = y;
        if (isDefined(width))
            this.width = width;
        if (isDefined(height))
            this.height = height;
        return this;
    };
    Camera.prototype.setTarget = function (entity) {
        if (typeof entity === "string")
            this.target = this.scene.entities.getEntity(entity);
        else
            this.target = entity;
        return this;
    };
    Camera.prototype.fromSave = function (setter) {
        for (var key in setter) {
            if (Object.prototype.hasOwnProperty.call(setter, key)) {
                if (key === "targetName")
                    this.target = this.manager.getEntity(setter[key]);
                else if (key === "center") {
                    if (!this.center && typeOf(this.center) !== "BoundingBox")
                        this.center = new BoundingBox(this.scene, setter[key].x, setter[key].y, setter[key].width, setter[key].height);
                    this.center.fromSave(setter[key]);
                }
                else if (this[key] !== setter[key])
                    this[key] = setter[key];
            }
        }
    };
    Camera.prototype.toJSON = function () {
        var _a;
        return {
            x: this.x,
            y: this.y,
            name: this.name,
            width: this.width,
            height: this.height,
            targetName: (_a = this.target) === null || _a === void 0 ? void 0 : _a.name,
            center: this.center,
        };
    };
    return Camera;
}(Rectangle));

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Rectangle: Rectangle,
    Circle: Circle,
    Image: Image,
    Sprite: Sprite,
    Text: Text$1,
    Camera: Camera
});

var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(scene, callback, o, unique) {
        if (unique === void 0) { unique = false; }
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.callback = callback;
        _this.unique = unique;
        _this.isPlaying = false;
        _this.wait = 0;
        _this.update = _this.update.bind(_this);
        _this.scene.game.globals.on("updated", _this.update);
        _this.setTimeWait(o);
        return _this;
    }
    Timer.prototype.getWaitValue = function () {
        return this.wait;
    };
    Timer.prototype.setWaitValue = function (v) {
        this.wait = v;
        return this;
    };
    Timer.prototype.setTimeWait = function (o) {
        this.useTime = "time" in o;
        this.useTick = "tick" in o;
        this.time = o.time;
        this.tick = o.tick;
        return this.setWaitValue(0);
    };
    Timer.prototype.update = function () {
        if (this.isPlaying) {
            if (this.useTime) {
                this.setWaitValue(this.wait + this.scene.game.secondsPassed * 1000);
                if (this.time <= this.wait) {
                    this.callback();
                    if (this.unique)
                        this.cancel();
                    else
                        this.setWaitValue(0);
                }
            }
            else if (this.useTick) {
                this.setWaitValue(this.wait + 1);
                if (this.tick <= this.wait) {
                    this.callback();
                    if (this.unique)
                        this.cancel();
                    else
                        this.setWaitValue(0);
                }
            }
        }
    };
    Timer.prototype.cancel = function () {
        this.scene.game.globals.off("updated", this.update);
        this.pause();
    };
    Timer.prototype.play = function () {
        if (!this.isPlaying)
            this.isPlaying = true;
    };
    Timer.prototype.pause = function () {
        if (this.isPlaying)
            this.isPlaying = false;
    };
    return Timer;
}(EventEmitter));

var memory = new Map();
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(option) {
        var _this = _super.call(this) || this;
        _this.forcedLoadingOfEntities = [];
        _this.hooks = [];
        _this.hookIndex = 0;
        _this.managers = new ContainerManager(_this);
        _this.entities = new EntityManager(_this);
        _this.world = new World(_this);
        _this.name = option.name;
        _this.isPlayed = "none";
        _this.played = false;
        _this.alpha = 1;
        var self = _this;
        _this.create = {
            box: function (x, y, width, height, entities) {
                if (entities === void 0) { entities = []; }
                var box = new BoundingBox(self.world, x, y, width, height);
                entities.forEach(function (entity) { return box.moveEntity(entity); });
                return box;
            },
            timer: function (callback, o, unique) {
                if (unique === void 0) { unique = false; }
                return new Timer(self, callback, o, unique);
            },
            entity: {
                rectangle: function (x, y, w, h, fillColor, zindex) {
                    if (zindex === void 0) { zindex = 0; }
                    var rect = new Rectangle(self, x, y, w, h);
                    rect.zindex = zindex;
                    rect.fillColor = fillColor;
                    self.entities.add(rect);
                    return rect;
                },
                circle: function (x, y, r, fillColor, zindex) {
                    if (zindex === void 0) { zindex = 0; }
                    var circ = new Circle(self, x, y, r);
                    circ.zindex = zindex;
                    circ.fillColor = fillColor;
                    self.entities.add(circ);
                    return circ;
                },
                image: function (x, y, use, zindex) {
                    if (zindex === void 0) { zindex = 0; }
                    var img = new Image(self, x, y, use);
                    img.zindex = zindex;
                    self.entities.add(img);
                    return img;
                },
                sprite: function (x, y, use, spriteWidth, spriteHeight, zindex) {
                    if (zindex === void 0) { zindex = 0; }
                    var srt = new Sprite(self, x, y, use);
                    srt.sprite.width = spriteWidth;
                    srt.sprite.height = spriteHeight;
                    srt.zindex = zindex;
                    self.entities.add(srt);
                    return srt;
                },
                text: function (x, y, content, style, zindex) {
                    if (style === void 0) { style = {}; }
                    if (zindex === void 0) { zindex = 0; }
                    var img = new Text$1(self, x, y, content, style);
                    img.zindex = zindex;
                    self.entities.add(img);
                    return img;
                },
            },
        };
        _this.camera = new Camera(_this);
        _this.entities.add(_this.camera);
        return _this;
    }
    Object.defineProperty(Scene.prototype, Symbol.toStringTag, {
        get: function () {
            return "Scene";
        },
        enumerable: false,
        configurable: true
    });
    Scene.prototype.init = function () { };
    Scene.prototype.beforeUpdate = function () { };
    Scene.prototype.update = function (secondsPassed) { };
    Scene.prototype.afterUpdate = function () { };
    Scene.prototype.changeAllow = function (scene, state) {
        return true;
    };
    Scene.prototype.getAudio = function (name) {
        if (memory.has(name) && !memory.get(name).isDeleted)
            return memory.get(name);
        var audio = this.entities.medias.audios.get(name);
        if (audio) {
            var manager = new AudioManager(this.game, audio, name);
            memory.set(name, manager);
            manager.on("destroy", function () {
                memory.delete(name);
            });
            return manager;
        }
        return null;
    };
    Scene.prototype.setName = function (value) {
        this.name = value;
        return this;
    };
    Scene.prototype.setGame = function (value) {
        this.game = value;
        return this;
    };
    Scene.prototype.setManager = function (value) {
        this.manager = value;
        return this;
    };
    Scene.prototype.fromSave = function (setter) {
        for (var key in setter) {
            if (Object.prototype.hasOwnProperty.call(setter, key)) {
                if (key === "entities")
                    this.entities.getAll().map(function (entity) {
                        var finded = setter.entities.find(function (v) { return v.name === entity.name; });
                        if (finded)
                            entity.fromSave(finded);
                    });
                else if (key === "camera")
                    this.camera.fromSave(setter[key]);
                else if (key === "world")
                    this.world.fromSave(setter[key]);
                else if (this[key] !== setter[key])
                    this[key] = setter[key];
            }
        }
    };
    Scene.prototype.toJSON = function (getter) {
        return {
            name: this.name,
            world: this.world,
            camera: this.camera,
            alpha: this.alpha,
            entities: this.entities
                .getAll()
                .filter(function (entity) {
                if (entity.name === "camera")
                    return false;
                if (typeof getter !== "object")
                    return true;
                return !getter.exclude.entities.includes(entity.name);
            })
                .map(function (entity) { return entity.toJSON(getter.entityProperties || []); }),
        };
    };
    return Scene;
}(EventEmitter));

var Mouse = (function (_super) {
    __extends(Mouse, _super);
    function Mouse(game) {
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        _this.width = 1;
        _this.height = 1;
        _this.click = false;
        _this.currentClickPos = new Map();
        var clickPos = [
            "left",
            "center",
            "right",
        ];
        _this.game = game;
        game.canvas.addEventListener("mousedown", function (e) {
            _this.click = true;
            _this.currentClickPos.set(clickPos[e.button], e);
            _this.globals.emit("mouse:down-" + clickPos[e.button], e);
        });
        game.canvas.addEventListener("mousemove", function (e) {
            _this.x = e.offsetX;
            _this.y = e.offsetY;
            _this.globals.emit("mouse:move", e);
        });
        game.canvas.addEventListener("mouseup", function (e) {
            _this.click = false;
            _this.currentClickPos.delete(clickPos[e.button]);
            _this.globals.emit("mouse:up-" + clickPos[e.button], e);
        });
        game.canvas.addEventListener("touchstart", function (e) {
            var rect = game.canvas.getBoundingClientRect();
            _this.x = e.touches[0].clientX - rect.left;
            _this.y = e.touches[0].clientY - rect.top;
            _this.click = true;
            _this.currentClickPos.set("left", e);
            _this.globals.emit("mouse:down-left", e);
        });
        game.canvas.addEventListener("touchmove", function (e) {
            var rect = game.canvas.getBoundingClientRect();
            _this.x = e.touches[0].clientX - rect.left;
            _this.y = e.touches[0].clientY - rect.top;
            _this.globals.emit("mouse:move", e);
        });
        game.canvas.addEventListener("touchend", function (e) {
            _this.click = false;
            _this.currentClickPos.delete("left");
            _this.globals.emit("mouse:up-left", e);
        });
        return _this;
    }
    Object.defineProperty(Mouse.prototype, Symbol.toStringTag, {
        get: function () {
            return "Rectangle";
        },
        enumerable: false,
        configurable: true
    });
    Mouse.prototype.update = function () {
        var _this = this;
        this.currentClickPos.forEach(function (e, n) {
            _this.globals.emit("mouse:down-" + n, e);
        });
    };
    Mouse.prototype.draw = function (context) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        if (this.game.debug)
            debugCenter(context, this);
    };
    return Mouse;
}(EventEmitter));

var keyMap = {
    " ": ["Space", "Spacebar", "Space Bar"],
    AltGraph: ["Alt Gr"],
    ArrowDown: ["Down"],
    ArrowLeft: ["Left"],
    ArrowRight: ["Right"],
    ArrowUp: ["Up"],
    Backspace: ["Backspace"],
    Control: ["Ctrl", "Ctl"],
    Delete: ["Delete", "Del"],
    Enter: ["Enter", "Return"],
    Escape: ["Escape", "Esc"],
    Insert: ["Insert", "Ins"],
    PageDown: ["Page Down", "PgDown"],
    PageUp: ["Page Up", "PgUp"],
    Tab: ["Tab"],
};
var arrowKeyTemplates = {
    arrows: ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"],
    wasd: ["W", "A", "S", "D"],
    zqsd: ["Z", "Q", "S", "D"],
};
var Keyboard = (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard() {
        var _this = _super.call(this) || this;
        _this.pressed = new Set();
        _this.globals.on("key:down", function (key) {
            var added = false;
            for (var x in keyMap) {
                if (keyMap[x].includes(key)) {
                    _this.pressed.add(x.toLowerCase());
                    added = true;
                    break;
                }
            }
            if (!added)
                _this.pressed.add(key.toLowerCase());
        });
        _this.globals.on("key:up", function (key) {
            for (var x in keyMap) {
                if (keyMap[x].includes(key)) {
                    _this.pressed.delete(x.toLowerCase());
                    break;
                }
            }
            _this.pressed.delete(key.toLowerCase());
        });
        return _this;
    }
    Keyboard.prototype.query = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return (keys.reduce(function (has, key) { return has && _this.pressed.has(key.toLowerCase()); }, true) && keys.length > 0);
    };
    Keyboard.prototype.vectorQuery = function (template) {
        if (typeof template === "string" &&
            template.toLocaleLowerCase() in arrowKeyTemplates) {
            var vector = new Vector2(0, 0);
            if (this.query(arrowKeyTemplates[template][0]))
                vector.y -= 1;
            if (this.query(arrowKeyTemplates[template][1]))
                vector.x -= 1;
            if (this.query(arrowKeyTemplates[template][2]))
                vector.y += 1;
            if (this.query(arrowKeyTemplates[template][3]))
                vector.x += 1;
            return vector;
        }
        else if (template instanceof Array) {
            var vector = new Vector2(0, 0);
            if (this.query(template[0]))
                vector.y -= 1;
            if (this.query(template[1]))
                vector.x -= 1;
            if (this.query(template[2]))
                vector.y += 1;
            if (this.query(template[3]))
                vector.x += 1;
            return vector;
        }
        return new Vector2(0, 0);
    };
    return Keyboard;
}(EventEmitter));

var Gamepad = (function (_super) {
    __extends(Gamepad, _super);
    function Gamepad() {
        var _this = _super.call(this) || this;
        _this.gamepads = [];
        _this.globals.on("gamepad:add", function (e) {
            var gamepad = new GamepadInteractor();
            gamepad.emit("add", e);
            _this.gamepads = __spreadArrays(_this.gamepads, [gamepad]);
        });
        _this.globals.on("gamepad:remove", function (e) {
            _this.gamepads = _this.gamepads.filter(function (g) {
                if (g.gamepad.id === e.gamepad.id) {
                    g.emit("remove", e);
                    return false;
                }
                return true;
            });
        });
        _this.pressed = new Set();
        _this.withGamepad(0);
        return _this;
    }
    Object.defineProperty(Gamepad.prototype, "currentGamepad", {
        get: function () {
            return this.gamepads[this.gamepadIndex];
        },
        enumerable: false,
        configurable: true
    });
    Gamepad.prototype.withGamepad = function (i) {
        this.gamepadIndex = i;
    };
    Gamepad.prototype.query = function () {
        var _this = this;
        var buttons = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            buttons[_i] = arguments[_i];
        }
        return (buttons.reduce(function (has, button) {
            if (_this.gamepads.length <= _this.gamepadIndex)
                return false;
            return has && _this.currentGamepad.button(button).query();
        }, true) && buttons.length > 0);
    };
    Gamepad.prototype.vectorQuery = function (stick) {
        if (typeof stick === "string" && this.gamepads.length > this.gamepadIndex) {
            var vector = this.currentGamepad.stick(stick).query();
            return new Vector2(Math.round(vector.x * 10000) / 10000, Math.round(vector.y * 10000) / 10000);
        }
        return new Vector2(0, 0);
    };
    Gamepad.prototype.vibrate = function (duration, _a) {
        var _b = _a === void 0 ? {} : _a, weakMagnitude = _b.weakMagnitude, strongMagnitude = _b.strongMagnitude;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.currentGamepad.vibrate(duration, {
                            weakMagnitude: weakMagnitude,
                            strongMagnitude: strongMagnitude,
                        })];
                    case 1:
                        _c.sent();
                        return [2];
                }
            });
        });
    };
    return Gamepad;
}(EventEmitter));

var Store = (function (_super) {
    __extends(Store, _super);
    function Store(objectStore) {
        var _this = _super.call(this) || this;
        _this.objectStore = objectStore;
        return _this;
    }
    Store.prototype.size = function () {
        return this.objectStore.length();
    };
    Store.prototype.set = function (key, value) {
        if (!isDefined(value))
            this.delete(key);
        else
            this.objectStore.setItem(key, value);
        return this;
    };
    Store.prototype.get = function (key) {
        return this.objectStore.getItem(key);
    };
    Store.prototype.has = function (key) {
        return __awaiter(this, void 0, Promise, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.objectStore.getItem(key)];
                    case 1:
                        value = _a.sent();
                        return [2, isDefined(value)];
                }
            });
        });
    };
    Store.prototype.delete = function (key) {
        return this.objectStore.removeItem(key);
    };
    Store.prototype.toObject = function () {
        return __awaiter(this, void 0, Promise, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = {};
                        return [4, this.objectStore.iterate(function (value, key) {
                                obj[key] = value;
                            })];
                    case 1:
                        _a.sent();
                        return [2, obj];
                }
            });
        });
    };
    return Store;
}(EventEmitter));

var WatchEvent = (function () {
    function WatchEvent() {
    }
    WatchEvent.prototype.stop = function () {
        this.stopped = true;
    };
    return WatchEvent;
}());
var Watch = (function (_super) {
    __extends(Watch, _super);
    function Watch(target, handler) {
        var _this = _super.call(this) || this;
        var proxyHandler = {
            get: function (t, prop) {
                var result = t[prop];
                if (typeof result === "function")
                    return new Proxy(result, proxyHandler);
                return result;
            },
            set: function (t, prop, value) {
                var e = new WatchEvent();
                if (handler === null || handler === void 0 ? void 0 : handler.setter)
                    handler.setter(e, target, prop, value);
                if (!e.stopped)
                    t[prop] = value;
                return true;
            },
            apply: function (t, self, args) {
                var e = new WatchEvent();
                if (handler === null || handler === void 0 ? void 0 : handler.call)
                    handler.call(e, target, t.name, self, args);
                if (!e.stopped)
                    t.apply(self, args);
            },
        };
        return new Proxy(target, proxyHandler);
    }
    return Watch;
}(EventEmitter));

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AudioLoader: AudioLoader,
    Scene: Scene,
    Entity: Entity,
    World: World,
    BoundingBox: BoundingBox,
    Mouse: Mouse,
    Keyboard: Keyboard,
    Gamepad: Gamepad,
    Timer: Timer,
    Store: Store,
    Storage: Storage,
    Vector2: Vector2,
    Watch: Watch,
    ObjectEntities: index
});

var EntityManager = (function (_super) {
    __extends(EntityManager, _super);
    function EntityManager(scene) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.list = [];
        return _this;
    }
    Object.defineProperty(EntityManager.prototype, "medias", {
        get: function () {
            return EntityManager;
        },
        enumerable: false,
        configurable: true
    });
    EntityManager.addMedia = function (name, media) {
        if (media instanceof HTMLImageElement)
            this.images.set(name, media);
        else if (media instanceof AudioLoader)
            this.audios.set(name, media);
        else if (media instanceof Text)
            this.texts.set(name, media);
        return this;
    };
    EntityManager.prototype.add = function () {
        var _this = this;
        var entities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entities[_i] = arguments[_i];
        }
        this.list = __spreadArrays(this.list, entities.map(function (entity) {
            if (!(entity instanceof Function))
                return entity.setManager(_this);
            return new entity(_this.scene, 0, 0).setManager(_this);
        })).sort(function (a, b) { return a.zindex - b.zindex; });
        return this;
    };
    EntityManager.prototype.remove = function () {
        var entities = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entities[_i] = arguments[_i];
        }
        this.list = this.list.filter(function (e) { return !entities.includes(e); });
        return this;
    };
    EntityManager.prototype.setEntities = function () {
        var _this = this;
        var list = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            list[_i] = arguments[_i];
        }
        this.list = list
            .map(function (entity) {
            if (entity instanceof Entity)
                return entity.setManager(_this);
            return new entity(_this.scene, 0, 0).setManager(_this);
        })
            .sort(function (a, b) { return b.zindex - a.zindex; });
        return this;
    };
    EntityManager.prototype.getEntity = function (name) {
        var entity = this.list.find(function (entity) { return entity.name === name; });
        if (entity)
            return entity;
        this.globals.emit("w" + Warning.Entity, "this entity " + name + " is not create");
        return new Entity(this.scene.game.currentScene, 0, 0);
    };
    EntityManager.prototype.getAll = function () {
        return this.list;
    };
    EntityManager.images = new Map();
    EntityManager.audios = new Map();
    EntityManager.texts = new Map();
    return EntityManager;
}(Manager));

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var localforage = createCommonjsModule(function (module, exports) {
/*!
    localForage -- Offline Storage, Improved
    Version 1.9.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
},{}],2:[function(_dereq_,module,exports){
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
},{"2":2}],4:[function(_dereq_,module,exports){

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb || !idb.open) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support
        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
        // Safari 10.1 shipped with fetch, we can use that to detect it.
        // Note: this creates issues with `window.fetch` polyfills and
        // overrides; see:
        // https://github.com/localForage/localForage/issues/856
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            resolve(openreq.result);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback returns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = req.onblocked = function (err) {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(err);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});
});

var TempSaveManager = (function (_super) {
    __extends(TempSaveManager, _super);
    function TempSaveManager(databaseName) {
        var _this = _super.call(this) || this;
        _this.databaseName = databaseName;
        _this.stores = new Map();
        return _this;
    }
    TempSaveManager.prototype.open = function (storeName) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, store;
            return __generator(this, function (_a) {
                if (this.stores.has(storeName))
                    return [2, this.stores.get(storeName)];
                instance = localforage.createInstance({
                    driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
                    name: this.databaseName,
                    storeName: storeName,
                });
                store = new Store(instance);
                this.stores.set(storeName, store);
                return [2, store];
            });
        });
    };
    return TempSaveManager;
}(Manager));
var SaveManager = (function (_super) {
    __extends(SaveManager, _super);
    function SaveManager() {
        var _this = _super.call(this, "light-engine:save-db") || this;
        _this.temp = new TempSaveManager("light-engine:temp-save-db");
        return _this;
    }
    return SaveManager;
}(TempSaveManager));

var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager(game, list) {
        var _this = _super.call(this) || this;
        _this.list = [];
        _this.game = game;
        _this.list = list.map(function (scene) {
            if (scene instanceof Scene)
                return scene.setGame(_this.game).setManager(_this);
            return new scene({ name: scene.name }).setGame(_this.game).setManager(_this);
        });
        return _this;
    }
    SceneManager.create = function (list) {
        return function (game) {
            return new SceneManager(game, list);
        };
    };
    SceneManager.prototype.add = function (scene) {
        if (scene instanceof Scene)
            this.list = __spreadArrays([scene.setGame(this.game).setManager(this)], this.list);
        else
            this.list = __spreadArrays([
                new scene({ name: scene.name }).setGame(this.game).setManager(this)
            ], this.list);
        return this;
    };
    SceneManager.prototype.getFirst = function () {
        return this.getScene(0);
    };
    SceneManager.prototype.getLast = function () {
        return this.getScene(this.list.length - 1);
    };
    SceneManager.prototype.play = function (name) {
        return this.game.playScene(this.getScene(name));
    };
    SceneManager.prototype.playWithOpacity = function (name, opacity) {
        var scene = typeof name === "object" ? name : this.getScene(name);
        scene.played = true;
        scene.isPlayed = "opacity";
        scene.alpha = stringToPixelNum(opacity, 1);
        if (!this.game.playedWithOpacity.includes(scene))
            this.game.playedWithOpacity = __spreadArrays(this.game.playedWithOpacity, [scene]);
        return scene;
    };
    SceneManager.prototype.getScene = function (name) {
        if (typeof name === "string") {
            var scene = this.list.find(function (scene) { return scene.name === name; });
            if (scene)
                return scene;
            this.globals.emit("w" + Warning.Scene, "this scene " + name + " is not create");
        }
        else if (typeof name === "number") {
            var scene = this.list[name];
            if (scene)
                return scene;
            this.globals.emit("w" + Warning.Scene, "the " + name + numberSuffix(name) + " scene has not been created");
        }
        else if (typeof name === "object")
            return name;
        return this.list[0];
    };
    SceneManager.prototype.getScenes = function (filter) {
        if (filter === void 0) { filter = function (scene) { return true; }; }
        return this.list.filter(filter);
    };
    return SceneManager;
}(Manager));

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AudioManager: AudioManager,
    ContainerManager: ContainerManager,
    EntityManager: EntityManager,
    Manager: Manager,
    SaveManager: SaveManager,
    SceneManager: SceneManager
});

var FpsCtrl = (function () {
    function FpsCtrl(fps, callback) {
        this.isPlaying = false;
        this.frame = -1;
        this.loop = this.loop.bind(this);
        this.callback = callback;
        this.delay = 1000 / fps;
    }
    FpsCtrl.prototype.loop = function (timestamp) {
        if (!isDefined(this.time))
            this.time = timestamp;
        var seg = Math.floor((timestamp - this.time) / this.delay);
        if (seg > this.frame) {
            this.frame = seg;
            this.callback({
                time: timestamp,
                frame: this.frame,
            });
        }
        this.tref = requestAnimationFrame(this.loop);
    };
    FpsCtrl.prototype.frameRate = function (newfps) {
        var fps = 1000 * this.delay;
        if (!arguments.length)
            return fps;
        this.delay = 1000 / newfps;
        this.frame = -1;
        this.time = null;
    };
    FpsCtrl.prototype.start = function () {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.tref = requestAnimationFrame(this.loop);
        }
    };
    FpsCtrl.prototype.pause = function () {
        if (this.isPlaying) {
            cancelAnimationFrame(this.tref);
            this.isPlaying = false;
            this.time = null;
            this.frame = -1;
        }
    };
    return FpsCtrl;
}());

var Game = (function (_super) {
    __extends(Game, _super);
    function Game(config, w, h, doc, win) {
        if (w === void 0) { w = 800; }
        if (h === void 0) { h = 600; }
        if (doc === void 0) { doc = document; }
        if (win === void 0) { win = window; }
        var _a;
        var _this = _super.call(this) || this;
        _this.doc = doc;
        _this.win = win;
        _this.secondsPassed = 0;
        _this.oldTimeStamp = 0;
        _this.inited = [];
        Manager.createType("Entity");
        customStorage.set("development", (_a = config.dev) !== null && _a !== void 0 ? _a : false);
        _this.audioContext = new AudioContext();
        _this.playedWithOpacity = [];
        _this.state = new Storage();
        _this.debug = config.debug;
        _this.pixel = config.pixel;
        _this.update = _this.update.bind(_this);
        _this.initScene = _this.initScene.bind(_this);
        _this.canvas =
            typeof config.canvas === "object" &&
                config.canvas instanceof HTMLCanvasElement
                ? config.canvas
                : _this.doc.body.appendChild(_this.doc.createElement("canvas"));
        var p = _this.canvas.parentNode;
        _this.w = stringToPixelNum(w, p.clientWidth);
        _this.h = stringToPixelNum(h, p.clientHeight);
        _this.canvas.width = _this.w;
        _this.canvas.height = _this.h;
        var prev = { w: _this.w, h: _this.h };
        if (typeof w === "string" &&
            w.trim().endsWith("%") &&
            typeof h === "string" &&
            h.trim().endsWith("%"))
            _this.globals.on("window:resize", function () {
                if (typeof w === "string" &&
                    w.trim().endsWith("%") &&
                    prev.w !== p.clientWidth) {
                    _this.w = stringToPixelNum(w, p.clientWidth);
                    _this.canvas.width = _this.w;
                }
                if (typeof h === "string" &&
                    h.trim().endsWith("%") &&
                    prev.h !== p.clientHeight) {
                    _this.h = stringToPixelNum(h, p.clientHeight);
                    _this.canvas.height = _this.h;
                }
            });
        if (config.pixel)
            _this.canvas.style.imageRendering = isChromium()
                ? "pixelated"
                : "crisp-edges";
        _this.context = _this.canvas.getContext("2d");
        _this.sceneManager = config.scene(_this);
        var toLoad = Object.keys(config.load || {});
        var currentScene = null;
        if (typeOf(config.loadScene) !== "undefined") {
            var toForcedLoading_1 = config.loadScene.forcedLoadingOfEntities || [];
            toLoad = toLoad.filter(function (v) { return !toForcedLoading_1.includes(v); });
            toForcedLoading_1.forEach(function (name) {
                config.load[name]
                    .then(function (media) { return EntityManager.addMedia(name, media); })
                    .catch(function (reason) { return _this.globals.emit("e" + Errors.Load, reason); });
            });
            currentScene = _this.sceneManager.add(config.loadScene).play(0);
            _this.initScene(currentScene);
            currentScene.on("progress", function (progress) {
                if (progress === 1)
                    currentScene.emit("progress:ended");
            });
        }
        var _loop_1 = function (i) {
            var name = toLoad[i];
            config.load[name]
                .then(function (media) {
                EntityManager.addMedia(name, media);
                if (currentScene)
                    currentScene.emit("progress", (i + 1) / toLoad.length);
            })
                .catch(function (reason) { return _this.globals.emit("e" + Errors.Load, reason); });
        };
        for (var i = 0; i < toLoad.length; i++) {
            _loop_1(i);
        }
        if (!currentScene)
            _this.sceneManager.play(0);
        _this.loop = new FpsCtrl(240, _this.update);
        _this.mouse = new Mouse(_this);
        _this.keyboard = new Keyboard();
        _this.gamepad = new Gamepad();
        _this.save = new SaveManager();
        _this.eventsAndErrors();
        return _this;
    }
    Game.prototype.changeScene = function (name) {
        var scene = this.sceneManager.getScene(name);
        if (!isDefined(this.currentScene) ||
            this.currentScene.changeAllow(scene, StateEnum.Next) ||
            (isDefined(scene) && scene.changeAllow(this.currentScene, StateEnum.Prev))) {
            scene.emit("called", this.currentScene);
            if (this.currentScene) {
                this.currentScene.played = false;
                this.currentScene.isPlayed = "none";
            }
            scene.played = true;
            scene.isPlayed = "main";
            this.currentScene = scene;
            this.playedWithOpacity = [];
        }
        return this.currentScene;
    };
    Game.prototype.playScene = function (scene) {
        return this.changeScene(scene);
    };
    Game.prototype.getStateSave = function (getter) {
        var dGetter = Object.assign({}, {
            entityProperties: [],
            over: {},
            exclude: {},
        }, getter);
        dGetter.exclude = Object.assign({}, {
            scenes: [],
            entities: [],
        }, getter === null || getter === void 0 ? void 0 : getter.exclude);
        return JSON.stringify({
            kle_id: navigator.platform + ":" + navigator.productSub,
            over: dGetter.over,
            scenes: {
                played: this.currentScene.toJSON(dGetter),
                opacity: this.playedWithOpacity
                    .filter(function (scene) { return !dGetter.exclude.scenes.includes(scene.name); })
                    .map(function (scene) { return scene.toJSON(dGetter); }),
                not_played: this.sceneManager
                    .getScenes(function (scene) {
                    return !scene.played && !dGetter.exclude.scenes.includes(scene.name);
                })
                    .map(function (scene) { return scene.toJSON(dGetter); }),
            },
        });
    };
    Game.prototype.setStateSave = function (setter, kleValide) {
        var _this = this;
        if (kleValide === void 0) { kleValide = false; }
        var setter_obj = JSON.parse(setter);
        if (kleValide &&
            setter_obj.kle_id === navigator.platform + ":" + navigator.productSub)
            this.globals.emit("e" + Errors.ClientKey, "the kle_id doesn't match with the client instance");
        var current = this.sceneManager
            .getScenes()
            .find(function (scene) { return scene.name === setter_obj.scenes.played.name; });
        if (current) {
            this.playScene(current);
            current.fromSave(setter_obj.scenes.played);
            this.sceneManager
                .getScenes(function (s) { return s !== current; })
                .forEach(function (scene) {
                var findedO = setter_obj.scenes.opacity.find(function (s) { return s.name === scene.name; });
                if (findedO) {
                    _this.sceneManager.playWithOpacity(scene, findedO.alpha);
                    scene.fromSave(findedO);
                    return null;
                }
                var findedN = setter_obj.scenes.not_played.find(function (s) { return s.name === scene.name; });
                if (findedN)
                    scene.fromSave(findedN);
            });
        }
    };
    Game.prototype.initScene = function (scene) {
        if (!this.inited.includes(scene.init)) {
            this.inited = __spreadArrays(this.inited, [scene.init]);
            customStorage.set("currentObject", scene);
            scene.hookIndex = 0;
            scene.init();
            for (var _i = 0, _a = scene.entities.getAll(); _i < _a.length; _i++) {
                var entity = _a[_i];
                customStorage.set("currentObject", entity);
                entity.hookIndex = 0;
                entity.init();
            }
            for (var _b = 0, _c = scene.managers.getAllType("Entity"); _b < _c.length; _b++) {
                var manager = _c[_b];
                customStorage.set("currentObject", manager);
                manager.hookIndex = 0;
                manager.init(scene);
            }
        }
        if (scene.isPlayed === "main") {
            for (var _d = 0, _e = this.playedWithOpacity; _d < _e.length; _d++) {
                var scene_1 = _e[_d];
                this.initScene(scene_1);
            }
        }
    };
    Game.prototype.update = function (o) {
        this.initScene(this.currentScene);
        var entities = this.currentScene.entities.getAll();
        this.setFPS(o.time);
        this.mouse.update();
        this.globals.emit("updated");
        this.globals.emit("window:resize");
        customStorage.set("currentObject", this.currentScene);
        this.currentScene.hookIndex = 0;
        this.currentScene.beforeUpdate();
        for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
            var entity = entities_1[_i];
            if (entity.collide(this.mouse))
                entity.emit("mouse:hover");
            if (entity.collide(this.mouse) && this.mouse.click)
                entity.emit("mouse:click");
            customStorage.set("currentObject", entity);
            entity.hookIndex = 0;
            entity.beforeRedraw();
            entity.redraw(this.secondsPassed);
            entity.emit("move:velocity", entity);
        }
        for (var _a = 0, _b = this.playedWithOpacity; _a < _b.length; _a++) {
            var scene = _b[_a];
            var entities_5 = scene.entities.getAll();
            customStorage.set("currentObject", scene);
            scene.hookIndex = 0;
            scene.beforeUpdate();
            for (var _c = 0, entities_2 = entities_5; _c < entities_2.length; _c++) {
                var entity = entities_2[_c];
                if (entity.collide(this.mouse))
                    entity.emit("mouse:hover");
                if (entity.collide(this.mouse) && this.mouse.click)
                    entity.emit("mouse:click");
                customStorage.set("currentObject", entity);
                entity.hookIndex = 0;
                entity.beforeRedraw();
                entity.redraw(this.secondsPassed);
                entity.emit("move:velocity", entity);
            }
        }
        for (var _d = 0, _e = this.currentScene.managers.getAllType("Entity"); _d < _e.length; _d++) {
            var manager = _e[_d];
            customStorage.set("currentObject", manager);
            manager.hookIndex = 0;
            manager.update();
        }
        this.context.clearRect(0, 0, this.w, this.h);
        this.context.save();
        this.context.globalAlpha = 1;
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.w, this.h);
        this.context.restore();
        if (this.pixel) {
            this.context.imageSmoothingEnabled = false;
            this.context.imageSmoothingQuality = "high";
        }
        for (var _f = 0, entities_3 = entities; _f < entities_3.length; _f++) {
            var entity = entities_3[_f];
            customStorage.set("currentObject", entity);
            if (!entity.hidden)
                entity.draw(this.context);
            entity.afterRedraw();
        }
        for (var _g = 0, _h = this.playedWithOpacity; _g < _h.length; _g++) {
            var scene = _h[_g];
            var entities_6 = scene.entities.getAll();
            for (var _j = 0, entities_4 = entities_6; _j < entities_4.length; _j++) {
                var entity = entities_4[_j];
                customStorage.set("currentObject", entity);
                if (!entity.hidden)
                    entity.draw(this.context);
                entity.afterRedraw();
            }
            customStorage.set("currentObject", scene);
            scene.update(this.secondsPassed);
            scene.afterUpdate();
        }
        this.context.globalAlpha = 1;
        this.mouse.draw(this.context);
        customStorage.set("currentObject", this.currentScene);
        this.currentScene.update(this.secondsPassed);
        this.currentScene.afterUpdate();
    };
    Game.prototype.setFPS = function (timestamp) {
        this.secondsPassed = (timestamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timestamp;
        this.fps = Math.round(1 / this.secondsPassed);
    };
    Game.prototype.eventsAndErrors = function () {
        var _this = this;
        var gee = new GlobalEventEmitter();
        this.doc.addEventListener("visibilitychange", function () {
            return gee.emit("page:visibilitychange");
        });
        this.win.addEventListener("load", function () {
            _this.loop.start();
        });
        this.win.addEventListener("keydown", function (e) {
            gee.emit("key:down", e.key);
        });
        this.win.addEventListener("keyup", function (e) {
            gee.emit("key:up", e.key);
        });
        this.win.addEventListener("gamepadconnected", function (e) {
            gee.emit("gamepad:add", e);
        });
        this.win.addEventListener("gamepaddisconnected", function (e) {
            gee.emit("gamepad:remove", e);
        });
        var _loop_2 = function (id) {
            if (/\d/.test(id))
                gee.on("e" + id, function (reason) {
                    return console.error("[" + Errors[id] + "]: " + reason);
                });
        };
        for (var id in Errors) {
            _loop_2(id);
        }
        var _loop_3 = function (id) {
            if (/\d/.test(id))
                gee.on("w" + id, function (reason) {
                    return console.warn("[" + Warning[id] + "]: " + reason);
                });
        };
        for (var id in Warning) {
            _loop_3(id);
        }
    };
    return Game;
}(EventEmitter));

function Image$1(link) {
    return new Promise(function (wait, fail) {
        var img = document.createElement("img");
        img.src = link;
        img.onload = function () { return wait(img); };
        img.onerror = fail;
    });
}
function Audio(link) {
    return new Promise(function (wait, fail) {
        var audio = new AudioLoader(link);
        audio.on("loadeddata", function () { return wait(audio); });
        audio.on("error", fail);
    });
}
function Text$2(content) {
    return new Promise(function (wait, fail) {
        var text = document.createTextNode(content);
        wait(text);
    });
}
function DOM(element) {
    return new Promise(function (wait, fail) {
        if ((element instanceof HTMLImageElement && !element.complete) ||
            (element instanceof HTMLMediaElement && element.readyState < 2)) {
            element.onloadeddata = function () { return wait(element); };
            element.onerror = fail;
        }
        else
            wait(element);
    });
}

var loaders = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Image: Image$1,
    Audio: Audio,
    Text: Text$2,
    DOM: DOM
});

function useState(initial) {
    var current = customStorage.get("currentObject");
    var oldHook = current.hooks && current.hooks[current.hookIndex];
    var hook = {
        state: oldHook ? oldHook.state : initial,
    };
    current.hooks[current.hookIndex] = hook;
    var setState = function (state) {
        if (typeof state === "function") {
            hook.state = state(hook.state);
        }
        else {
            hook.state = state;
        }
    };
    current.hookIndex++;
    return [hook.state, setState];
}

function useMemo(fn, dependencies) {
    var current = customStorage.get("currentObject");
    var oldHook = current.hooks && current.hooks[current.hookIndex];
    var hook = {
        memo: oldHook ? oldHook.memo : fn(),
        hooks: oldHook ? oldHook.hooks : [],
        hookIndex: oldHook ? oldHook.hookIndex : 0,
        dependencies: oldHook ? oldHook.dependencies : dependencies,
    };
    current.hooks[current.hookIndex] = hook;
    if (arrayDiff(hook.dependencies, dependencies)) {
        customStorage.set("currentObject", hook);
        hook.hookIndex = 0;
        hook.memo = fn();
        hook.dependencies = dependencies;
        customStorage.set("currentObject", current);
    }
    current.hookIndex++;
    return hook.memo;
}

function useCallback(fn, dependencies) {
    return useMemo(function () { return fn; }, dependencies);
}

function useEffect(fn, dependencies) {
    var current = customStorage.get("currentObject");
    var oldHook = current.hooks && current.hooks[current.hookIndex];
    var hook = {
        cleanerFn: oldHook ? oldHook.cleanerFn : fn(),
        hooks: oldHook ? oldHook.hooks : [],
        hookIndex: oldHook ? oldHook.hookIndex : 0,
        dependencies: oldHook ? oldHook.dependencies : dependencies,
    };
    current.hooks[current.hookIndex] = hook;
    if (arrayDiff(hook.dependencies, dependencies)) {
        customStorage.set("currentObject", hook);
        hook.hookIndex = 0;
        if (isDefined(hook.cleanerFn))
            hook.cleanerFn();
        hook.cleanerFn = fn();
        hook.dependencies = dependencies;
        customStorage.set("currentObject", current);
    }
    current.hookIndex++;
}

function useTimer(fn, time, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    var current = customStorage.get("currentObject");
    if (current instanceof Manager)
        return console.error("[useTimer]: is not allowed in a Manger");
    var scene = current instanceof Entity ? current.scene : current;
    var oldHook = current.hooks && current.hooks[current.hookIndex];
    var hook = {
        hooks: oldHook ? oldHook.hooks : [],
        hookIndex: 0,
    };
    current.hooks[current.hookIndex] = hook;
    current.hookIndex++;
    var timer = useMemo(function () {
        var timer = scene.create.timer(function () {
            customStorage.set("currentObject", hook);
            hook.hookIndex = 0;
            fn();
            customStorage.set("currentObject", current);
        }, { time: time });
        timer.play();
        return timer;
    }, dependencies);
    return timer;
}

function useTick(fn, tick, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    var current = customStorage.get("currentObject");
    if (current instanceof Manager)
        return console.error("[useTick]: is not allowed in a Manger");
    var scene = current instanceof Entity ? current.scene : current;
    var oldHook = current.hooks && current.hooks[current.hookIndex];
    var hook = {
        hooks: oldHook ? oldHook.hooks : [],
        hookIndex: 0,
    };
    current.hooks[current.hookIndex] = hook;
    current.hookIndex++;
    var timer = useMemo(function () {
        var timer = scene.create.timer(function () {
            customStorage.set("currentObject", hook);
            hook.hookIndex = 0;
            fn();
            customStorage.set("currentObject", current);
        }, { tick: tick });
        timer.play();
        return timer;
    }, dependencies);
    return timer;
}

var index$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    useState: useState,
    useMemo: useMemo,
    useCallback: useCallback,
    useEffect: useEffect,
    useTimer: useTimer,
    useTick: useTick
});

exports.EventEmitter = EventEmitter;
exports.Game = Game;
exports.Hooks = index$3;
exports.Loaders = loaders;
exports.Managers = index$2;
exports.Objects = index$1;
