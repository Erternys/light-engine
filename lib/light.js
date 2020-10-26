(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.LightEngine = {}));
}(this, (function (exports) { 'use strict';

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
        GlobalEventEmitter.prototype.has = function (event) {
            return this.events.has(event);
        };
        GlobalEventEmitter.prototype.get = function (event) {
            return this.events.get(event);
        };
        GlobalEventEmitter.prototype.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!this.has(event))
                return false;
            this.events.set(event, this.get(event).map(function (v) {
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
            this.events.set(event, __spreadArrays((this.get(event) || []), [listener]));
            return this;
        };
        GlobalEventEmitter.prototype.once = function (event, listener) {
            this.events.set(event, __spreadArrays((this.get(event) || []), [[listener, false]]));
            return this;
        };
        GlobalEventEmitter.prototype.off = function (event, listener) {
            if (!this.has(event))
                return false;
            var content = this.get(event);
            if (!content)
                return false;
            this.events.set(event, content.filter(function (v) { return v !== listener; }));
            if (content.length === 0)
                return this.events.delete(event);
            return true;
        };
        GlobalEventEmitter.prototype.offAll = function (event) {
            if (this.has(event))
                return this.events.delete(event);
            else
                this.events.clear();
            return true;
        };
        return GlobalEventEmitter;
    }());
    var EventEmitter = (function (_super) {
        __extends(EventEmitter, _super);
        function EventEmitter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
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

    var Vector2 = (function () {
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
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
    var StateEnum;
    (function (StateEnum) {
        StateEnum[StateEnum["Next"] = 0] = "Next";
        StateEnum[StateEnum["Prev"] = 1] = "Prev";
    })(StateEnum || (StateEnum = {}));
    var Warning;
    (function (Warning) {
        Warning[Warning["Scene"] = 0] = "Scene";
        Warning[Warning["Entity"] = 1] = "Entity";
    })(Warning || (Warning = {}));
    var Errors;
    (function (Errors) {
        Errors[Errors["Load"] = 0] = "Load";
        Errors[Errors["Audio"] = 1] = "Audio";
        Errors[Errors["ClientKey"] = 2] = "ClientKey";
    })(Errors || (Errors = {}));

    var customStorage = new Map();
    var CloneAudioManager = (function (_super) {
        __extends(CloneAudioManager, _super);
        function CloneAudioManager(audio, key, isSound) {
            if (isSound === void 0) { isSound = false; }
            var _this = _super.call(this) || this;
            _this.isPlaying = false;
            _this.isPaused = true;
            _this.isDeleted = false;
            _this.state = {};
            _this.ended = function () { return _this.emit("ended"); };
            _this.changePageVisible = _this.changePageVisible.bind(_this);
            _this.key = key;
            _this.audio = audio;
            _this.context = new AudioContext();
            _this.gain = _this.context.createGain();
            _this.gain.connect(_this.context.destination);
            _this.source = _this.context.createBufferSource();
            _this.withoutAudioContext = /^file:\/\/\//.test(location.href) || isSound;
            if (!_this.withoutAudioContext)
                _this.getAudio(_this.audio.src)
                    .then(function (buffer) {
                    _this.state.started = false;
                    _this.source.buffer = buffer;
                    _this.source.loop = _this.loop;
                    _this.source.connect(_this.gain);
                    _this.source.addEventListener("ended", _this.ended);
                })
                    .catch(function (reason) { return _this.globals.emit("e" + Errors.Audio, reason); });
            else
                _this.audio.addEventListener("ended", _this.ended);
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
                if (this.withoutAudioContext)
                    this.audio.loop = value;
                else
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
                if (this.withoutAudioContext)
                    this.audio.volume = value;
                else
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
                if (this.withoutAudioContext)
                    this.audio.playbackRate = value;
                else
                    this.source.playbackRate.value = value;
                this.state.speed = value;
            },
            enumerable: false,
            configurable: true
        });
        CloneAudioManager.prototype.play = function () {
            if (this.isPaused) {
                if (this.withoutAudioContext)
                    this.audio.play();
                else {
                    if (!this.state.started) {
                        this.source.start();
                        this.state.started = true;
                    }
                    else
                        this.context.resume();
                }
                this.emit("played");
                this.isPlaying = true;
                this.isPaused = false;
            }
        };
        CloneAudioManager.prototype.pause = function () {
            if (this.isPlaying) {
                if (this.withoutAudioContext)
                    this.audio.pause();
                else
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
            if (this.withoutAudioContext)
                this.audio.removeEventListener("ended", this.ended);
            else {
                this.source.removeEventListener("ended", this.ended);
                this.source.stop();
            }
            this.gain.disconnect();
            this.source.disconnect();
            this.context.close();
            this.globals.off("page:visibilitychange", this.changePageVisible);
            this.audio = null;
            this.isDeleted = true;
        };
        CloneAudioManager.prototype.getAudio = function (link) {
            return __awaiter(this, void 0, Promise, function () {
                var response, arrayBuffer, audioBuffer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (customStorage.has(link))
                                return [2, customStorage.get(link)];
                            return [4, fetch(link)];
                        case 1:
                            response = _a.sent();
                            return [4, response.arrayBuffer()];
                        case 2:
                            arrayBuffer = _a.sent();
                            return [4, this.context.decodeAudioData(arrayBuffer)];
                        case 3:
                            audioBuffer = _a.sent();
                            customStorage.set(link, audioBuffer);
                            return [2, audioBuffer];
                    }
                });
            });
        };
        CloneAudioManager.prototype.changePageVisible = function () {
            if (document.hidden && this.isPlaying)
                this.withoutAudioContext ? this.audio.pause() : this.context.suspend();
            else if (!document.hidden && this.isPlaying)
                this.withoutAudioContext ? this.audio.play() : this.context.resume();
        };
        return CloneAudioManager;
    }(EventEmitter));
    var AudioManager = (function (_super) {
        __extends(AudioManager, _super);
        function AudioManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.clones = [];
            return _this;
        }
        AudioManager.prototype.createClone = function () {
            var clone = new CloneAudioManager(this.audio.cloneNode(true), this.key);
            this.clones.push(clone);
            return clone;
        };
        AudioManager.prototype.deletion = function () {
            this.destroy();
            this.clones.forEach(function (clone) { return clone.destroy(); });
            this.clones = [];
        };
        return AudioManager;
    }(CloneAudioManager));

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
            _this_1.alpha = 1;
            _this_1.zindex = 0;
            _this_1.fixed = false;
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
                        if (e.x <
                            e.radius * e.getScale().r +
                                e.radius * e.getScale().r * e.originX) {
                            if (e.isMoving)
                                e.isMoving = false;
                            if (e.box.rebound)
                                e.vx = Math.abs(e.vx) * restitution;
                            e.x =
                                e.radius * e.getScale().r +
                                    e.radius * e.getScale().r * e.originX;
                        }
                        else if (e.x >
                            e.box.getWidth() -
                                e.radius * e.getScale().r +
                                e.radius * e.getScale().r * e.originX) {
                            if (e.isMoving)
                                e.isMoving = false;
                            if (e.box.rebound)
                                e.vx = -Math.abs(e.vx) * restitution;
                            e.x =
                                e.box.getWidth() -
                                    e.radius * e.getScale().r +
                                    e.radius * e.getScale().r * e.originX;
                        }
                        if (e.y <
                            e.radius * e.getScale().r +
                                e.radius * e.getScale().r * e.originY) {
                            if (e.isMoving)
                                e.isMoving = false;
                            if (e.box.rebound)
                                e.vy = Math.abs(e.vy) * restitution;
                            e.y =
                                e.radius * e.getScale().r +
                                    e.radius * e.getScale().r * e.originY;
                        }
                        else if (e.y >
                            e.box.getHeight() -
                                e.radius * e.getScale().r +
                                e.radius * e.getScale().r * e.originY) {
                            if (e.isMoving)
                                e.isMoving = false;
                            if (e.box.rebound)
                                e.vy = -Math.abs(e.vy) * restitution;
                            e.y =
                                e.box.getHeight() -
                                    e.radius * e.getScale().r +
                                    e.radius * e.getScale().r * e.originY;
                        }
                    }
                    else if (typeOf(e) === "Rectangle") {
                        if (e.x <
                            (e.width / 2) * e.scalex +
                                (e.width / 2) * e.scalex * e.originX) {
                            if (e.isMoving)
                                e.isMoving = false;
                            if (e.box.rebound)
                                e.vx = Math.abs(e.vx) * restitution;
                            e.x =
                                (e.width / 2) * e.scalex +
                                    (e.width / 2) * e.scalex * e.originX;
                        }
                        else if (e.x >
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
                                    (e.width / 2) * e.scalex * e.originX;
                        }
                        if (e.y <
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
                                        e.originY;
                        }
                        else if (e.y >
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
                                        e.originY;
                        }
                    }
                }
                else if (e.isMoving)
                    e.isMoving = false;
            });
            return _this_1;
        }
        Entity.prototype.init = function () { };
        Entity.prototype.beforeRedraw = function () { };
        Entity.prototype.redraw = function (secondsPassed) { };
        Entity.prototype.afterRedraw = function () { };
        Entity.prototype.draw = function (context) { };
        Entity.prototype.setBox = function (box) {
            this.box = box;
            return this;
        };
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
        Image.prototype.draw = function (context) {
            var image = this.manager.medias.images.get(this.use);
            context.globalAlpha =
                this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1);
            if (!this.fixed)
                context.translate(this.scene.camera.x, this.scene.camera.y);
            context.translate((this.width * this.scalex) / -2, (this.height * this.scaley) / -2);
            context.translate((this.width / 2) * -this.originX * this.scalex, (this.height / 2) * -this.originY * this.scaley);
            if (isDefined(image)) {
                if (!isDefined(this.width) && !isDefined(this.height)) {
                    this.width = image.width;
                    this.height = image.height;
                }
                context.drawImage(image, 0, 0, this.width * this.cropw, this.height * this.croph, this.x - this.scene.camera.x, this.y - this.scene.camera.y, this.width * this.scalex, this.height * this.scaley);
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
                if (!isDefined(this.width) && !isDefined(this.height)) {
                    this.width = this.sprite.width;
                    this.height = this.sprite.height;
                }
                context.drawImage(image, this.sprite.x, this.sprite.y, this.sprite.width * this.cropw, this.sprite.height * this.croph, this.x, this.y, this.width * this.scalex, this.height * this.scaley);
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
            context.translate((this.width * this.scalex) / -2, (this.height * this.scaley) / -2);
            context.translate((this.width / 2) * -this.originX * this.scalex, (this.height / 2) * -this.originY * this.scaley);
            context.textBaseline = "top";
            context.font = this.style.font.size + "px " + this.style.font.family;
            if (this.content !== this.lastContent) {
                this.lastContent = this.content;
                this.height = this.content.split("\n").reduce(function (rest, line, index) {
                    if (index === 0) {
                        _this.width = context.measureText(line.trim()).width;
                        return _this.style.font.size;
                    }
                    if (_this.width < context.measureText(line.trim()).width)
                        _this.width = context.measureText(line.trim()).width;
                    return rest + _this.style.lineSpacing + _this.style.font.size;
                }, 0);
            }
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
                context.strokeText(this.content, this.x + this.style.padding.left + align, this.y + this.style.padding.top);
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

    var memory = new Map();
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(option) {
            var _this = _super.call(this) || this;
            _this.forcedLoadingOfEntities = [];
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
        Scene.prototype.getAudio = function (name, isSound) {
            if (memory.has(name) && !memory.get(name).isDeleted)
                return memory.get(name);
            var audio = this.entities.medias.audios.get(name);
            if (audio) {
                var manager = new AudioManager(audio, name, isSound);
                memory.set(name, manager);
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
            game.canvas.addEventListener("mousemove", function (e) {
                _this.x = e.offsetX;
                _this.y = e.offsetY;
                _this.globals.emit("mouse:move", e);
            });
            game.canvas.addEventListener("mousedown", function (e) {
                _this.click = true;
                _this.currentClickPos.set(clickPos[e.which], e);
                _this.globals.emit("mouse:down-" + clickPos[e.which], e);
            });
            game.canvas.addEventListener("mouseup", function (e) {
                _this.click = false;
                _this.currentClickPos.delete(clickPos[e.which]);
                _this.globals.emit("mouse:up-" + clickPos[e.which], e);
                _this.globals.emit("mouse:up-" + clickPos[e.which], e);
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
                    vector.y - 1;
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

    var index$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Scene: Scene,
        Entity: Entity,
        World: World,
        BoundingBox: BoundingBox,
        Mouse: Mouse,
        Keyboard: Keyboard,
        Gamepad: Gamepad,
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
            else if (media instanceof HTMLAudioElement)
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
    }(EventEmitter));

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
            return this.list[0];
        };
        SceneManager.prototype.getScenes = function (filter) {
            if (filter === void 0) { filter = function (scene) { return true; }; }
            return this.list.filter(filter);
        };
        return SceneManager;
    }(EventEmitter));

    var index$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AudioManager: AudioManager,
        EntityManager: EntityManager,
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
            var _this = _super.call(this) || this;
            _this.w = w;
            _this.h = h;
            _this.doc = doc;
            _this.win = win;
            _this.secondsPassed = 0;
            _this.oldTimeStamp = 0;
            _this.inited = [];
            _this.playedWithOpacity = [];
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
            _this.canvas.width = stringToPixelNum(w, p.clientWidth);
            _this.canvas.height = stringToPixelNum(h, p.clientHeight);
            var prev = { w: _this.canvas.width, h: _this.canvas.height };
            if (typeof w === "string" &&
                w.trim().endsWith("%") &&
                typeof h === "string" &&
                h.trim().endsWith("%"))
                _this.globals.on("window:resize", function () {
                    if (typeof w === "string" &&
                        w.trim().endsWith("%") &&
                        prev.w !== p.clientWidth)
                        _this.canvas.width = stringToPixelNum(w, p.clientWidth);
                    if (typeof h === "string" &&
                        h.trim().endsWith("%") &&
                        prev.h !== p.clientHeight)
                        _this.canvas.height = stringToPixelNum(h, p.clientHeight);
                });
            if (config.pixel)
                _this.canvas.style.imageRendering = isChromium()
                    ? "pixelated"
                    : "crisp-edges";
            _this.context = _this.canvas.getContext("2d");
            _this.sceneManager = config.scene(_this);
            var toLoad = Object.keys(config.load || {});
            if (typeOf(config.loadScene) !== "undefined") {
                var toForcedLoading_1 = config.loadScene.forcedLoadingOfEntities || [];
                toLoad = toLoad.filter(function (v) { return !toForcedLoading_1.includes(v); });
                toForcedLoading_1.forEach(function (name) {
                    config.load[name]
                        .then(function (media) { return EntityManager.addMedia(name, media); })
                        .catch(function (reason) { return _this.globals.emit("e" + Errors.Load, reason); });
                });
                _this.sceneManager.add(config.loadScene);
                _this.playScene(_this.sceneManager.getFirst());
            }
            Promise.allSettled(toLoad.map(function (name, i) {
                return new Promise(function (res, rej) {
                    return config.load[name]
                        .then(function (media) {
                        EntityManager.addMedia(name, media);
                        res((i + 1) / toLoad.length);
                    })
                        .catch(function (reason) { return rej(reason); });
                });
            }))
                .then(function (a) {
                a.forEach(function (result) {
                    if (result.status === "fulfilled" && _this.currentScene)
                        _this.currentScene.emit("progress", result.value);
                    else if (result.status === "rejected")
                        _this.globals.emit("e" + Errors.Load, result.reason.message);
                });
            })
                .finally(function () {
                if (_this.currentScene)
                    _this.currentScene.emit("progress:ended");
            });
            if (!_this.currentScene)
                _this.sceneManager.play(0);
            _this.loop = new FpsCtrl(240, _this.update);
            _this.loop.start();
            _this.mouse = new Mouse(_this);
            _this.keyboard = new Keyboard();
            _this.gamepad = new Gamepad();
            _this.eventsAndErrors();
            return _this;
        }
        Game.prototype.playScene = function (scene) {
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
        Game.prototype.initScene = function (entities, scene) {
            if (!this.inited.includes(scene.init)) {
                this.inited = __spreadArrays(this.inited, [scene.init]);
                scene.init();
                for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
                    var entity = entities_1[_i];
                    entity.init();
                }
            }
            if (scene.isPlayed === "main") {
                for (var _a = 0, _b = this.playedWithOpacity; _a < _b.length; _a++) {
                    var scene_1 = _b[_a];
                    this.initScene(scene_1.entities.getAll(), scene_1);
                }
            }
        };
        Game.prototype.update = function (o) {
            var entities = this.currentScene.entities.getAll();
            this.initScene(entities, this.currentScene);
            this.setFPS(o.time);
            this.mouse.update();
            this.emit("updated");
            this.globals.emit("window:resize");
            this.currentScene.beforeUpdate();
            for (var _i = 0, entities_2 = entities; _i < entities_2.length; _i++) {
                var entity = entities_2[_i];
                if (entity.has("mouse:hover") && entity.collide(this.mouse))
                    entity.emit("mouse:hover");
                if (entity.has("mouse:click") &&
                    entity.collide(this.mouse) &&
                    this.mouse.click)
                    entity.emit("mouse:click");
                entity.beforeRedraw();
                entity.redraw(this.secondsPassed);
                entity.emit("move:velocity", entity);
            }
            for (var _a = 0, _b = this.playedWithOpacity; _a < _b.length; _a++) {
                var scene = _b[_a];
                var entities_6 = scene.entities.getAll();
                scene.beforeUpdate();
                for (var _c = 0, entities_3 = entities_6; _c < entities_3.length; _c++) {
                    var entity = entities_3[_c];
                    if (entity.has("mouse:hover") && entity.collide(this.mouse))
                        entity.emit("mouse:hover");
                    if (entity.has("mouse:click") &&
                        entity.collide(this.mouse) &&
                        this.mouse.click)
                        entity.emit("mouse:click");
                    entity.beforeRedraw();
                    entity.redraw(this.secondsPassed);
                    entity.emit("move:velocity", entity);
                }
            }
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.save();
            this.context.globalAlpha = 1;
            this.context.fillStyle = "#000";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.restore();
            for (var _d = 0, entities_4 = entities; _d < entities_4.length; _d++) {
                var entity = entities_4[_d];
                if (!entity.hidden)
                    entity.draw(this.context);
                entity.afterRedraw();
            }
            for (var _e = 0, _f = this.playedWithOpacity; _e < _f.length; _e++) {
                var scene = _f[_e];
                var entities_7 = scene.entities.getAll();
                for (var _g = 0, entities_5 = entities_7; _g < entities_5.length; _g++) {
                    var entity = entities_5[_g];
                    if (!entity.hidden)
                        entity.draw(this.context);
                    entity.afterRedraw();
                }
                scene.update(this.secondsPassed);
                scene.afterUpdate();
            }
            this.context.globalAlpha = 1;
            this.mouse.draw(this.context);
            this.currentScene.update(this.secondsPassed);
            this.currentScene.afterUpdate();
        };
        Game.prototype.setFPS = function (timestamp) {
            this.secondsPassed = (timestamp - this.oldTimeStamp) / 1000;
            this.oldTimeStamp = timestamp;
            this.fps = Math.round(1 / this.secondsPassed);
        };
        Game.prototype.eventsAndErrors = function () {
            var gee = new GlobalEventEmitter();
            this.doc.addEventListener("visibilitychange", function () {
                return gee.emit("page:visibilitychange");
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
            var _loop_1 = function (id) {
                if (/\d/.test(id))
                    gee.on("e" + id, function (reason) {
                        return console.error("[" + Errors[id] + "]: " + reason);
                    });
            };
            for (var id in Errors) {
                _loop_1(id);
            }
            var _loop_2 = function (id) {
                if (/\d/.test(id))
                    gee.on("w" + id, function (reason) {
                        return console.warn("[" + Warning[id] + "]: " + reason);
                    });
            };
            for (var id in Warning) {
                _loop_2(id);
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
            var audio = document.createElement("audio");
            audio.src = link;
            audio.onloadeddata = function () { return wait(audio); };
            audio.onerror = fail;
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

    exports.EventEmitter = EventEmitter;
    exports.Game = Game;
    exports.Loaders = loaders;
    exports.Managers = index$2;
    exports.Objects = index$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
