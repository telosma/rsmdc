import * as tslib_1 from "tslib";
import { RSFoundation } from '@rsmdc/base/foundation';
import { cssClasses, strings } from './constants';
var RSTextFieldCharacterCounterFoundation = /** @class */ (function (_super) {
    tslib_1.__extends(RSTextFieldCharacterCounterFoundation, _super);
    function RSTextFieldCharacterCounterFoundation(adapter) {
        return _super.call(this, tslib_1.__assign({}, RSTextFieldCharacterCounterFoundation.defaultAdapter, adapter)) || this;
    }
    Object.defineProperty(RSTextFieldCharacterCounterFoundation, "cssClasses", {
        get: function () {
            return cssClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSTextFieldCharacterCounterFoundation, "strings", {
        get: function () {
            return strings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RSTextFieldCharacterCounterFoundation, "defaultAdapter", {
        /**
         * See {@link RSTextFieldCharacterCounterAdapter} for typing information on parameters and return types.
         */
        get: function () {
            return {
                setContent: function () { return undefined; },
            };
        },
        enumerable: true,
        configurable: true
    });
    RSTextFieldCharacterCounterFoundation.prototype.setCounterValue = function (currentLength, maxLength) {
        currentLength = Math.min(currentLength, maxLength);
        this.adapter_.setContent(currentLength + " / " + maxLength);
    };
    return RSTextFieldCharacterCounterFoundation;
}(RSFoundation));
export { RSTextFieldCharacterCounterFoundation };
// tslint:disable-next-line:no-default-export Needed for backward compatibility with RS Web v0.44.0 and earlier.
export default RSTextFieldCharacterCounterFoundation;
//# sourceMappingURL=foundation.js.map