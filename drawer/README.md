# Drawer
## example
### normal drawer
```html
<x-drawer>
  <drawer-header>
    <h3>title</h3>
    <h6>subtitle</h6>
  <drawer-header>
  <drawer-content>
    ...
  <drawer-content>
</x-drawer>
```
first-child

### list in drawer
```html
<x-drawer>
  <drawer-header>
    ...
  <drawer-header>
  <drawer-content>
    <x-list>
      <list-item>
        ...
      </list-item>
      ...
    </x-list>
  <drawer-content>
</x-drawer>
```
### permanent drawer with top-app-bar
```html
<x-app-layout>
  <x-drawer>
    ...
  <x-drawer>
  <app-layout-content>
    <x-app-bar>
      ...
    </x-app-bar>
    ...
  </app-layout-content>
</x-app-layout>
```
required  
* `x-app-layout`
* `app-layout-content`
  * @include rs-top-app-bar-with-drawer(permanent);

### dismissible drawer with top-app-bar
```html
<x-app-layout>
  <x-drawer>
    ...
  <x-drawer>
  <app-layout-content>
    <x-app-bar>
      ...
    </x-app-bar>
    ...
  </app-layout-content>
</x-app-layout>
```
required  
* `x-app-layout`
* `app-layout-content`
* `x-drawer`  
  * @include rs-drawer-type(dismissible);
  
### modal drawer with top-app-bar
```html
<x-app-layout>
  <x-drawer>
    ...
  <x-drawer>
  <app-layout-content>
    <x-app-bar>
      ...
    </x-app-bar>
    ...
  </app-layout-content>
</x-app-layout>
```
required
* `x-app-layout`
* `app-layout-content`
* `x-drawer`  
  * @include rs-drawer-type(modal);

## feature
### custom elements
* `x-drawer`
  * `drawer-header`
  * `drawer-content`

if you use drawer with top-app-bar, you must use these custom-elements.
* `x-app-layout`  
  * `app-layout-content`

### attribute
* opened

### mixins
* rs-drawer-type($type)
* rs-drawer-width($width)  
  ...
