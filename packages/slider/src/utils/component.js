import * as tslib_1 from "tslib";
import { RSComponent } from '@rsmdc/base/component';
import { strings } from './constants';
import { RSSliderFoundation } from './foundation';
var RSSlider = /** @class */ (function (_super) {
    tslib_1.__extends(RSSlider, _super);
    function RSSlider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RSSlider.attachTo = function (root) {
        return new RSSlider(root);
    };
    Object.defineProperty(RSSlider.prototype, "value", {
        get: function () {
            return this.foundation_.getValue();
        },
        set: function (value) {
            this.foundation_.setValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSSlider.prototype, "min", {
        get: function () {
            return this.foundation_.getMin();
        },
        set: function (min) {
            this.foundation_.setMin(min);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSSlider.prototype, "max", {
        get: function () {
            return this.foundation_.getMax();
        },
        set: function (max) {
            this.foundation_.setMax(max);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSSlider.prototype, "step", {
        get: function () {
            return this.foundation_.getStep();
        },
        set: function (step) {
            this.foundation_.setStep(step);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSSlider.prototype, "disabled", {
        get: function () {
            return this.foundation_.isDisabled();
        },
        set: function (disabled) {
            this.foundation_.setDisabled(disabled);
        },
        enumerable: true,
        configurable: true
    });
    RSSlider.prototype.initialize = function () {
        this.thumbContainer_ = this.root_.querySelector(strings.THUMB_CONTAINER_SELECTOR);
        this.track_ = this.root_.querySelector(strings.TRACK_SELECTOR);
        this.pinValueMarker_ = this.root_.querySelector(strings.PIN_VALUE_MARKER_SELECTOR);
        this.trackMarkerContainer_ = this.root_.querySelector(strings.TRACK_MARKER_CONTAINER_SELECTOR);
    };
    RSSlider.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<RSFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            hasClass: function (className) { return _this.root_.classList.contains(className); },
            addClass: function (className) { return _this.root_.classList.add(className); },
            removeClass: function (className) { return _this.root_.classList.remove(className); },
            getAttribute: function (name) { return _this.root_.getAttribute(name); },
            setAttribute: function (name, value) { return _this.root_.setAttribute(name, value); },
            removeAttribute: function (name) { return _this.root_.removeAttribute(name); },
            computeBoundingRect: function () { return _this.root_.getBoundingClientRect(); },
            getTabIndex: function () { return _this.root_.tabIndex; },
            registerInteractionHandler: function (evtType, handler) { return _this.listen(evtType, handler); },
            deregisterInteractionHandler: function (evtType, handler) { return _this.unlisten(evtType, handler); },
            registerThumbContainerInteractionHandler: function (evtType, handler) {
                _this.thumbContainer_.addEventListener(evtType, handler);
            },
            deregisterThumbContainerInteractionHandler: function (evtType, handler) {
                _this.thumbContainer_.removeEventListener(evtType, handler);
            },
            registerBodyInteractionHandler: function (evtType, handler) { return document.body.addEventListener(evtType, handler); },
            deregisterBodyInteractionHandler: function (evtType, handler) { return document.body.removeEventListener(evtType, handler); },
            registerResizeHandler: function (handler) { return window.addEventListener('resize', handler); },
            deregisterResizeHandler: function (handler) { return window.removeEventListener('resize', handler); },
            notifyInput: function () { return _this.emit(strings.INPUT_EVENT, _this); },
            notifyChange: function () { return _this.emit(strings.CHANGE_EVENT, _this); },
            setThumbContainerStyleProperty: function (propertyName, value) {
                _this.thumbContainer_.style.setProperty(propertyName, value);
            },
            setTrackStyleProperty: function (propertyName, value) { return _this.track_.style.setProperty(propertyName, value); },
            setMarkerValue: function (value) { return _this.pinValueMarker_.innerText = value.toLocaleString(); },
            appendTrackMarkers: function (numMarkers) {
                var frag = document.createDocumentFragment();
                for (var i = 0; i < numMarkers; i++) {
                    var marker = document.createElement('div');
                    marker.classList.add('RS-slider__track-marker');
                    frag.appendChild(marker);
                }
                _this.trackMarkerContainer_.appendChild(frag);
            },
            removeTrackMarkers: function () {
                while (_this.trackMarkerContainer_.firstChild) {
                    _this.trackMarkerContainer_.removeChild(_this.trackMarkerContainer_.firstChild);
                }
            },
            setLastTrackMarkersStyleProperty: function (propertyName, value) {
                // We remove and append new nodes, thus, the last track marker must be dynamically found.
                var lastTrackMarker = _this.root_.querySelector(strings.LAST_TRACK_MARKER_SELECTOR);
                lastTrackMarker.style.setProperty(propertyName, value);
            },
            isRTL: function () { return getComputedStyle(_this.root_).direction === 'rtl'; },
        };
        // tslint:enable:object-literal-sort-keys
        return new RSSliderFoundation(adapter);
    };
    RSSlider.prototype.initialSyncWithDOM = function () {
        var origValueNow = this.parseFloat_(this.root_.getAttribute(strings.ARIA_VALUENOW), this.value);
        var min = this.parseFloat_(this.root_.getAttribute(strings.ARIA_VALUEMIN), this.min);
        var max = this.parseFloat_(this.root_.getAttribute(strings.ARIA_VALUEMAX), this.max);
        // min and max need to be set in the right order to avoid throwing an error
        // when the new min is greater than the default max.
        if (min >= this.max) {
            this.max = max;
            this.min = min;
        }
        else {
            this.min = min;
            this.max = max;
        }
        this.step = this.parseFloat_(this.root_.getAttribute(strings.STEP_DATA_ATTR), this.step);
        this.value = origValueNow;
        this.disabled = (this.root_.hasAttribute(strings.ARIA_DISABLED) &&
            this.root_.getAttribute(strings.ARIA_DISABLED) !== 'false');
        this.foundation_.setupTrackMarker();
    };
    RSSlider.prototype.layout = function () {
        this.foundation_.layout();
    };
    RSSlider.prototype.stepUp = function (amount) {
        if (amount === void 0) { amount = (this.step || 1); }
        this.value += amount;
    };
    RSSlider.prototype.stepDown = function (amount) {
        if (amount === void 0) { amount = (this.step || 1); }
        this.value -= amount;
    };
    RSSlider.prototype.parseFloat_ = function (str, defaultValue) {
        var num = parseFloat(str); // tslint:disable-line:ban
        var isNumeric = typeof num === 'number' && isFinite(num);
        return isNumeric ? num : defaultValue;
    };
    return RSSlider;
}(RSComponent));
export { RSSlider };
//# sourceMappingURL=component.js.map