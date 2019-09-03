/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import * as tslib_1 from "tslib";
import { RSComponent } from '@rsmdc/base/component';
import { RSRipple, RSRippleFoundation, } from '@rsmdc/ripple/index';
import { strings } from './constants';
import { RSChipFoundation } from './foundation';
var INTERACTION_EVENTS = ['click', 'keydown'];
var RSChip = /** @class */ (function (_super) {
    tslib_1.__extends(RSChip, _super);
    function RSChip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RSChip.prototype, "selected", {
        /**
         * @return Whether the chip is selected.
         */
        get: function () {
            return this.foundation_.isSelected();
        },
        /**
         * Sets selected state on the chip.
         */
        set: function (selected) {
            this.foundation_.setSelected(selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSChip.prototype, "shouldRemoveOnTrailingIconClick", {
        /**
         * @return Whether a trailing icon click should trigger exit/removal of the chip.
         */
        get: function () {
            return this.foundation_.getShouldRemoveOnTrailingIconClick();
        },
        /**
         * Sets whether a trailing icon click should trigger exit/removal of the chip.
         */
        set: function (shouldRemove) {
            this.foundation_.setShouldRemoveOnTrailingIconClick(shouldRemove);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSChip.prototype, "ripple", {
        get: function () {
            return this.ripple_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSChip.prototype, "id", {
        get: function () {
            return this.root_.id;
        },
        enumerable: true,
        configurable: true
    });
    RSChip.attachTo = function (root) {
        return new RSChip(root);
    };
    RSChip.prototype.initialize = function (rippleFactory) {
        var _this = this;
        if (rippleFactory === void 0) { rippleFactory = function (el, foundation) { return new RSRipple(el, foundation); }; }
        this.leadingIcon_ = this.root_.querySelector(strings.LEADING_ICON_SELECTOR);
        this.trailingIcon_ = this.root_.querySelector(strings.TRAILING_ICON_SELECTOR);
        this.checkmark_ = this.root_.querySelector(strings.CHECKMARK_SELECTOR);
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<RSFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        var rippleAdapter = tslib_1.__assign({}, RSRipple.createAdapter(this), { computeBoundingRect: function () { return _this.foundation_.getDimensions(); } });
        this.ripple_ = rippleFactory(this.root_, new RSRippleFoundation(rippleAdapter));
    };
    RSChip.prototype.initialSyncWithDOM = function () {
        var _this = this;
        this.handleInteraction_ = function (evt) { return _this.foundation_.handleInteraction(evt); };
        this.handleTransitionEnd_ = function (evt) { return _this.foundation_.handleTransitionEnd(evt); };
        this.handleTrailingIconInteraction_ = function (evt) {
            return _this.foundation_.handleTrailingIconInteraction(evt);
        };
        INTERACTION_EVENTS.forEach(function (evtType) {
            _this.listen(evtType, _this.handleInteraction_);
        });
        this.listen('transitionend', this.handleTransitionEnd_);
        if (this.trailingIcon_) {
            INTERACTION_EVENTS.forEach(function (evtType) {
                _this.trailingIcon_.addEventListener(evtType, _this.handleTrailingIconInteraction_);
            });
        }
    };
    RSChip.prototype.destroy = function () {
        var _this = this;
        this.ripple_.destroy();
        INTERACTION_EVENTS.forEach(function (evtType) {
            _this.unlisten(evtType, _this.handleInteraction_);
        });
        this.unlisten('transitionend', this.handleTransitionEnd_);
        if (this.trailingIcon_) {
            INTERACTION_EVENTS.forEach(function (evtType) {
                _this.trailingIcon_.removeEventListener(evtType, _this.handleTrailingIconInteraction_);
            });
        }
        _super.prototype.destroy.call(this);
    };
    /**
     * Begins the exit animation which leads to removal of the chip.
     */
    RSChip.prototype.beginExit = function () {
        this.foundation_.beginExit();
    };
    RSChip.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<RSFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        var adapter = {
            addClass: function (className) { return _this.root_.classList.add(className); },
            addClassToLeadingIcon: function (className) {
                if (_this.leadingIcon_) {
                    _this.leadingIcon_.classList.add(className);
                }
            },
            eventTargetHasClass: function (target, className) { return target ? target.classList.contains(className) : false; },
            getCheckmarkBoundingClientRect: function () { return _this.checkmark_ ? _this.checkmark_.getBoundingClientRect() : null; },
            getComputedStyleValue: function (propertyName) { return window.getComputedStyle(_this.root_).getPropertyValue(propertyName); },
            getRootBoundingClientRect: function () { return _this.root_.getBoundingClientRect(); },
            hasClass: function (className) { return _this.root_.classList.contains(className); },
            hasLeadingIcon: function () { return !!_this.leadingIcon_; },
            notifyInteraction: function () { return _this.emit(strings.INTERACTION_EVENT, { chipId: _this.id }, true /* shouldBubble */); },
            notifyRemoval: function () { return _this.emit(strings.REMOVAL_EVENT, { chipId: _this.id, root: _this.root_ }, true /* shouldBubble */); },
            notifySelection: function (selected) { return _this.emit(strings.SELECTION_EVENT, { chipId: _this.id, selected: selected }, true /* shouldBubble */); },
            notifyTrailingIconInteraction: function () { return _this.emit(strings.TRAILING_ICON_INTERACTION_EVENT, { chipId: _this.id }, true /* shouldBubble */); },
            removeClass: function (className) { return _this.root_.classList.remove(className); },
            removeClassFromLeadingIcon: function (className) {
                if (_this.leadingIcon_) {
                    _this.leadingIcon_.classList.remove(className);
                }
            },
            setStyleProperty: function (propertyName, value) { return _this.root_.style.setProperty(propertyName, value); },
        };
        return new RSChipFoundation(adapter);
    };
    return RSChip;
}(RSComponent));
export { RSChip };
//# sourceMappingURL=component.js.map