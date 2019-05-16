# Drawer
## example
### default drawer
```html
<x-drawer>
  <drawer-header>
    <drawer-title>title</drawer-title>
    <drawer-subtitle>title</drawer-subtitle>
  <drawer-header>
  <drawer-content>
    ...
  <drawer-content>
</x-drawer>
```
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
```scss
x-app-layout {
  > app-layout-content {
    @include rs-top-app-bar-with-drawer(permanent);
  }
}
```
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
```scss
x-app-layout {
  > x-drawer {
    @include rs-drawer-type(dismissible);
  }
}
```
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
```scss
x-app-layout {
  > x-drawer {
    @include rs-drawer-type(modal);
  }
}
```  

## feature
### custom elements
* `x-drawer`
  * `drawer-header`  
    * `drawer-title`
    * `drawer-subtitle`
  * `drawer-content`

if you use drawer with top-app-bar, you must use these custom-elements.
* `x-app-layout`  
  * `app-layout-content`

### attributes
* opened

### mixins
* rs-drawer-type($type)
* rs-drawer-width($width)  
  and more...

### drawer types
* permanent (default)
* modal
* dismissible
