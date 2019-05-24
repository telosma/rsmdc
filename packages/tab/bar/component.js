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
import { RSTabScroller } from '../scroller/index';
import { RSTab, RSTabFoundation } from '../index';
import { RSTabBarFoundation } from './foundation';
var strings = RSTabBarFoundation.strings;
var tabIdCounter = 0;
var RSTabBar = /** @class */ (function (_super) {
    tslib_1.__extends(RSTabBar, _super);
    function RSTabBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RSTabBar.attachTo = function (root) {
        return new RSTabBar(root);
    };
    Object.defineProperty(RSTabBar.prototype, "focusOnActivate", {
        set: function (focusOnActivate) {
            this.tabList_.forEach(function (tab) { return tab.focusOnActivate = focusOnActivate; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSTabBar.prototype, "useAutomaticActivation", {
        set: function (useAutomaticActivation) {
            this.foundation_.setUseAutomaticActivation(useAutomaticActivation);
        },
        enumerable: true,
        configurable: true
    });
    RSTabBar.prototype.initialize = function (tabFactory, tabScrollerFactory) {
        if (tabFactory === void 0) { tabFactory = function (el) { return new RSTab(el); }; }
        if (tabScrollerFactory === void 0) { tabScrollerFactory = function (el) { return new RSTabScroller(el); }; }
        this.tabList_ = this.instantiateTabs_(tabFactory);
        this.tabScroller_ = this.instantiateTabScroller_(tabScrollerFactory);
    };
    RSTabBar.prototype.initialSyncWithDOM = function () {
        var _this = this;
        this.handleTabInteraction_ = function (evt) { return _this.foundation_.handleTabInteraction(evt); };
        this.handleKeyDown_ = function (evt) { return _this.foundation_.handleKeyDown(evt); };
        this.listen(RSTabFoundation.strings.INTERACTED_EVENT, this.handleTabInteraction_);
        this.listen('keydown', this.handleKeyDown_);
        for (var i = 0; i < this.tabList_.length; i++) {
            if (this.tabList_[i].active) {
                this.scrollIntoView(i);
                break;
            }
        }
    };
    RSTabBar.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unlisten(RSTabFoundation.strings.INTERACTED_EVENT, this.handleTabInteraction_);
        this.unlisten('keydown', this.handleKeyDown_);
        this.tabList_.forEach(function (tab) { return tab.destroy(); });
        if (this.tabScroller_) {
            this.tabScroller_.destroy();
        }
    };
    RSTabBar.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<RSFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            scrollTo: function (scrollX) { return _this.tabScroller_.scrollTo(scrollX); },
            incrementScroll: function (scrollXIncrement) { return _this.tabScroller_.incrementScroll(scrollXIncrement); },
            getScrollPosition: function () { return _this.tabScroller_.getScrollPosition(); },
            getScrollContentWidth: function () { return _this.tabScroller_.getScrollContentWidth(); },
            getOffsetWidth: function () { return _this.root_.offsetWidth; },
            isRTL: function () { return window.getComputedStyle(_this.root_).getPropertyValue('direction') === 'rtl'; },
            setActiveTab: function (index) { return _this.foundation_.activateTab(index); },
            activateTabAtIndex: function (index, clientRect) { return _this.tabList_[index].activate(clientRect); },
            deactivateTabAtIndex: function (index) { return _this.tabList_[index].deactivate(); },
            focusTabAtIndex: function (index) { return _this.tabList_[index].focus(); },
            getTabIndicatorClientRectAtIndex: function (index) { return _this.tabList_[index].computeIndicatorClientRect(); },
            getTabDimensionsAtIndex: function (index) { return _this.tabList_[index].computeDimensions(); },
            getPreviousActiveTabIndex: function () {
                for (var i = 0; i < _this.tabList_.length; i++) {
                    if (_this.tabList_[i].active) {
                        return i;
                    }
                }
                return -1;
            },
            getFocusedTabIndex: function () {
                var tabElements = _this.getTabElements_();
                var activeElement = document.activeElement;
                return tabElements.indexOf(activeElement);
            },
            getIndexOfTabById: function (id) {
                for (var i = 0; i < _this.tabList_.length; i++) {
                    if (_this.tabList_[i].id === id) {
                        return i;
                    }
                }
                return -1;
            },
            getTabListLength: function () { return _this.tabList_.length; },
            notifyTabActivated: function (index) {
                return _this.emit(strings.TAB_ACTIVATED_EVENT, { index: index }, true);
            },
        };
        // tslint:enable:object-literal-sort-keys
        return new RSTabBarFoundation(adapter);
    };
    /**
     * Activates the tab at the given index
     * @param index The index of the tab
     */
    RSTabBar.prototype.activateTab = function (index) {
        this.foundation_.activateTab(index);
    };
    /**
     * Scrolls the tab at the given index into view
     * @param index THe index of the tab
     */
    RSTabBar.prototype.scrollIntoView = function (index) {
        this.foundation_.scrollIntoView(index);
    };
    /**
     * Returns all the tab elements in a nice clean array
     */
    RSTabBar.prototype.getTabElements_ = function () {
        return [].slice.call(this.root_.querySelectorAll(strings.TAB_SELECTOR));
    };
    /**
     * Instantiates tab components on all child tab elements
     */
    RSTabBar.prototype.instantiateTabs_ = function (tabFactory) {
        return this.getTabElements_().map(function (el) {
            el.id = el.id || "RS-tab-" + ++tabIdCounter;
            return tabFactory(el);
        });
    };
    /**
     * Instantiates tab scroller component on the child tab scroller element
     */
    RSTabBar.prototype.instantiateTabScroller_ = function (tabScrollerFactory) {
        var tabScrollerElement = this.root_.querySelector(strings.TAB_SCROLLER_SELECTOR);
        if (tabScrollerElement) {
            return tabScrollerFactory(tabScrollerElement);
        }
        return null;
    };
    return RSTabBar;
}(RSComponent));
export { RSTabBar };
//# sourceMappingURL=component.js.map