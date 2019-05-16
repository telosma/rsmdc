# List

## example
### default list
```html
<x-list>
  <list-item>
    <list-graphic>graphic<list-graphic>
    <list-text>text</list-text>
    <list-meta>meta<list-meta>
  </list-item>
</x-list>
```
### two-line text list
```html
<x-list>
  <list-item>
    <list-text>
      <list-primary>primary</list-primary>
      <list-secondary>secondary</list-senodary>
    </list-text>
  </list-item>
</x-list>
```
```scss
x-list {
 @include rs-list-type(two-line);
}
```
### avatar dense list
```html
<x-list>
  <list-item>
    <list-graphic>graphic</list-graphic>
    <list-text>text</list-text>
  </list-item>
</x-list>
```
```scss
x-list {
  @include rs-list-type(avatar, dense);
}
```
### group list
```html
<x-list-group>
  <x-list>
    <list-subheader>list1</list-subheader>
    <list-item>
      <list-text>text</list-text>
    </list-item>
    <list-item>
      <list-text>text</list-text>
    </list-item>
    <list-divider></list-divider>
    <list-subheader>list2</list-subheader>
    <list-item>
      <list-text>text</list-text>
    </list-item>
    <list-item>
      <list-text>text</list-text>
    </list-item>
  </x-list>
</x-list-group>
```
## feature
### custom elements
* `x-list-group`
* `x-list`
  * `list-item`
    * `list-graphic`
    * `list-text`
      * `list-primary`
      * `list-secondary`
    * `list-meta`
  * `list-subheader`
  * `list-divider`

### attributes
* selected
* activated
* disabled

### mixins
* rs-list-type($types...)
* rs-list-item-primary-text-color($color)  
and more...

### types
#### list
* one-line (default)
* two-line
* avatar-list
* dense

#### divider
* inset
* padded

#### graphic
* circle
* rectangle
* square