import * as tslib_1 from "tslib";
import { RSComponent } from '@rsmdc/base/component';
import { RSTextFieldHelperTextFoundation } from './foundation';
var RSTextFieldHelperText = /** @class */ (function (_super) {
    tslib_1.__extends(RSTextFieldHelperText, _super);
    function RSTextFieldHelperText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RSTextFieldHelperText.attachTo = function (root) {
        return new RSTextFieldHelperText(root);
    };
    Object.defineProperty(RSTextFieldHelperText.prototype, "foundation", {
        get: function () {
            return this.foundation_;
        },
        enumerable: true,
        configurable: true
    });
    RSTextFieldHelperText.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<RSFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function (className) { return _this.root_.classList.add(className); },
            removeClass: function (className) { return _this.root_.classList.remove(className); },
            hasClass: function (className) { return _this.root_.classList.contains(className); },
            setAttr: function (attr, value) { return _this.root_.setAttribute(attr, value); },
            removeAttr: function (attr) { return _this.root_.removeAttribute(attr); },
            setContent: function (content) {
                _this.root_.textContent = content;
            },
        };
        // tslint:enable:object-literal-sort-keys
        return new RSTextFieldHelperTextFoundation(adapter);
    };
    return RSTextFieldHelperText;
}(RSComponent));
export { RSTextFieldHelperText };
//# sourceMappingURL=component.js.map