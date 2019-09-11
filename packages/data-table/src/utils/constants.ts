/**
 * @license
 * Copyright 2019 Google Inc.
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

export const cssClasses = {
  CELL: 'cell',
  CELL_NUMERIC: '-numeric',
  CONTENT: 'content',
  HEADER_ROW: 'headerrow',
  HEADER_ROW_CHECKBOX: 'header-row-checkbox',
  ROOT: 'mdc-data-table',
  ROW: 'row',
  ROW_CHECKBOX: '-checkbox',
  ROW_SELECTED: '-selected',
};

export const strings = {
  ARIA_SELECTED: 'aria-selected',
  DATA_ROW_ID_ATTR: 'data-row-id',
  HEADER_ROW_CHECKBOX_SELECTOR: `.${cssClasses.HEADER_ROW_CHECKBOX}`,
  ROW_CHECKBOX_SELECTOR: `.${cssClasses.ROW_CHECKBOX}`,
  ROW_SELECTED_SELECTOR: `.${cssClasses.ROW_SELECTED}`,
  ROW_SELECTOR: `.${cssClasses.ROW}`,
};

export const events = {
  ROW_SELECTION_CHANGED: 'RSDataTable:rowSelectionChanged',
  SELECTED_ALL: 'RSDataTable:selectedAll',
  UNSELECTED_ALL: 'RSDataTable:unselectedAll',
};
