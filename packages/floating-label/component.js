import * as tslib_1 from "tslib";
import { RSComponent } from '@rsmdc/base/component';
import { RSFloatingLabelFoundation } from './foundation';
var RSFloatingLabel = /** @class */ (function (_super) {
    tslib_1.__extends(RSFloatingLabel, _super);
    function RSFloatingLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RSFloatingLabel.attachTo = function (root) {
        return new RSFloatingLabel(root);
    };
    /**
     * Styles the label to produce the label shake for errors.
     * @param shouldShake If true, shakes the label by adding a CSS class; otherwise, stops shaking by removing the class.
     */
    RSFloatingLabel.prototype.shake = function (shouldShake) {
        this.foundation_.shake(shouldShake);
    };
    /**
     * Styles the label to float/dock.
     * @param shouldFloat If true, floats the label by adding a CSS class; otherwise, docks it by removing the class.
     */
    RSFloatingLabel.prototype.float = function (shouldFloat) {
        this.foundation_.float(shouldFloat);
    };
    RSFloatingLabel.prototype.getWidth = function () {
        return this.foundation_.getWidth();
    };
    RSFloatingLabel.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<RSFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function (className) { return _this.root_.classList.add(className); },
            removeClass: function (className) { return _this.root_.classList.remove(className); },
            getWidth: function () { return _this.root_.scrollWidth; },
            registerInteractionHandler: function (evtType, handler) { return _this.listen(evtType, handler); },
            deregisterInteractionHandler: function (evtType, handler) { return _this.unlisten(evtType, handler); },
        };
        // tslint:enable:object-literal-sort-keys
        return new RSFloatingLabelFoundation(adapter);
    };
    return RSFloatingLabel;
}(RSComponent));
export { RSFloatingLabel };
//# sourceMappingURL=component.js.map