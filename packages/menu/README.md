# Menu
## example
### default menu
```html
<x-menu>
  ...
</x-menu>
```

### list in menu
```html
<x-menu>
  <x-list>
    ...
  </x-list>
</x-menu>
```

### list(has grouping item) in menu
```html
<x-menu>
  <x-list>
    <list-group>
      <list-item>
        ...
      </list-item>
      ...
    </list-group>
    <list-item>
      ...
    </list-item>
    ...
  </x-list>
</x-menu>
```
## feature
### custom elements
* `x-menu`

### attributes
* opened
### mixins
* rs-menu-width($width)