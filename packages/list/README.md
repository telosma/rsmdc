# List

## example

normal list
```html
<x-list>
  <list-item>
    <list-graphic>graphic<list-graphic>
    <list-text>text</list-text>
    <list-meta>meta<list-meta>
  </list-item>
</x-list>
```
two-line text list
```html
<x-list>
  <list-item>
    <list-text>
      <p>primary</p>
      <p>secondary</p>
    </list-text>
  </list-item>
</x-list>
```
required
* `x-list`  
  * @include rs-list-type(two-line);
* `list-text > p:first-child`
  * @include rs-list-text-type(primary);
* `list-text > p:last-child`
  * @include rs-list-text-type(secondary);

avatar dense list
```html
<x-list>
  <list-item>
    <list-graphic>graphic</list-graphic>
    <list-text>text</list-text>
  </list-item>
</x-list>
```
required
* `x-list`
  * @include rs-list-type(avatar, dense);

group list
```html
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
```
required
* `x-list`
  * @include rs-list-type(group);

## feature
### custom elements
* `x-list`
  * `list-item`
    * `item-graphic`
    * `item-text`
    * `item-meta`
  * `list-subheader`
  * `list-divider`

### attributes
* selected
* activated
* disabled

### mixins
* rs-list-type($types...)
* rs-list-item-primary-text-color($xolor)  
...