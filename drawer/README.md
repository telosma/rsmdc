<!--docs:
title: "Drawers"
layout: detail
section: components
excerpt: "Permanent, dismissible, and modal drawers."
iconId: side_navigation
path: /catalog/drawers/
-->

# Drawers

The RS Navigation Drawer is used to organize access to destinations and other functionality on an app.

## Design & API Documentation

<ul class="icon-list">
  <li class="icon-list-item icon-list-item--spec">
    <a href="https://material.io/go/design-navigation-drawer">Material Design guidelines: Navigation drawer</a>
  </li>
  <li class="icon-list-item icon-list-item--link">
    <a href="https://material-components.github.io/material-components-web-catalog/#/component/drawer">Demo</a>
  </li>
</ul>

## Installation

```
npm install @material/drawer
```

### HTML Structure

```html
<aside class="rs-drawer">
  <div class="rs-drawer__content">
    <nav class="rs-list">
      <a class="rs-list-item rs-list-item--activated" href="#" aria-selected="true">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">inbox</i>
        <span class="rs-list-item__text">Inbox</span>
      </a>
      <a class="rs-list-item" href="#">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">send</i>
        <span class="rs-list-item__text">Outgoing</span>
      </a>
      <a class="rs-list-item" href="#">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">drafts</i>
        <span class="rs-list-item__text">Drafts</span>
      </a>
    </nav>
  </div>
</aside>
```

#### Icons

We recommend using [Material Icons](https://material.io/tools/icons/) from Google Fonts:

```html
<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
```

However, you can also use SVG, [Font Awesome](https://fontawesome.com/), or any other icon library you wish.

### Styles

```scss
@import "@material/drawer/rs-drawer";
@import "@material/list/rs-list";
```

### JavaScript Instantiation

For permanently visible drawer, the list must be instantiated for appropriate keyboard interaction:

```js
import {RSList} from "@material/list";
const list = RSList.attachTo(document.querySelector('.rs-list'));
list.wrapFocus = true;
```

Other variants use the `RSDrawer` component, which will instantiate `RSList` automatically:

```js
import {RSDrawer} from "@material/drawer";
const drawer = RSDrawer.attachTo(document.querySelector('.rs-drawer'));
```

## Variants

### Drawer with separate list groups

```html
<aside class="rs-drawer">
  <div class="rs-drawer__content">
    <nav class="rs-list">
      <a class="rs-list-item rs-list-item--activated" href="#" aria-selected="true">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">inbox</i>
        <span class="rs-list-item__text">Inbox</span>
      </a>
      <a class="rs-list-item" href="#">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">star</i>
        <span class="rs-list-item__text">Star</span>
      </a>
      <a class="rs-list-item" href="#">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">send</i>
        <span class="rs-list-item__text">Sent Mail</span>
      </a>
      <a class="rs-list-item" href="#">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">drafts</i>
        <span class="rs-list-item__text">Drafts</span>
      </a>

      <hr class="rs-list-divider">
      <h6 class="rs-list-group__subheader">Labels</h6>
      <a class="rs-list-item" href="#">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">bookmark</i>
        <span class="rs-list-item__text">Family</span>
      </a>
      <a class="rs-list-item" href="#">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">bookmark</i>
        <span class="rs-list-item__text">Friends</span>
      </a>
      <a class="rs-list-item" href="#">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">bookmark</i>
        <span class="rs-list-item__text">Work</span>
      </a>
    </nav>
  </div>
</aside>
```

### Drawer with Header

Drawers can contain a header element which will not scroll with the rest of the drawer content. Things like account switchers and titles should live in the header element.

```html
<aside class="rs-drawer">
  <div class="rs-drawer__header">
    <h3 class="rs-drawer__title">Mail</h3>
    <h6 class="rs-drawer__subtitle">email@material.io</h6>
  </div>
  <div class="rs-drawer__content">
    <nav class="rs-list">
      <a class="rs-list-item rs-list-item--activated" href="#" aria-selected="true">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">inbox</i>
        <span class="rs-list-item__text">Inbox</span>
      </a>
      <a class="rs-list-item" href="#">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">send</i>
        <span class="rs-list-item__text">Outgoing</span>
      </a>
      <a class="rs-list-item" href="#">
        <i class="material-icons rs-list-item__graphic" aria-hidden="true">drafts</i>
        <span class="rs-list-item__text">Drafts</span>
      </a>
    </nav>
  </div>
</aside>
```

### Dismissible Drawer

Dismissible drawers are by default hidden off screen, and can slide into view. Dismissible drawers should be used when navigation is not common, and the main app content is prioritized.

```html
<body>
  <aside class="rs-drawer rs-drawer--dismissible">
    <div class="rs-drawer__content">
      <nav class="rs-list">
        <a class="rs-list-item rs-list-item--activated" href="#" aria-selected="true">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">inbox</i>
          <span class="rs-list-item__text">Inbox</span>
        </a>
        <a class="rs-list-item" href="#">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">send</i>
          <span class="rs-list-item__text">Outgoing</span>
        </a>
        <a class="rs-list-item" href="#">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">drafts</i>
          <span class="rs-list-item__text">Drafts</span>
        </a>
      </nav>
    </div>
  </aside>

  <div class="rs-drawer-app-content">
    App Content
  </div>
</body>
```

> Apply the `rs-drawer-app-content` class to the sibling element after the drawer for the open/close animations to work.

#### Usage with Top App Bar

##### Dismissible Drawer Full Height Drawer

In cases where the drawer occupies the full viewport height, some styles must be applied to get the dismissible drawer and the content below the top app bar to independently scroll and work in all browsers.

In the following example, the `rs-drawer__content` and `main-content` elements should scroll independently of each other. The `rs-drawer--dismissible` and `rs-drawer-app-content` elements should then sit side-by-side. The markup looks something like this:

```html
<body>
  <aside class="rs-drawer rs-drawer--dismissible">
    <div class="rs-drawer__content">
      <div class="rs-list">
        <a class="rs-list-item rs-list-item--activated" href="#" aria-selected="true">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">inbox</i>
          <span class="rs-list-item__text">Inbox</span>
        </a>
        <a class="rs-list-item" href="#">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">send</i>
          <span class="rs-list-item__text">Outgoing</span>
        </a>
        <a class="rs-list-item" href="#">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">drafts</i>
          <span class="rs-list-item__text">Drafts</span>
        </a>
      </div>
    </div>
  </aside>

  <div class="rs-drawer-app-content">
    <header class="rs-top-app-bar app-bar" id="app-bar">
      <div class="rs-top-app-bar__row">
        <section class="rs-top-app-bar__section rs-top-app-bar__section--align-start">
          <a href="#" class="demo-menu material-icons rs-top-app-bar__navigation-icon">menu</a>
          <span class="rs-top-app-bar__title">Dismissible Drawer</span>
        </section>
      </div>
    </header>

    <main class="main-content" id="main-content">
      <div class="rs-top-app-bar--fixed-adjust">
        App Content
      </div>
    </main>
  </div>
</body>
```

##### Dismissible Drawer Below Top App Bar

In cases where the drawer appears below the top app bar you will want to follow the markup shown below. The `rs-drawer__content` and `main-content` elements will also scroll independently of each other. The `rs-top-app-bar`, `rs-drawer` and `rs-drawer-app-content` will be sibling to each other. The `rs-top-app-bar--fixed-adjust` helper class will be applied to `rs-drawer` and `rs-drawer-app-content` elements to adjust the position with top app bar.

```html
<body>
  <header class="rs-top-app-bar app-bar" id="app-bar">
    <div class="rs-top-app-bar__row">
      <section class="rs-top-app-bar__section rs-top-app-bar__section--align-start">
        <a href="#" class="demo-menu material-icons rs-top-app-bar__navigation-icon">menu</a>
        <span class="rs-top-app-bar__title">Dismissible Drawer</span>
      </section>
    </div>
  </header>
  <aside class="rs-drawer rs-drawer--dismissible rs-top-app-bar--fixed-adjust">
    <div class="rs-drawer__content">
      <div class="rs-list">
        <a class="rs-list-item rs-list-item--activated" href="#" aria-selected="true">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">inbox</i>
          <span class="rs-list-item__text">Inbox</span>
        </a>
        <a class="rs-list-item" href="#">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">send</i>
          <span class="rs-list-item__text">Outgoing</span>
        </a>
        <a class="rs-list-item" href="#">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">drafts</i>
          <span class="rs-list-item__text">Drafts</span>
        </a>
      </div>
    </div>
  </aside>

  <div class="rs-drawer-app-content rs-top-app-bar--fixed-adjust">
    <main class="main-content" id="main-content">
      App Content
    </main>
  </div>
</body>
```

The CSS to match either case looks like this:

```scss
// Note: these styles do not account for any paddings/margins that you may need.

body {
  display: flex;
  height: 100vh;
}

.rs-drawer-app-content {
  flex: auto;
  overflow: auto;
  position: relative;
}

.main-content {
  overflow: auto;
  height: 100%;
}

.app-bar {
  position: absolute;
}

// only apply this style if below top app bar
.rs-top-app-bar {
  z-index: 7;
}
```

The JavaScript to toggle the drawer when the navigation button is clicked looks like this:

```js
import {RSTopAppBar} from "@material/top-app-bar";
const topAppBar = RSTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('RSTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});
```

### Modal Drawer

Modal drawers are elevated above most of the app's UI and don't affect the screen's layout grid.

```html
<body>
  <aside class="rs-drawer rs-drawer--modal">
    <div class="rs-drawer__content">
      <nav class="rs-list">
        <a class="rs-list-item rs-list-item--activated" href="#" aria-selected="true">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">inbox</i>
          <span class="rs-list-item__text">Inbox</span>
        </a>
        <a class="rs-list-item" href="#">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">send</i>
          <span class="rs-list-item__text">Outgoing</span>
        </a>
        <a class="rs-list-item" href="#">
          <i class="material-icons rs-list-item__graphic" aria-hidden="true">drafts</i>
          <span class="rs-list-item__text">Drafts</span>
        </a>
      </nav>
    </div>
  </aside>

  <div class="rs-drawer-scrim"></div>
  <div>Main Content</div>
</body>
```

> The `rs-drawer-scrim` next sibling element is **required**, to protect the app's UI from interactions while the modal drawer is open.

## Style Customization

### CSS Classes

Class | Description
--- | ---
`rs-drawer` |  Mandatory.
`rs-drawer__header` | Non-scrollable element that exists at the top of the drawer.
`rs-drawer__content` | Scrollable content area of the drawer.
`rs-drawer__title` | Title text element of the drawer.
`rs-drawer__subtitle` | Subtitle text element of the drawer.
`rs-drawer--dismissible` | Dismissible drawer variant class.
`rs-drawer--modal` | Modal drawer variant class.
`rs-drawer--open` | If present, indicates that the dismissible drawer is in the open position.
`rs-drawer--opening` | Applied while the drawer is animating from the closed to the open position.
`rs-drawer--closing` | Applied while the drawer is animating from the open to the closed position.
`rs-drawer-app-content` | Mandatory for dismissible variant only. Sibling element that is resized when the drawer opens/closes.
`rs-drawer-scrim` | Mandatory for modal variant only. Used for the overlay on the app content.


### Sass Mixins

Mixin | Description
--- | ---
`rs-drawer-border-color($color)` | Sets border color of `rs-drawer` surface.
`rs-drawer-divider-color($color)` | Sets divider color found between list groups.
`rs-drawer-fill-color-accessible($color)` | Sets the fill color to `$color`, and list item and icon ink colors to an accessible color relative to `$color`.
`rs-drawer-surface-fill-color($color)` | Sets the background color of `rs-drawer`.
`rs-drawer-title-ink-color($color)` | Sets the ink color of `rs-drawer__title`.
`rs-drawer-subtitle-ink-color` | Sets drawer subtitle and list subheader ink color.
`rs-drawer-item-icon-ink-color($color)` | Sets drawer list item graphic icon ink color.
`rs-drawer-item-text-ink-color($color)` | Sets drawer list item text ink color.
`rs-drawer-item-activated-icon-ink-color($color)` | Sets activated drawer list item icon ink color.
`rs-drawer-item-activated-text-ink-color($color)` | Sets activated drawer list item text ink color.
`rs-drawer-shape-radius($radius)` | Sets the rounded shape to drawer with given radius size. `$radius` can be single radius or list of 2 radius values for trailing-top and trailing-bottom. Automatically flips the radius values in RTL context.
`rs-drawer-item-shape-radius($radius, $rtl-reflexive)` | Sets the rounded shape to drawer navigation item with given radius size. Set `$rtl-reflexive` to true to flip radius values in RTL context, defaults to true.
`rs-drawer-activated-overlay-color($color)` | Sets the overlay color of the activated drawer list item.
`rs-drawer-scrim-fill-color($color)` | Sets the fill color of `rs-drawer-scrim`.
`rs-drawer-z-index($value)` | Sets the z index of drawer. Drawer stays on top of top app bar except for clipped variant of drawer.
`rs-drawer-width($width)` | Sets the width of the drawer. In the case of the dismissible variant, also sets margin required for `rs-drawer-app-content`.

## Accessibility

### Focus Management

It is recommended to shift focus to the first focusable element in the main content when drawer is closed or one of the destination items is activated. (By default, RS Drawer restores focus to the menu button which opened it.)

#### Dismissible Drawer

Restore focus to the first focusable element when a list item is activated or after the drawer closes. Do not close the drawer upon item activation, since it should be up to the user when to show/hide the dismissible drawer.

```js
const listEl = document.querySelector('.rs-drawer .rs-list');
const mainContentEl = document.querySelector('.main-content');

listEl.addEventListener('click', (event) => {
  mainContentEl.querySelector('input, button').focus();
});

document.body.addEventListener('RSDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});
```

#### Modal Drawer

Close the drawer when an item is activated in order to dismiss the modal as soon as the user performs an action. Only restore focus to the first focusable element in the main content after the drawer is closed, since it's being closed automatically.

```js
const listEl = document.querySelector('.rs-drawer .rs-list');
const mainContentEl = document.querySelector('.main-content');

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

document.body.addEventListener('RSDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});
```

## `RSDrawer` Properties and Methods

Property | Value Type | Description
--- | --- | ---
`open` | Boolean | Proxies to the foundation's `open`/`close` methods. Also returns true if drawer is in the open position.

### Events

Event Name | Event Data Structure | Description
--- | --- | ---
`RSDrawer:opened` | None | Emits when the navigation drawer has opened.
`RSDrawer:closed` | None | Emits when the navigation drawer has closed.

## Usage within Web Frameworks

If you are using a JavaScript framework, such as React or Angular, you can create a Navigation Drawer for your framework. Depending on your needs, you can use the _Simple Approach: Wrapping RS Web Vanilla Components_, or the _Advanced Approach: Using Foundations and Adapters_. Please follow the instructions [here](../../docs/integrating-into-frameworks.md).

### `RSDrawerAdapter`

Method Signature | Description
--- | ---
`addClass(className: string) => void` | Adds a class to the root element.
`hasClass(className: string) => boolean` | Returns true if the root element contains the given `className`.
`removeClass(className: string) => void` | Removes a class from the root element.
`elementHasClass(element: !Element, className: string) => boolean` | Returns true if the an element contains the given class.
`saveFocus() => void` | Saves the focus of currently active element.
`restoreFocus() => void` | Restores focus to element previously saved with 'saveFocus'.
`focusActiveNavigationItem() => void` | Focuses the active / selected navigation item.
`notifyClose() => void` | Emits the `RSDrawer:closed` event.
`notifyOpen() => void` | Emits the `RSDrawer:opened` event.
`trapFocus() => void` | Traps focus on root element and focuses the active navigation element.
`releaseFocus() => void` | Releases focus trap from root element which was set by `trapFocus` and restores focus to where it was prior to calling `trapFocus`.

### Foundations

#### `RSDismissibleDrawerFoundation`

Method Signature | Description
--- | ---
`open() => void` | Opens the drawer from the closed state.
`close() => void` | Closes the drawer from the open state.
`isOpen() => boolean` | Returns true if the drawer is in the open position.
`isOpening() => boolean` | Returns true if the drawer is animating open.
`isClosing() => boolean` | Returns true if the drawer is animating closed.
`handleKeydown(evt: Event) => void` | Handles the `keydown` event.
`handleTransitionEnd(evt: Event) => void` | Handles the `transitionend` event when the drawer finishes opening/closing.

#### `RSModalDrawerFoundation` (extends `RSDismissibleDrawerFoundation`)

Method Signature | Description
--- | ---
`handleScrimClick() => void` | Handles click event on scrim.
