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
import { RSComponent } from '@rsmdc/base/component';
// import { RSListFactory } from '@rsmdc/list/index';
// import { Corner } from './index';
// import { RSMenuDistance } from './types';
import { RSMenuFoundation } from './foundation';
export declare type RSMenuFactory = (el: Element, foundation?: RSMenuFoundation) => RSMenu;
export declare class RSMenu extends RSComponent<RSMenuFoundation> {
    static attachTo(root: Element): RSMenu;
    private menuSurfaceFactory_;
    private listFactory_;
    private menuSurface_;
    private list_;
    private handleKeydown_;
    private handleItemAction_;
    private afterOpenedCallback_;
    // initialize(menuSurfaceFactory?: RSMenuSurfaceFactory, listFactory?: RSListFactory): void;
    initialSyncWithDOM(): void;
    destroy(): void;
    open: boolean;
    wrapFocus: boolean;
    /**
     * Return the items within the menu. Note that this only contains the set of elements within
     * the items container that are proper list items, and not supplemental / presentational DOM
     * elements.
     */
    readonly items: Element[];
    quickOpen: boolean;
    /**
     * @param corner Default anchor corner alignment of top-left menu corner.
     */
    // setAnchorCorner(corner: Corner): void;
    // setAnchorMargin(margin: Partial<RSMenuDistance>): void;
    /**
     * @return The item within the menu at the index specified.
     */
    getOptionByIndex(index: number): Element | null;
    setFixedPosition(isFixed: boolean): void;
    hoistMenuToBody(): void;
    setIsHoisted(isHoisted: boolean): void;
    setAbsolutePosition(x: number, y: number): void;
    /**
     * Sets the element that the menu-surface is anchored to.
     */
    setAnchorElement(element: Element): void;
    getDefaultFoundation(): RSMenuFoundation;
    private handleAfterOpened_;
}
