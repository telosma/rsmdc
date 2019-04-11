<!--docs:
title: "Radio Buttons"
layout: detail
section: components
iconId: radio_button
path: /catalog/input-controls/radio-buttons/
-->

# Radio Buttons

<!--<div class="article__asset">
  <a class="article__asset-link"
     href="https://material-components.github.io/material-components-web-catalog/#/component/radio">
    <img src="{{ site.rootpath }}/images/rs_web_screenshots/radios.png" width="60" alt="Radio buttons screenshot">
  </a>
</div>-->

Radio buttons allow the user to select one option from a set while seeing all available options.

## Design & API Documentation

<ul class="icon-list">
  <li class="icon-list-item icon-list-item--spec">
    <a href="https://material.io/go/design-radio-buttons">Material Design guidelines: Selection Controls – Radio buttons</a>
  </li>
  <li class="icon-list-item icon-list-item--link">
    <a href="https://material-components.github.io/material-components-web-catalog/#/component/radio">Demo</a>
  </li>
</ul>

## Installation

```
npm install @material/radio
```

## Basic Usage

We recommend using RS Radio with [RS Form Field](../rs-form-field) for enhancements such as label alignment, label activation of the ripple interaction effect, and RTL-awareness.

### HTML Structure

```html
<div class="rs-form-field">
  <div class="rs-radio">
    <input class="rs-radio__native-control" type="radio" id="radio-1" name="radios" checked>
    <div class="rs-radio__background">
      <div class="rs-radio__outer-circle"></div>
      <div class="rs-radio__inner-circle"></div>
    </div>
  </div>
  <label for="radio-1">Radio 1</label>
</div>
```

### Styles

```scss
@import "@material/form-field/rs-form-field";
@import "@material/radio/rs-radio";
```

### JavaScript Instantiation

The radio button will work without JavaScript, but you can enhance it with a ripple interaction effect by instantiating `RSRadio` on the `rs-radio` element. To activate the ripple effect upon interacting with the label, you must also instantiate `RSFormField` on the `rs-form-field` element and set the `RSRadio` instance as its `input`.

```js
import {RSFormField} from '@material/form-field';
import {RSRadio} from '@material/radio';

const radio = new RSRadio(document.querySelector('.rs-radio'));
const formField = new RSFormField(document.querySelector('.rs-form-field'));
formField.input = radio;
```

> See [Importing the JS component](../../docs/importing-js.md) for more information on how to import JavaScript.

## Variants

### Disabled

To disable a radio button, add the `rs-radio--disabled` class to the root element and set the `disabled` attribute on the `<input>` element.
Disabled radio buttons cannot be interacted with and have no visual interaction effect.

```html
<div class="rs-form-field">
  <div class="rs-radio rs-radio--disabled">
    <input class="rs-radio__native-control" type="radio" id="radio-1" name="radios" disabled>
    <div class="rs-radio__background">
      <div class="rs-radio__outer-circle"></div>
      <div class="rs-radio__inner-circle"></div>
    </div>
  </div>
  <label for="radio-1">Radio 1</label>
</div>
```

## Style Customization

RS Radio uses [RS Theme](../rs-theme)'s `secondary` color by default. Use the following mixins to customize it.

### Sass Mixins

Mixin | Description
--- | ---
`rs-radio-unchecked-stroke-color($color)` | Sets the stroke color of an unchecked radio button
`rs-radio-checked-stroke-color($color)` | Sets the stroke color of a checked radio button
`rs-radio-ink-color($color)` | Sets the ink color of a radio button
`rs-radio-focus-indicator-color($color)` | Sets the color of the focus indicator

#### Caveat: Edge and CSS Custom Properties

In browsers that fully support CSS custom properties, the above mixins will work if you pass in a [RS Theme](../rs-theme) property (e.g. `primary`) as an argument. However, Edge does not fully support CSS custom properties. If you are using any of the Sass mixins, you must pass in an actual color value for support in Edge.

## `RSRadio` Properties and Methods

Property | Value Type | Description
--- | --- | ---
`checked` | Boolean | Setter/getter for the radio's checked state
`disabled` | Boolean | Setter/getter for the radio's disabled state. Setter proxies to foundation's `setDisabled` method
`value` | String | Setter/getter for the radio's value

## Usage within Web Frameworks

If you are using a JavaScript framework, such as React or Angular, you can create a Radio button for your framework. Depending on your needs, you can use the _Simple Approach: Wrapping RS Web Vanilla Components_, or the _Advanced Approach: Using Foundations and Adapters_. Please follow the instructions [here](../../docs/integrating-into-frameworks.md).

### `RSRadioAdapter`

Method Signature | Description
--- | ---
`setNativeControlDisabled(disabled: boolean) => void` | Sets the input's `disabled` property to the given value
`addClass(className: string) => void` | Adds a class to the root element
`removeClass(className: string) => void` | Removes a class from the root element

### `RSRadioFoundation`

Method Signature | Description
--- | ---
`setDisabled(disabled: boolean) => void` | Sets the disabled value of the native control
