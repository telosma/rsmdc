import * as tslib_1 from "tslib";
import { RSComponent } from '@rsmdc/base/component';
import { RSTextFieldIconFoundation } from './foundation';
var RSTextFieldIcon = /** @class */ (function (_super) {
    tslib_1.__extends(RSTextFieldIcon, _super);
    function RSTextFieldIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RSTextFieldIcon.attachTo = function (root) {
        return new RSTextFieldIcon(root);
    };
    Object.defineProperty(RSTextFieldIcon.prototype, "foundation", {
        get: function () {
            return this.foundation_;
        },
        enumerable: true,
        configurable: true
    });
    RSTextFieldIcon.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<RSFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            getAttr: function (attr) { return _this.root_.getAttribute(attr); },
            setAttr: function (attr, value) { return _this.root_.setAttribute(attr, value); },
            removeAttr: function (attr) { return _this.root_.removeAttribute(attr); },
            setContent: function (content) {
                _this.root_.textContent = content;
            },
            registerInteractionHandler: function (evtType, handler) { return _this.listen(evtType, handler); },
            deregisterInteractionHandler: function (evtType, handler) { return _this.unlisten(evtType, handler); },
            notifyIconAction: function () { return _this.emit(RSTextFieldIconFoundation.strings.ICON_EVENT, {} /* evtData */, true /* shouldBubble */); },
        };
        // tslint:enable:object-literal-sort-keys
        return new RSTextFieldIconFoundation(adapter);
    };
    return RSTextFieldIcon;
}(RSComponent));
export { RSTextFieldIcon };
//# sourceMappingURL=component.js.map