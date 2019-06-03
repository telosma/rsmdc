import * as tslib_1 from "tslib";
import { RSComponent } from '@rsmdc/base/component';
import { RSLineRippleFoundation } from './foundation';
var RSLineRipple = /** @class */ (function (_super) {
    tslib_1.__extends(RSLineRipple, _super);
    function RSLineRipple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RSLineRipple.attachTo = function (root) {
        return new RSLineRipple(root);
    };
    /**
     * Activates the line ripple
     */
    RSLineRipple.prototype.activate = function () {
        this.foundation_.activate();
    };
    /**
     * Deactivates the line ripple
     */
    RSLineRipple.prototype.deactivate = function () {
        this.foundation_.deactivate();
    };
    /**
     * Sets the transform origin given a user's click location.
     * The `rippleCenter` is the x-coordinate of the middle of the ripple.
     */
    RSLineRipple.prototype.setRippleCenter = function (xCoordinate) {
        this.foundation_.setRippleCenter(xCoordinate);
    };
    RSLineRipple.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<RSFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function (className) { return _this.root_.classList.add(className); },
            removeClass: function (className) { return _this.root_.classList.remove(className); },
            hasClass: function (className) { return _this.root_.classList.contains(className); },
            setStyle: function (propertyName, value) { return _this.root_.style.setProperty(propertyName, value); },
            registerEventHandler: function (evtType, handler) { return _this.listen(evtType, handler); },
            deregisterEventHandler: function (evtType, handler) { return _this.unlisten(evtType, handler); },
        };
        // tslint:enable:object-literal-sort-keys
        return new RSLineRippleFoundation(adapter);
    };
    return RSLineRipple;
}(RSComponent));
export { RSLineRipple };
//# sourceMappingURL=component.js.map