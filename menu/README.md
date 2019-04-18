<!--docs:
title: "Menus"
layout: detail
section: components
excerpt: "Non-cascading Material Design menus."
iconId: menu
path: /catalog/menus/
-->

# Menus

<!--<div class="article__asset">
  <a class="article__asset-link"
     href="https://material-components.github.io/material-components-web-catalog/#/component/menu">
    <img src="{{ site.rootpath }}/images/rs_web_screenshots/menus.png" width="178" alt="Menus screenshot">
  </a>
</div>-->

A menu displays a list of choices on a temporary surface. They appear when users interact with a button, action,
or other control.

## Design & API Documentation

<ul class="icon-list">
  <li class="icon-list-item icon-list-item--spec">
    <a href="https://material.io/go/design-menus">Material Design guidelines: Menus</a>
  </li>
  <li class="icon-list-item icon-list-item--link">
    <a href="https://material-components.github.io/material-components-web-catalog/#/component/menu">Demo</a>
  </li>
</ul>

## Installation

```
npm install @rsmdc/menu
```

## Basic Usage

### HTML Structure

```html
<div class="rs-menu rs-menu-surface" tabindex="-1">
  <ul class="rs-list" role="menu" aria-hidden="true" aria-orientation="vertical">
    <li class="rs-list-item" role="menuitem">
      <span class="rs-list-item__text">A Menu Item</span>
    </li>
    <li class="rs-list-item" role="menuitem">
      <span class="rs-list-item__text">Another Menu Item</span>
    </li>
  </ul>
</div>
```

### Styles

```scss
@import "@rsmdc/list/rs-list";
@import "@rsmdc/menu-surface/rs-menu-surface";
@import "@rsmdc/menu/rs-menu";
```

### JavaScript Instantiation

```js
import {RSMenu} from '@rsmdc/menu';

const menu = new RSMenu(document.querySelector('.rs-menu'));
menu.open = true;
```

> See [Importing the JS component](../../docs/importing-js.md) for more information on how to import JavaScript.

## Variants

### Selection Group Menu

Menus can contain a group of list items that can represent the selection state of elements within the group.

```html
<div class="rs-menu rs-menu-surface" tabindex="-1" id="demo-menu">
  <ul class="rs-list" role="menu" aria-hidden="true" aria-orientation="vertical">
    <li>
      <ul class="rs-menu__selection-group">
        <li class="rs-list-item" role="menuitem">
          <span class="rs-list-item__graphic rs-menu__selection-group-icon">
            ...
          </span>
          <span class="rs-list-item__text">Single</span>
        </li>
        <li class="rs-list-item" role="menuitem">
          <span class="rs-list-item__graphic rs-menu__selection-group-icon">
           ...
          </span>
          <span class="rs-list-item__text">1.15</span>
        </li>
      </ul>
    </li>
    <li class="rs-list-divider" role="separator"></li>
    <li class="rs-list-item" role="menuitem">
      <span class="rs-list-item__text">Add space before paragraph</span>
    </li>
    ...
  </ul>
</div>
```

### Disabled Menu Items

Menu items can be disabled by adding the `rs-list-item--disabled` modifier class (from [RS List](../rs-list)).
Disabled menu items will be excluded from keyboard navigation.

### Anchors and Positioning

#### Anchored To Parent

The menu can be positioned to automatically anchor to a parent element when opened.

```html
<div id="toolbar" class="toolbar rs-menu-surface--anchor">
  <div class="rs-menu rs-menu-surface">
  ...
  </div>
</div>
```

#### Anchor To Element Within Wrapper

The menu can be positioned to automatically anchor to another element, by wrapping the other element with the anchor class.

```html
<div id="demo-menu" class="rs-menu-surface--anchor">
  <button id="menu-button">Open Menu</button>
  <div class="rs-menu rs-menu-surface">
  ...
  </div>
</div>
```

#### Fixed Position

The menu can use fixed positioning when being displayed.

```html
<div class="rs-menu rs-menu-surface">
...
</div>
```

```js
// ...
menu.setFixedPosition(true);
```

#### Absolute Position

The menu can use absolutely positioned when being displayed.

```html
<div class="rs-menu rs-menu-surface">
...
</div>
```

```js
// ...
menu.hoistMenuToBody(); // Not required if the menu is already positioned on the body.
menu.setAbsolutePosition(100, 100);
```

## Style Customization

### CSS Classes

CSS Class | Description
--- | ---
`rs-menu` | Required on the root element
`rs-menu-surface` | Required on the root element. See [`rs-menu-surface` documentation](../rs-menu-surface) for other `rs-menu-surface` classes.
`rs-list` | Required on the nested `ul` element. See [`rs-list` documentation](../rs-list) for other `rs-list` classes.
`rs-menu__selection-group` | Used to wrap a group of `rs-list-item` elements that will represent a selection group.
`rs-menu__selection-group-icon` | Required when using a selection group to indicate which item is selected. Should contain an icon or svg that indicates the selected state of the list item.
`rs-menu-item--selected` | Used to indicate which element in a selection group is selected.

### Sass Mixins

Mixin | Description
--- | ---
`rs-menu-width($width)` | Used to set the `width` of the menu. When used without units (e.g. `4` or `5`) it computes the `width` by multiplying by the base width (`56px`). When used with units (e.g. `240px`, `15%`, or `calc(200px + 10px)` it sets the `width` to the exact value provided.

> See [Menu Surface](../rs-menu-surface/README.md#sass-mixins) and [List](../rs-list/README.md#sass-mixins) documentation for additional style customization options.

## `RSMenu` Properties and Methods

See [Importing the JS component](../../docs/importing-js.md) for more information on how to import JavaScript.

Property | Value Type | Description
--- | --- | ---
`open` | Boolean | Proxies to the menu surface's `open` property.
`items` | Array<Element> | Proxies to the list to query for all `.rs-list-item` elements.
`quickOpen` | Boolean | Proxies to the menu surface `quickOpen` property.
`wrapFocus` | Boolean | Proxies to list's `wrapFocus` property.

Method Signature | Description
--- | ---
`setAnchorCorner(Corner) => void` | Proxies to the menu surface's `setAnchorCorner(Corner)` method.
`setAnchorMargin(Partial<RSMenuDistance>) => void` | Proxies to the menu surface's `setAnchorMargin(Partial<RSMenuDistance>)` method.
`setAbsolutePosition(x: number, y: number) => void` | Proxies to the menu surface's `setAbsolutePosition(x: number, y: number)` method.
`setFixedPosition(isFixed: boolean) => void` | Proxies to the menu surface's `setFixedPosition(isFixed: boolean)` method.
`hoistMenuToBody() => void` | Proxies to the menu surface's `hoistMenuToBody()` method.
`setIsHoisted(isHoisted: boolean) => void` | Proxies to the menu surface's `setIsHoisted(isHoisted: boolean)` method.
`setAnchorElement(element: Element) => void` | Proxies to the menu surface's `setAnchorElement(element)` method.
`getOptionByIndex(index: number) => Element \| null` | Returns the list item at the `index` specified.
`getDefaultFoundation() => RSMenuFoundation` | Returns the foundation.

> See [Menu Surface](../rs-menu-surface/README.md) and [List](../rs-list/README.md) documentation for more information on proxied methods and properties.

## Usage within Web Frameworks

If you are using a JavaScript framework, such as React or Angular, you can create a Menu for your framework. Depending on your needs, you can use the _Simple Approach: Wrapping RS Web Vanilla Components_, or the _Advanced Approach: Using Foundations and Adapters_. Please follow the instructions [here](../../docs/integrating-into-frameworks.md).

### `RSMenuAdapter`

Method Signature | Description
--- | ---
`addClassToElementAtIndex(index: number, className: string) => void` | Adds the `className` class to the element at the `index` specified.
`removeClassFromElementAtIndex(index: number, className: string) => void` | Removes the `className` class from the element at the `index` specified.
`addAttributeToElementAtIndex(index: number, attr: string, value: string) => void` | Adds the `attr` attribute with value `value` to the element at the `index` specified.
`removeAttributeFromElementAtIndex(index: number, attr: string) => void` | Removes the `attr` attribute from the element at the `index` specified.
`elementContainsClass(element: Element, className: string) => boolean` | Returns true if the `element` contains the `className` class.
`closeSurface() => void` | Closes the menu surface.
`getElementIndex(element: Element) => number` | Returns the `index` value of the `element`.
`getParentElement(element: Element) => Element \| null` | Returns the `.parentElement` element of the `element` provided.
`getSelectedElementIndex(element: Element) => number` | Returns the `index` value of the element within the selection group provided, `element` that contains the `rs-menu-item--selected` class.
`notifySelected(index: number) => void` | Emits a `RSMenu:selected` event for the element at the `index` specified.

### `RSMenuFoundation`

Method Signature | Description
--- | ---
`handleKeydown(evt: Event) => void` | Event handler for the `keydown` events within the menu.
`handleItemAction(listItem: Element) => void` | Event handler for list's action event.

### Events

Event Name | Data | Description
--- | --- | ---
`RSMenu:selected` | `{detail: {item: Element, index: number}}` | Used to indicate when an element has been selected. This event also includes the item selected and the list index of that item.
