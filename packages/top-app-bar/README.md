# Top app bar
## example
### default top-app-bar
```html
<x-app-bar>
  <app-bar-nav />
  <app-bar-title>title<app-bar-titel>
  <app-bar-actions>
    <app-bar-item>icon1</app-bar-item>
    <app-bar-item>icon2</app-bar-item>
  </app-bar-actions>
<x-app-bar>
```
### fixed top-app-bar
```html
<x-app-bar>
  <app-bar-nav />
  <app-bar-title>title<app-bar-titel>
  <app-bar-actions>
    ...
  </app-bar-actions>
<x-app-bar>
```
```scss
x-app-bar {
  @include rs-top-app-bar-type(fixed);  
}
```
### prominent dense top-app-bar
```html
<x-app-bar>
  <app-bar-nav />
  <app-bar-title>title<app-bar-titel>
  <app-bar-actions>
    ...
  </app-bar-actions>
<x-app-bar>
```
```scss
x-app-bar {
  @include rs-top-app-bar-type(prominent, dense);
}
```
## feature
### custom elements
  * `x-app-bar`
    * `app-bar-nav`
    * `spp-bar-title`
    * `app-bar-actions`
      * `app-bar-item`
### mixins
* rs-top-app-bar-type($types...)
* rs-top-app-bar-ink-color($color)  
  and more...

### top-app-bar types
* normal (default)
* dense
* prominent
* fixed
* short
  * collapsed
