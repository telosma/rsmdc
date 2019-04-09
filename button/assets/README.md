<!--docs:
title: "Buttons"
layout: detail
section: components
excerpt: "Material Design-styled buttons."
iconId: button
path: /catalog/buttons/
-->

# Buttons

<!--<div class="article__asset">
  <a class="article__asset-link"
     href="https://material-components.github.io/material-components-web-catalog/#/component/button">
    <img src="{{ site.rootpath }}/images/mdc_web_screenshots/buttons.png" width="363" alt="Buttons screenshot">
  </a>
</div>-->

Buttons allow users to take actions, and make choices, with a single tap.

## Design & API Documentation

<ul class="icon-list">
  <li class="icon-list-item icon-list-item--spec">
    <a href="https://material.io/go/design-buttons">Material Design guidelines: Buttons</a>
  </li>
  <li class="icon-list-item icon-list-item--link">
    <a href="https://material-components.github.io/material-components-web-catalog/#/component/button">Demo</a>
  </li>
</ul>

## Installation

```
npm install @material/button
```

## Basic Usage

### HTML Structure

```html
<button class="rs-button">
  <span class="rs-button__label">Button</span>
</button>
```

> _NOTE_: Examples here use the generic `<button>`, but users can also apply the `rs-button` class to `<a>` elements.

### Styles

```scss
@import "@material/button/rs-button";
```

### JavaScript Instantiation

The button will work without JavaScript, but you can enhance it to have a ripple effect by instantiating `RSRipple` on the root element. See [RS Ripple](../rs-ripple) for details.

```js
import {RSRipple} from '@material/ripple';

const buttonRipple = new RSRipple(document.querySelector('.rs-button'));
```

> See [Importing the JS component](../../docs/importing-js.md) for more information on how to import JavaScript.

## Variants

### Contained Button

To style a contained button, add the `rs-button--raised` class to the `<button>` element for a contained button with elevation, or the `rs-button--unelevated` class for a contained button flush with the surface.

### Outlined Button

To style an outlined button, add the class `rs-button--outlined` to the `<button>` element.

### Icons

We recommend using [Material Icons](https://material.io/tools/icons/) from Google Fonts:

```html
<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
```

However, you can also use SVG, [Font Awesome](https://fontawesome.com/), or any other icon library you wish.

To add an icon, add an element with the `rs-button__icon` class inside the button element and set the attribute `aria-hidden="true"`. The icon is set to 18px to meet legibility requirements.

```html
<button class="rs-button">
  <i class="material-icons rs-button__icon" aria-hidden="true">favorite</i>
  <span class="rs-button__label">Button</span>
</button>
```

It's also possible to use an SVG icon:

```html
<button class="rs-button">
  <svg class="rs-button__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="...">
  ...
  </svg>
  <span class="rs-button__label">Button</span>
</button>
```

#### Trailing Icon

Certain icons make more sense to appear after the button's text label rather than before. This can be accomplished by
putting the icon markup _after_ the `rs-button__label` element.

```html
<button class="rs-button">
  <span class="rs-button__label">Button</span>
  <i class="material-icons rs-button__icon" aria-hidden="true">favorite</i>
</button>
```

> _NOTE_: The `rs-button__label` element is _required_ in order for the trailing icon to be styled appropriately.

### Disabled

To disable a button, add the `disabled` attribute directly to the `<button>`, or set the `disabled` attribute on the `<fieldset>` containing the button.
Disabled buttons cannot be interacted with and have no visual interaction effect.

```html
<button class="rs-button" disabled>
  <span class="rs-button__label">Button</span>
</button>
```

## Style Customization

### CSS Classes

CSS Class | Description
--- | ---
`rs-button` | Mandatory. Defaults to a text button that is flush with the surface.
`rs-button--raised` | Optional. Styles a contained button that is elevated above the surface.
`rs-button--unelevated` | Optional. Styles a contained button that is flush with the surface.
`rs-button--outlined` | Optional. Styles an outlined button that is flush with the surface.
`rs-button--dense` | Optional. Makes the button text and container slightly smaller.
`rs-button__label` | Recommended.\* Indicates the element containing the button's text label.
`rs-button__icon` | Optional. Indicates the element containing the button's icon.

> \*_NOTE_: The `rs-button__label` element is required for buttons with a trailing icon, but it is currently optional for
> buttons with no icon or a leading icon. In the latter cases, it is acceptable for the text label to simply exist
> directly within the `rs-button` element.
> However, the `rs-button__label` class may become mandatory for all cases in the future, so it is recommended to
> always include it to be future-proof.

### Sass Mixins

To customize a button's color and properties, you can use the following mixins.

#### Basic Sass Mixins

RS Button uses [RS Theme](../rs-theme)'s `primary` color by default. Use the following mixins to customize it.

Mixin | Description
--- | ---
`rs-button-filled-accessible($container-fill-color)` | Sets the container fill color for a contained (_raised_ or _unelevated_) button, and updates the button's ink, icon, and ripple colors to meet accessibility standards

#### Advanced Sass Mixins

These mixins will override the color of the container, ink, outline or ripple. It is up to you to ensure your button meets accessibility standards.

Mixin | Description
--- | ---
`rs-button-container-fill-color($color)` | Sets the container fill color to the given color.
`rs-button-icon-color($color)` | Sets the icon color to the given color.
`rs-button-ink-color($color)` | Sets the ink color to the given color, and sets the icon color to the given color unless `rs-button-icon-color` is also used.
`rs-button-shape-radius($radius, $rtl-reflexive)` | Sets rounded shape to button with given radius size. Set `$rtl-reflexive` to true to flip radius values in RTL context, defaults to false.
`rs-button-horizontal-padding($padding)` | Sets horizontal padding to the given number.
`rs-button-outline-color($color)` | Sets the outline color to the given color.
`rs-button-outline-width($width, $padding)` | Sets the outline width to the given number (defaults to 2px) and adjusts padding accordingly. `$padding` is only required in cases where `rs-button-horizontal-padding` is also included with a custom value.

##### Caveat: Edge and CSS Custom Properties

In browsers that fully support CSS custom properties, the above mixins will work if you pass in a [RS Theme](../rs-theme) property (e.g. `primary`) as an argument. However, Edge does not fully support CSS custom properties. If you are using the `rs-button-container-fill-color` mixin, you must pass in an actual color value for support in Edge.
