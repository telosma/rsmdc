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
import { RSRipple, RSRippleCapableSurface, RSRippleFactory } from '@rsmdc/ripple/index';
import { RSChipFoundation } from './foundation';
export declare type RSChipFactory = (el: Element, foundation?: RSChipFoundation) => RSChip;
export declare class RSChip extends RSComponent<RSChipFoundation> implements RSRippleCapableSurface {
    /**
     * @return Whether the chip is selected.
     */
    /**
    * Sets selected state on the chip.
    */
    selected: boolean;
    /**
     * @return Whether a trailing icon click should trigger exit/removal of the chip.
     */
    /**
    * Sets whether a trailing icon click should trigger exit/removal of the chip.
    */
    shouldRemoveOnTrailingIconClick: boolean;
    readonly ripple: RSRipple;
    readonly id: string;
    static attachTo(root: Element): RSChip;
    root_: HTMLElement;
    private leadingIcon_;
    private trailingIcon_;
    private checkmark_;
    private ripple_;
    private handleInteraction_;
    private handleTransitionEnd_;
    private handleTrailingIconInteraction_;
    initialize(rippleFactory?: RSRippleFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    /**
     * Begins the exit animation which leads to removal of the chip.
     */
    beginExit(): void;
    getDefaultFoundation(): RSChipFoundation;
}
