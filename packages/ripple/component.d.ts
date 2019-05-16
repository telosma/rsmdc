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
import { RSRippleAdapter } from './adapter';
import { RSRippleFoundation } from './foundation';
import { RSRippleAttachOpts, RSRippleCapableSurface } from './types';
export declare type RSRippleFactory = (el: Element, foundation?: RSRippleFoundation) => RSRipple;
export declare class RSRipple extends RSComponent<RSRippleFoundation> implements RSRippleCapableSurface {
    static attachTo(root: Element, opts?: RSRippleAttachOpts): RSRipple;
    static createAdapter(instance: RSRippleCapableSurface): RSRippleAdapter;
    root_: Element;
    disabled: boolean;
    private unbounded_?;
    unbounded: boolean;
    activate(): void;
    deactivate(): void;
    layout(): void;
    getDefaultFoundation(): RSRippleFoundation;
    initialSyncWithDOM(): void;
    /**
     * Closure Compiler throws an access control error when directly accessing a
     * protected or private property inside a getter/setter, like unbounded above.
     * By accessing the protected property inside a method, we solve that problem.
     * That's why this function exists.
     */
    private setUnbounded_;
}
