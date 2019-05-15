# Button
## example
### normal button
```html
<x-button>submit</x-button>
```
### raised button
```html
<x-button>submit</x-button>
```
required
* `x-button`
  * @include rs-button-type(raised);  
  
### button with icon
```html
<x-button>
  <button-icon>
  submit
</x-button>
```
required  
* `button-icon`

## feature
### custom elements
  * `x-button`
    * `button-icon` 

### attributes
### mixins
* rs-button-type($type, $dense: normal)
* rs-button-horizontal-padding($padding)  
  ...
