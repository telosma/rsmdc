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
import { RSFoundation } from '@rsmdc/base/foundation';
import { RSMenuAdapter } from './adapter';
export declare class RSMenuFoundation extends RSFoundation<RSMenuAdapter> {
    static readonly cssClasses: {
        MENU_SELECTED_LIST_ITEM: string;
        MENU_SELECTION_GROUP: string;
        ROOT: string;
    };
    static readonly strings: {
        ARIA_SELECTED_ATTR: string;
        CHECKBOX_SELECTOR: string;
        LIST_SELECTOR: string;
        SELECTED_EVENT: string;
    };
    private closeAnimationEndTimerId_;
    /**
     * @see {@link RSMenuAdapter} for typing information on parameters and return types.
     */
    static readonly defaultAdapter: RSMenuAdapter;
    constructor(adapter?: Partial<RSMenuAdapter>);
    destroy(): void;
    handleKeydown(evt: KeyboardEvent): void;
    handleItemAction(listItem: Element): void;
    /**
     * Handles toggling the selected classes in a selection group when a selection is made.
     */
    private handleSelectionGroup_;
    /**
     * Returns the parent selection group of an element if one exists.
     */
    private getSelectionGroup_;
}
export default RSMenuFoundation;
