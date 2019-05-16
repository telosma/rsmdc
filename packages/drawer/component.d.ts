/**
 * @license
 * Copyright 2016 Google Inc.
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
import { RSComponent } from '@rsmdc/base/component';
import { RSListFactory } from '@rsmdc/list/component';
import { RSDismissibleDrawerFoundation } from './dismissible/foundation';
import { RSDrawerFocusTrapFactory } from './util';
export declare class RSDrawer extends RSComponent<RSDismissibleDrawerFoundation> {
    static attachTo(root: Element): RSDrawer;
    /**
     * Returns true if drawer is in the open position.
     */
    /**
    * Toggles the drawer open and closed.
    */
    open: boolean;
    private previousFocus_?;
    private scrim_;
    private list_?;
    private focusTrap_?;
    private focusTrapFactory_;
    private handleScrimClick_?;
    private handleKeydown_;
    private handleTransitionEnd_;
    initialize(focusTrapFactory?: RSDrawerFocusTrapFactory, listFactory?: RSListFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    getDefaultFoundation(): RSDismissibleDrawerFoundation;
}
