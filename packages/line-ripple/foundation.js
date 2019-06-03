import * as tslib_1 from "tslib";
import { RSFoundation } from '@rsmdc/base/foundation';
import { cssClasses } from './constants';
var RSLineRippleFoundation = /** @class */ (function (_super) {
    tslib_1.__extends(RSLineRippleFoundation, _super);
    function RSLineRippleFoundation(adapter) {
        var _this = _super.call(this, tslib_1.__assign({}, RSLineRippleFoundation.defaultAdapter, adapter)) || this;
        _this.transitionEndHandler_ = function (evt) { return _this.handleTransitionEnd(evt); };
        return _this;
    }
    Object.defineProperty(RSLineRippleFoundation, "cssClasses", {
        get: function () {
            return cssClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSLineRippleFoundation, "defaultAdapter", {
        /**
         * See {@link RSLineRippleAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return false; },
                setStyle: function () { return undefined; },
                registerEventHandler: function () { return undefined; },
                deregisterEventHandler: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: true,
        configurable: true
    });
    RSLineRippleFoundation.prototype.init = function () {
        this.adapter_.registerEventHandler('transitionend', this.transitionEndHandler_);
    };
    RSLineRippleFoundation.prototype.destroy = function () {
        this.adapter_.deregisterEventHandler('transitionend', this.transitionEndHandler_);
    };
    RSLineRippleFoundation.prototype.activate = function () {
        this.adapter_.removeClass(cssClasses.LINE_RIPPLE_DEACTIVATING);
        this.adapter_.addClass(cssClasses.LINE_RIPPLE_ACTIVE);
    };
    RSLineRippleFoundation.prototype.setRippleCenter = function (xCoordinate) {
        this.adapter_.setStyle('transform-origin', xCoordinate + "px center");
    };
    RSLineRippleFoundation.prototype.deactivate = function () {
        this.adapter_.addClass(cssClasses.LINE_RIPPLE_DEACTIVATING);
    };
    RSLineRippleFoundation.prototype.handleTransitionEnd = function (evt) {
        // Wait for the line ripple to be either transparent or opaque
        // before emitting the animation end event
        var isDeactivating = this.adapter_.hasClass(cssClasses.LINE_RIPPLE_DEACTIVATING);
        if (evt.propertyName === 'opacity') {
            if (isDeactivating) {
                this.adapter_.removeClass(cssClasses.LINE_RIPPLE_ACTIVE);
                this.adapter_.removeClass(cssClasses.LINE_RIPPLE_DEACTIVATING);
            }
        }
    };
    return RSLineRippleFoundation;
}(RSFoundation));
export { RSLineRippleFoundation };
// tslint:disable-next-line:no-default-export Needed for backward compatibility with RS Web v0.44.0 and earlier.
export default RSLineRippleFoundation;
//# sourceMappingURL=foundation.js.map