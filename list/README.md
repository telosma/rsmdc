<!--docs:
title: "Lists"
layout: detail
section: components
excerpt: "Lists present multiple line items vertically as a single continuous element."
iconId: list
path: /catalog/lists/
-->

# Lists

<!--<div class="article__asset">
  <a class="article__asset-link"
     href="https://material-components.github.io/material-components-web-catalog/#/component/list">
    <img src="{{ site.rootpath }}/images/rs_web_screenshots/lists.png" width="365" alt="Lists screenshot">
  </a>
</div>-->

Lists are continuous, vertical indexes of text or images.

## Design & API Documentation

<ul class="icon-list">
  <li class="icon-list-item icon-list-item--spec">
    <a href="https://material.io/design/components/lists.html">Material Design guidelines: Lists</a>
  </li>
  <li class="icon-list-item icon-list-item--link">
    <a href="https://material-components.github.io/material-components-web-catalog/#/component/list">Demo</a>
  </li>
</ul>

## Installation
```
npm install @material/list
```

## Basic Usage

### HTML Structure

```html
<ul class="rs-list">
  <li class="rs-list-item" tabindex="0">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
  <li class="rs-list-item">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
  <li class="rs-list-item">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
</ul>
```

### JavaScript

rs List includes an optional JavaScript component which can be used for keyboard interaction and accessibility.

```js
import {RSList} from '@material/list';

const list = new RSList(document.querySelector('.rs-list'));
```

> See [Importing the JS component](../../docs/importing-js.md) for more information on how to import JavaScript.

Note that the JS component does _not_ automatically instantiate ripples on list items. If you wish to include the
fully-upgraded ripple effect on list items, you must instantiate `RSRipple` on each item:

```js
import {RSRipple} from '@material/ripple';

const listItemRipples = list.listElements.map((listItemEl) => new RSRipple(listItemEl));
```

## Variants

### Two-Line List

You can use the `rs-list--two-line` combined with some extra markup around the text to style a list
in the double line list style as defined by
[the spec](https://material.io/design/components/lists.html#specs) (see "Double line").

```html
<ul class="rs-list rs-list--two-line">
  <li class="rs-list-item" tabindex="0">
    <span class="rs-list-item__text">
      <span class="rs-list-item__primary-text">First-line text</span>
      <span class="rs-list-item__secondary-text">Second-line text</span>
    </span>
  </li>
  <li class="rs-list-item">
    <span class="rs-list-item__text">
      <span class="rs-list-item__primary-text">First-line text</span>
      <span class="rs-list-item__secondary-text">Second-line text</span>
    </span>
  </li>
  <li class="rs-list-item">
    <span class="rs-list-item__text">
      <span class="rs-list-item__primary-text">First-line text</span>
      <span class="rs-list-item__secondary-text">Second-line text</span>
    </span>
  </li>
</ul>
```

> NOTE: Make sure there are no white-space characters before primary and secondary text content.

### List Groups

Multiple related lists can be grouped together using the `rs-list-group` class on a containing element.

```html
<div class="rs-list-group">
  <h3 class="rs-list-group__subheader">List 1</h3>
  <ul class="rs-list">
    <li class="rs-list-item" tabindex="0">
      <span class="rs-list-item__text">line item</span>
    </li>
    <li class="rs-list-item">
      <span class="rs-list-item__text">line item</span>
    </li>
    <li class="rs-list-item">
      <span class="rs-list-item__text">line item</span>
    </li>
  </ul>
  <h3 class="rs-list-group__subheader">List 2</h3>
  <ul class="rs-list">
    <li class="rs-list-item">
      <span class="rs-list-item__text">line item</span>
    </li>
    <li class="rs-list-item">
      <span class="rs-list-item__text">line item</span>
    </li>
    <li class="rs-list-item">
      <span class="rs-list-item__text">line item</span>
    </li>
  </ul>
</div>
```

### List Dividers

rs List contains an `rs-list-divider` class which can be used as full-width or inset subdivisions either within lists themselves, or standalone between related groups of content.

```html
<ul class="rs-list">
  <li class="rs-list-item" tabindex="0">
    <span class="rs-list-item__text">Item 1 - Division 1</span>
  </li>
  <li class="rs-list-item">
    <span class="rs-list-item__text">Item 2 - Division 1</span>
  </li>
  <li role="separator" class="rs-list-divider"></li>
  <li class="rs-list-item">
    <span class="rs-list-item__text">Item 1 - Division 2</span>
  </li>
  <li class="rs-list-item">
    <span class="rs-list-item__text">Item 2 - Division 2</span>
  </li>
</ul>
```

> NOTE: the role="separator" attribute on the list divider. It is important to include this so that assistive technology can be made aware that this is a presentational element and is not meant to be included as an item in a list. Note that separator is indeed a valid role for li elements.

OR

```html
<ul class="rs-list">
  <li class="rs-list-item" tabindex="0">
    <span class="rs-list-item__text">Item 1 - List 1</span>
  </li>
  <li class="rs-list-item">
    <span class="rs-list-item__text">Item 2 - List 1</span>
  </li>
</ul>
<hr class="rs-list-divider">
<ul class="rs-list">
  <li class="rs-list-item">
    <span class="rs-list-item__text">Item 1 - List 2</span>
  </li>
  <li class="rs-list-item">
    <span class="rs-list-item__text">Item 2 - List 2</span>
  </li>
</ul>
```

### Single Selection List

rs List can handle selecting/deselecting list elements based on click or keyboard action. When enabled, the `space` and `enter` keys (or `click` event) will trigger an
single list item to become selected and any other previous selected element to become deselected.

```html
<ul id="my-list" class="rs-list" role="listbox">
  <li class="rs-list-item" role="option" tabindex="0">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
  <li class="rs-list-item" role="option">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
  <li class="rs-list-item" role="option">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
</ul>
```

```js
const list = new RSList(document.getElementById('my-list'));
list.singleSelection = true;
```

#### Pre-selected list item

When rendering the list with a pre-selected list item, the list item that needs to be selected should contain
the `rs-list-item--selected` or `rs-list-item--activated` class and `aria-selected="true"` attribute before
creating the list.

```html
<ul id="my-list" class="rs-list" role="listbox">
  <li class="rs-list-item" role="option" aria-selected="false">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
  <li class="rs-list-item rs-list-item--selected" role="option" aria-selected="true" tabindex="0">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
  <li class="rs-list-item" role="option" aria-selected="false">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
</ul>
```

```js
const list = new RSList(document.getElementById('my-list'));
list.singleSelection = true;
```

### List with radio group

When rendering list radio group with pre-selected radio button the selected list item should contain `aria-checked` set to `true` and the native radio input element contains `checked` attribute, all other list items should have `aria-checked` set to `false`. The list root contains `role="radiogroup"` whereas each list item within radio group contains `role="radio"`.

```html
<ul class="rs-list" role="radiogroup">
  <li class="rs-list-item" role="radio" aria-checked="false">
    <span class="rs-list-item__graphic">
      <div class="rs-radio">
        <input class="rs-radio__native-control"
              type="radio"
              id="demo-list-radio-item-1"
              name="demo-list-radio-item-group"
              value="1">
        <div class="rs-radio__background">
          <div class="rs-radio__outer-circle"></div>
          <div class="rs-radio__inner-circle"></div>
        </div>
      </div>
    </span>
    <label class="rs-list-item__text" for="demo-list-radio-item-1">Option 1</label>
  </li>
  <li class="rs-list-item" role="radio" aria-checked="true" tabindex="0">
    <span class="rs-list-item__graphic">
      <div class="rs-radio">
        <input class="rs-radio__native-control"
              type="radio"
              id="demo-list-radio-item-2"
              name="demo-list-radio-item-group"
              value="2"
              checked>
        <div class="rs-radio__background">
          <div class="rs-radio__outer-circle"></div>
          <div class="rs-radio__inner-circle"></div>
        </div>
      </div>
    </span>
    <label class="rs-list-item__text" for="demo-list-radio-item-2">Option 2</label>
  </li>
  <li class="rs-list-item" role="radio" aria-checked="false">
    <span class="rs-list-item__graphic">
      <div class="rs-radio">
        <input class="rs-radio__native-control"
              type="radio"
              id="demo-list-radio-item-3"
              name="demo-list-radio-item-group"
              value="3">
        <div class="rs-radio__background">
          <div class="rs-radio__outer-circle"></div>
          <div class="rs-radio__inner-circle"></div>
        </div>
      </div>
    </span>
    <label class="rs-list-item__text" for="demo-list-radio-item-3">Option 3</label>
  </li>
</ul>
```

### List with checkbox items

When rendering list with checkbox items all pre-selected list items should contain `aria-checked` set to `true` and the native checkbox input element should contain `checked` attribute, all other list items should have `aria-checked` set to `false`. Each list item in checkbox list contains `role="checkbox"` attribute and the list root should contain `role="group"` and `aria-label` attributes.

```html
<ul class="rs-list" role="group" aria-label="List with checkbox items">
  <li class="rs-list-item" role="checkbox" aria-checked="false">
    <span class="rs-list-item__graphic">
      <div class="rs-checkbox">
        <input type="checkbox"
                class="rs-checkbox__native-control"
                id="demo-list-checkbox-item-1"  />
        <div class="rs-checkbox__background">
          <svg class="rs-checkbox__checkmark"
                viewBox="0 0 24 24">
            <path class="rs-checkbox__checkmark-path"
                  fill="none"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div class="rs-checkbox__mixedmark"></div>
        </div>
      </div>
    </span>
    <label class="rs-list-item__text" for="demo-list-checkbox-item-1">Option 1</label>
  </li>
  <li class="rs-list-item" role="checkbox" aria-checked="true" tabindex="0">
    <span class="rs-list-item__graphic">
        <div class="rs-checkbox">
            <input type="checkbox"
                    class="rs-checkbox__native-control"
                    id="demo-list-checkbox-item-2"
                    checked />
            <div class="rs-checkbox__background">
              <svg class="rs-checkbox__checkmark"
                    viewBox="0 0 24 24">
                <path class="rs-checkbox__checkmark-path"
                      fill="none"
                      d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
              </svg>
              <div class="rs-checkbox__mixedmark"></div>
            </div>
          </div>
    </span>
    <label class="rs-list-item__text" for="demo-list-checkbox-item-2">Option 2</label>
  </li>
  <li class="rs-list-item" role="checkbox" aria-checked="false">
    <span class="rs-list-item__graphic">
        <div class="rs-checkbox">
            <input type="checkbox"
                    class="rs-checkbox__native-control"
                    id="demo-list-checkbox-item-3" />
            <div class="rs-checkbox__background">
              <svg class="rs-checkbox__checkmark"
                    viewBox="0 0 24 24">
                <path class="rs-checkbox__checkmark-path"
                      fill="none"
                      d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
              </svg>
              <div class="rs-checkbox__mixedmark"></div>
            </div>
          </div>
    </span>
    <label class="rs-list-item__text" for="demo-list-checkbox-item-3">Option 3</label>
  </li>
</ul>
```

The `selectedIndex` (that proxies foundation's `setSelectedState()`) accepts list of indexes in array format for list with checkbox items to set the selection state. It overwrites the current state with new selected state.

## Style Customization

### CSS Classes

CSS Class | Description
--- | ---
`rs-list` | Mandatory, for the list element.
`rs-list--non-interactive` | Optional, disables interactivity affordances.
`rs-list--dense` | Optional, styles the density of the list, making it appear more compact.
`rs-list--avatar-list` | Optional, configures the leading tiles of each row to display images instead of icons. This will make the graphics of the list items larger.
`rs-list--two-line` | Optional, modifier to style list with two lines (primary and secondary lines).
`rs-list-item` | Mandatory, for the list item element.
`rs-list-item__text` |	Mandatory. Wrapper for list item text content (displayed as middle column of the list item).
`rs-list-item__primary-text` | Optional, primary text for the list item. Should be the child of `rs-list-item__text`.
`rs-list-item__secondary-text` | Optional, secondary text for the list item. Displayed below the primary text. Should be the child of `rs-list-item__text`.
`rs-list-item--disabled` | Optional, styles the row in the disabled state.
`rs-list-item--selected` | Optional, styles the row in the selected* state.
`rs-list-item--activated` | Optional, styles the row in the activated* state.
`rs-list-item__graphic` | Optional, the first tile in the row (in LTR languages, the first column of the list item). Typically an icon or image.
`rs-list-item__meta`	| Optional, the last tile in the row (in LTR languages, the last column of the list item). Typically small text, icon. or image.
`rs-list-group` | Optional, wrapper around two or more rs-list elements to be grouped together.
`rs-list-group__subheader` |	Optional, heading text displayed above each list in a group.
`rs-list-divider` | Optional, for list divider element.
`rs-list-divider--padded` | Optional, leaves gaps on each side of divider to match padding of `list-item__meta`.
`rs-list-divider--inset` | Optional, increases the leading margin of the divider so that it does not intersect the avatar column.

> NOTE: The `rs-list-divider` class can be used between list items *OR* between two lists (see respective examples under [List Dividers](#list-dividers)).

> NOTE: In Material Design, the selected and activated states apply in different, mutually-exclusive situations:
> * *Selected* state should be applied on the `.rs-list-item` when it is likely to frequently change due to user choice. E.g., selecting one or more photos to share in Google Photos.
> * *Activated* state is more permanent than selected state, and will **NOT** change soon relative to the lifetime of the page. Common examples are navigation components such as the list within a navigation drawer.

### Sass Mixins

Mixin | Description
--- | ---
`rs-list-item-primary-text-ink-color($color)` | Sets the ink color of the primary text of the list item.
`rs-list-item-secondary-text-ink-color($color)` | Sets the ink color of the secondary text of the list item.
`rs-list-item-graphic-fill-color($color)` | Sets background ink color of the graphic element within list item.
`rs-list-item-graphic-ink-color($color)` | Sets ink color of the graphic element within list item.
`rs-list-item-meta-ink-color($color)` | Sets ink color of the meta element within list item.
`rs-list-item-shape-radius($radius, $rtl-reflexive)` | Sets the rounded shape to list item with given radius size. Set `$rtl-reflexive` to true to flip radius values in RTL context, defaults to false.
`rs-list-divider-color($color)` | Sets divider ink color.
`rs-list-group-subheader-ink-color($color)` | Sets ink color of subheader text within list group.

### Accessibility

The rsList JavaScript component implements the WAI-ARIA best practices for
[Listbox](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox). This includes overriding the default tab behavior
within the list component.

The `tabindex` should be set to `0` for first list item element or selected list item element, remaining list item elements should not have `tabindex` set.

Use `role="listbox"` only for single selection list, without this role the `ul` element is implicitely `role="list"`.
Do not use `aria-orientation` attribute for standard list (i.e., `role="list"`), use component's `vertical` property to set the orientation
to vertical.

As the user navigates through the list, any `button` and `a` elements within the list will receive `tabindex="-1"` when
the list item is not focused. When the list item receives focus, the aforementioned elements will receive
`tabIndex="0"`. This allows for the user to tab through list item elements and then tab to the first element after the
list. The `Arrow`, `Home`, and `End` keys should be used for navigating internal list elements. If
`singleSelection=true`, the list will allow the user to use the `Space` or `Enter` keys to select or deselect a list
item. The rsList will perform the following actions for each key press. Since list interaction will toggle a radio
button or checkbox within the list item, the list will not toggle `tabindex` for those elements.

Any disabled list items (with the `rs-list-item--disabled` class applied) will be excluded from keyboard navigation.

Key | Action
--- | ---
`ArrowUp` | When the list is in a vertical orientation, it will cause the previous list item to receive focus.
`ArrowDown` | When the list is in a vertical orientation, it will cause the next list item to receive focus.
`ArrowLeft` | When the list is in a horizontal orientation (default), it will cause the previous list item to receive focus.
`ArrowRight` | When the list is in a horizontal orientation (default), it will cause the next list item to receive focus.
`Home` | Will cause the first list item in the list to receive focus.
`End` | Will cause the last list item in the list to receive focus.
`Space` | Will cause the currently focused list item to become selected/deselected if `singleSelection=true`.
`Enter` | Will cause the currently focused list item to become selected/deselected if `singleSelection=true`.


## `rsList` Properties and Methods

Property | Value Type | Description
--- | --- | ---
`vertical` | `boolean` (write-only) | Proxies to the foundation's `setVerticalOrientation()` method.
`listElements` | `Array<Element>` (read-only) | Returns all enabled list item elements.
`wrapFocus` | `boolean` (write-only) | Proxies to the foundation's `setWrapFocus()` method.
`singleSelection` | `boolean` (write-only) | Proxies to the foundation's `setSingleSelection()` method.
`selectedIndex` | `boolean` | Proxies to the foundation's `getSelectedIndex()` and `setSelectedIndex()` methods.

Method Signature | Description
--- | ---
`layout() => void` | Recalculates layout and orientation.
`initializeListType() => void` | Initialize `selectedIndex` value based on pre-selected checkbox list items, single selection or radio.

### Events

Event Name | `event.detail` | Description
--- | --- | ---
`rsList:action` | `{index: number}` | Indicates that a list item with the specified index has been activated.

## Usage within Web Frameworks

If you are using a JavaScript framework, such as React or Angular, you can create a List for your framework. Depending on your needs, you can use the _Simple Approach: Wrapping rs Web Vanilla Components_, or the _Advanced Approach: Using Foundations and Adapters_. Please follow the instructions [here](../../docs/integrating-into-frameworks.md).

### Considerations for Advanced Approach

The `rsListFoundation` expects the HTML to be setup a certain way before being used. This setup is a part of the `layout()` and `singleSelection()` functions within the `index.js`.

#### Setup in `layout()`

The default component requires that every list item receives a `tabindex` value so that it can receive focus
(`li` elements cannot receive focus at all without a `tabindex` value). Any element not already containing a
`tabindex` attribute will receive `tabindex=-1`. The first list item should have `tabindex="0"` so that the
user can find the first element using the `tab` key, but subsequent `tab` keys strokes will cause focus to
skip over the entire list. If the list items contain sub-elements that are focusable (`button` and `a` elements),
these should also receive `tabIndex="-1"`.

```html
<ul id="my-list" class="rs-list">
  <li class="rs-list-item" tabindex="0">
    <span class="rs-list-item__text">Single-line item</span>
    <button tabindex="-1"></button>
  </li>
  <li class="rs-list-item" tabindex="-1">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
  <li class="rs-list-item" tabindex="-1">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
</ul>
```

#### Setup in `singleSelection()`

When implementing a component that will use the single selection variant, the HTML should be modified to include
the `aria-selected` attribute, the `rs-list-item--selected` or `rs-list-item--activated` class should be added,
and the `tabindex` of the selected element should be `0`. The first list item should have the `tabindex` updated
to `-1`. The foundation method `setSelectedIndex()` should be called with the initially selected element immediately
after the foundation is instantiated.

```html
<ul id="my-list" class="rs-list">
  <li class="rs-list-item" tabindex="-1">
    <span class="rs-list-item__text">Single-line item</span>
    <button tabindex="-1"></button>
    </li>
  <li class="rs-list-item rs-list-item--selected" aria-selected="true" tabindex="0">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
  <li class="rs-list-item" tabindex="-1">
    <span class="rs-list-item__text">Single-line item</span>
  </li>
</ul>
```

### `RSListAdapter`

Method Signature | Description
--- | ---
`getListItemCount() => Number` | Returns the total number of list items (elements with `rs-list-item` class) that are direct children of the `root_` element.
`getFocusedElementIndex() => Number` | Returns the `index` value of the currently focused element.
`getListItemIndex(ele: Element) => Number` | Returns the `index` value of the provided `ele` element.
`setAttributeForElementIndex(index: Number, attr: String, value: String) => void` | Sets the `attr` attribute to `value` for the list item at `index`.
`addClassForElementIndex(index: Number, className: String) => void` | Adds the `className` class to the list item at `index`.
`removeClassForElementIndex(index: Number, className: String) => void` | Removes the `className` class to the list item at `index`.
`focusItemAtIndex(index: Number) => void` | Focuses the list item at the `index` value specified.
`setTabIndexForListItemChildren(index: Number, value: Number) => void` | Sets the `tabindex` attribute to `value` for each child button or anchor element in the list item at the `index` specified.
`hasRadioAtIndex(index: number) => boolean` | Returns true if radio button is present at given list item index.
`hasCheckboxAtIndex(index: number) => boolean` | Returns true if checkbox is present at given list item index.
`isCheckboxCheckedAtIndex(index: number) => boolean` | Returns true if checkbox inside a list item is checked.
`setCheckedCheckboxOrRadioAtIndex(index: number, isChecked: boolean) => void` | Sets the checked status of checkbox or radio at given list item index.
`notifyAction(index: number) => void` | Notifies user action on list item including keyboard and mouse actions.
`isFocusInsideList() => boolean` | Returns true if the current focused element is inside list root.

### `RSListFoundation`

Method Signature | Description
--- | ---
`setWrapFocus(value: Boolean) => void` | Sets the list to allow the up arrow on the first element to focus the last element of the list and vice versa.
`setVerticalOrientation(value: Boolean) => void` | Sets the list to an orientation causing the keys used for navigation to change. `true` results in the Up/Down arrow keys being used. `false` results in the Left/Right arrow keys being used.
`setSingleSelection(value: Boolean) => void` | Sets the list to be a selection list. Enables the `enter` and `space` keys for selecting/deselecting a list item.
`getSelectedIndex() => RSListIndex` | Gets the current selection state by returning selected index or list of indexes for checkbox based list. See [types.ts](./types.ts) for `RSListIndex` type definition.
`setSelectedIndex(index: RSListIndex) => void` | Sets the selection state to given index or list of indexes if it is checkbox based list. See [types.ts](./types.ts) for `RSListIndex` type definition.
`setUseActivatedClass(useActivated: boolean) => void` | Sets the selection logic to apply/remove the `rs-list-item--activated` class.
`handleFocusIn(evt: Event) => void` | Handles the changing of `tabindex` to `0` for all button and anchor elements when a list item receives focus.
`handleFocusOut(evt: Event) => void` | Handles the changing of `tabindex` to `-1` for all button and anchor elements when a list item loses focus.
`handleKeydown(evt: Event) => void` | Handles determining if a focus action should occur when a key event is triggered.
`handleClick(evt: Event) => void` | Handles toggling the selected/deselected state for a list item when clicked. This method is only used by the single selection list.
`focusNextElement(index: number) => number` | Handles focusing the next element using the current `index`. Returns focused element index.
`focusPrevElement(index: number) => number` | Handles focusing the previous element using the current `index`. Returns focused element index.
`focusFirstElement() => number` | Handles focusing the first element in a list. Returns focused element index.
`focusLastElement() => number` | Handles focusing the last element in a list. Returns focused element index.
