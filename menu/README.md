# Menu
## example
### normal menu
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
    <menu-list-group>
      <list-item>
        ...
      </list-item>
      ...
    </menu-list-group>
    <list-item>
      ...
    </list-item>
    ...
  </x-list>
</x-menu>

<x-menu>
  <x-list>
    <list-item>
      ...
    </list-item>
    ...
  </x-list>
  <x-list>
    <list-item>
      ...
    </list-item>
  </x-list>
</x-menu>

```
required
* `menu-list-group`

### surface menu
```html
<x-menu-surface>
  ...
</x-menu-surface>
```
required
* opened

## feature
### custom elements
* `x-menu`
  * `menu-list-group` 

### attributes
### mixins
* rs-menu-width($width)