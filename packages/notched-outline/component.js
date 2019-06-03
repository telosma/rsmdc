import * as tslib_1 from "tslib";
import { RSComponent } from '@rsmdc/base/component';
import { RSFloatingLabelFoundation } from '@rsmdc/floating-label/foundation';
import { cssClasses, strings } from './constants';
import { RSNotchedOutlineFoundation } from './foundation';
var RSNotchedOutline = /** @class */ (function (_super) {
    tslib_1.__extends(RSNotchedOutline, _super);
    function RSNotchedOutline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RSNotchedOutline.attachTo = function (root) {
        return new RSNotchedOutline(root);
    };
    RSNotchedOutline.prototype.initialSyncWithDOM = function () {
        this.notchElement_ = this.root_.querySelector(strings.NOTCH_ELEMENT_SELECTOR);
        var label = this.root_.querySelector('.' + RSFloatingLabelFoundation.cssClasses.ROOT);
        if (label) {
            label.style.transitionDuration = '0s';
            this.root_.classList.add(cssClasses.OUTLINE_UPGRADED);
            requestAnimationFrame(function () {
                label.style.transitionDuration = '';
            });
        }
        else {
            this.root_.classList.add(cssClasses.NO_LABEL);
        }
    };
    /**
     * Updates classes and styles to open the notch to the specified width.
     * @param notchWidth The notch width in the outline.
     */
    RSNotchedOutline.prototype.notch = function (notchWidth) {
        this.foundation_.notch(notchWidth);
    };
    /**
     * Updates classes and styles to close the notch.
     */
    RSNotchedOutline.prototype.closeNotch = function () {
        this.foundation_.closeNotch();
    };
    RSNotchedOutline.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<RSFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function (className) { return _this.root_.classList.add(className); },
            removeClass: function (className) { return _this.root_.classList.remove(className); },
            setNotchWidthProperty: function (width) { return _this.notchElement_.style.setProperty('width', width + 'px'); },
            removeNotchWidthProperty: function () { return _this.notchElement_.style.removeProperty('width'); },
        };
        // tslint:enable:object-literal-sort-keys
        return new RSNotchedOutlineFoundation(adapter);
    };
    return RSNotchedOutline;
}(RSComponent));
export { RSNotchedOutline };
//# sourceMappingURL=component.js.map