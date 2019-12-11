/**
 * @license
 * Copyright 2018 Google Inc.
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
import { RSRipple, RSRippleFoundation } from '@rsmdc/ripple/index';
import { RSTabIndicator } from '@rsmdc/tab-indicator/index';
import { RSTabFoundation } from './foundation';
var RSTab = /** @class */ (function (_super) {
    tslib_1.__extends(RSTab, _super);
    function RSTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RSTab.attachTo = function (root) {
        return new RSTab(root);
    };
    RSTab.prototype.initialize = function (rippleFactory, tabIndicatorFactory) {
        if (rippleFactory === void 0) { rippleFactory = function (el, foundation) { return new RSRipple(el, foundation); }; }
        if (tabIndicatorFactory === void 0) { tabIndicatorFactory = function (el) { return new RSTabIndicator(el); }; }
        this.id = this.root_.id;
        var rippleSurface = this.root_.querySelector(RSTabFoundation.strings.RIPPLE_SELECTOR);
        var rippleAdapter = tslib_1.__assign({}, RSRipple.createAdapter(this), { addClass: function (className) { return rippleSurface.classList.add(className); }, removeClass: function (className) { return rippleSurface.classList.remove(className); }, updateCssVariable: function (varName, value) { return rippleSurface.style.setProperty(varName, value); } });
        var rippleFoundation = new RSRippleFoundation(rippleAdapter);
        this.ripple_ = rippleFactory(this.root_, rippleFoundation);
        var tabIndicatorElement = this.root_.querySelector(RSTabFoundation.strings.TAB_INDICATOR_SELECTOR);
        this.tabIndicator_ = tabIndicatorFactory(tabIndicatorElement);
        this.content_ = this.root_.querySelector(RSTabFoundation.strings.CONTENT_SELECTOR);
    };
    RSTab.prototype.initialSyncWithDOM = function () {
        var _this = this;
        this.handleClick_ = function () { return _this.foundation_.handleClick(); };
        this.listen('click', this.handleClick_);
    };
    RSTab.prototype.destroy = function () {
        this.unlisten('click', this.handleClick_);
        this.ripple_.destroy();
        _super.prototype.destroy.call(this);
    };
    RSTab.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<RSFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            setAttr: function (attr, value) { return _this.root_.setAttribute(attr, value); },
            addClass: function (className) { return _this.root_.classList.add(className); },
            removeClass: function (className) { return _this.root_.classList.remove(className); },
            hasClass: function (className) { return _this.root_.classList.contains(className); },
            activateIndicator: function (previousIndicatorClientRect) { return _this.tabIndicator_.activate(previousIndicatorClientRect); },
            deactivateIndicator: function () { return _this.tabIndicator_.deactivate(); },
            notifyInteracted: function () { return _this.emit(RSTabFoundation.strings.INTERACTED_EVENT, { tabId: _this.id }, true /* bubble */); },
            getOffsetLeft: function () { return _this.root_.offsetLeft; },
            getOffsetWidth: function () { return _this.root_.offsetWidth; },
            getContentOffsetLeft: function () { return _this.content_.offsetLeft; },
            getContentOffsetWidth: function () { return _this.content_.offsetWidth; },
            focus: function () { return _this.root_.focus(); },
        };
        // tslint:enable:object-literal-sort-keys
        return new RSTabFoundation(adapter);
    };
    Object.defineProperty(RSTab.prototype, "active", {
        /**
         * Getter for the active state of the tab
         */
        get: function () {
            return this.foundation_.isActive();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSTab.prototype, "focusOnActivate", {
        set: function (focusOnActivate) {
            this.foundation_.setFocusOnActivate(focusOnActivate);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Activates the tab
     */
    RSTab.prototype.activate = function (computeIndicatorClientRect) {
        this.foundation_.activate(computeIndicatorClientRect);
    };
    /**
     * Deactivates the tab
     */
    RSTab.prototype.deactivate = function () {
        this.foundation_.deactivate();
    };
    /**
     * Returns the indicator's client rect
     */
    RSTab.prototype.computeIndicatorClientRect = function () {
        return this.tabIndicator_.computeContentClientRect();
    };
    RSTab.prototype.computeDimensions = function () {
        return this.foundation_.computeDimensions();
    };
    /**
     * Focuses the tab
     */
    RSTab.prototype.focus = function () {
        this.root_.focus();
    };
    return RSTab;
}(RSComponent));
export { RSTab };
//# sourceMappingURL=component.js.map