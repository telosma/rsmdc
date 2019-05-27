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
import { RSTabIndicatorFoundation } from './foundation';
/* istanbul ignore next: subclass is not a branch statement */
var RSFadingTabIndicatorFoundation = /** @class */ (function (_super) {
    tslib_1.__extends(RSFadingTabIndicatorFoundation, _super);
    function RSFadingTabIndicatorFoundation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RSFadingTabIndicatorFoundation.prototype.activate = function () {
        this.adapter_.addClass(RSTabIndicatorFoundation.cssClasses.ACTIVE);
    };
    RSFadingTabIndicatorFoundation.prototype.deactivate = function () {
        this.adapter_.removeClass(RSTabIndicatorFoundation.cssClasses.ACTIVE);
    };
    return RSFadingTabIndicatorFoundation;
}(RSTabIndicatorFoundation));
export { RSFadingTabIndicatorFoundation };
// tslint:disable-next-line:no-default-export Needed for backward compatibility with RS Web v0.44.0 and earlier.
export default RSFadingTabIndicatorFoundation;
//# sourceMappingURL=fading-foundation.js.map