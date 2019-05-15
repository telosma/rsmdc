# Top app bar
## example
### normal top-app-bar
```html
<x-app-bar>
  <app-bar-nav>
    <i>icon</ic>
  </app-bar-nav>
  <h1>title<h1>
  <app-bar-actions>
    <i>icon1</i>
    <i>icon2</i>
  </app-bar-actions>
<x-app-bar>
```
### fixed top-app-bar
```html
<x-app-bar>
  <app-bar-nav>
    <i>icon</ic>
  </app-bar-nav>
  <h1>title<h1>
  <app-bar-actions>
    ...
  </app-bar-actions>
<x-app-bar>
```
required
* `x-app-bar`
  * @include rs-top-app-bar-type(fixed);  
### prominent dense top-app-bar
```html
<x-app-bar>
  <app-bar-nav>
    <i>icon</ic>
  </app-bar-nav>
  <h1>title<h1>
  <app-bar-actions>
    ...
  </app-bar-actions>
<x-app-bar>
```
required
* `x-app-bar`
  * @include rs-top-app-bar-type(prominent, dense);

## feature
### custom elements
  * `x-app-bar`
    * `app-bar-nav`
    * `app-bar-actions`

### attributes
### mixins
* rs-top-app-bar-type($types...)
* rs-top-app-bar-ink-color($color)  
  ...