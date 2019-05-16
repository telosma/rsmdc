# Button
## example
### default button
```html
<x-button>submit</x-button>
```
### raised button
```html
<x-button>submit</x-button>
```
```scss
x-button {
  @include rs-button-type(raised);  
}
```  
### button with icon
```html
<x-button>submit</x-button>
```
```scss
x-button {
  @include rs-button-icon($url, $position);
}
```

## feature
### custom elements
* `x-button`

### attributes
* disabled
### mixins
* rs-button-type($type, $dense: normal)
* rs-button-horizontal-padding($padding)  
* rs-button-icon($url, $position: left, $size: 18px, $repeat: no-repeat)  
  and more...
### button types
* flat (default)
* raised
* unelevated
* outlined
* dense
