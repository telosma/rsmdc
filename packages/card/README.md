# Card
## example
### default card
```html
<x-card>
  <x-card-header>
    <x-card-title>title</x-card-title>
    <x-card-subtitle>subtitle</x-card-subtitle>
  </x-card-header>
  <x-card-description>
    description
  </x-card-description>
  <x-card-actions>
    <x-button />
    ...
  </x-card-actions>
</x-card>

```
```scss
x-card {
  > x-card-media {
    @include rs-card-media-type(16-9);
    @include rs-card-media-image(url('sample.png'));
  }
}
```  
### add media
```html
<x-card>
  <x-card-media />
  <x-card-header>
    <x-card-title>title</x-card-title>
    <x-card-subtitle>subtitle</x-card-subtitle>
  </x-card-header>
  <x-card-description>
    description
  </x-card-description>
  <x-card-actions>
    <x-button />
    ...
  </x-card-actions>
</x-card>

```
```scss
x-card {
  > x-card-media {
    @include rs-card-media-type(16-9);
    @include rs-card-media-image(url('sample.png'));
  }
}
```  
NOTES:  
If you use `x-card-media`, you must use these mixins:
* rs-card-media-type  
To set media size.
* rs-card-media-image  
To set media image.

### add primary contents
```html
<x-card>
  <x-card-contents>
    <x-card-header>
      <x-card-title>title</x-card-title>
      <x-card-subtitle>subtitle</x-card-subtitle>
    </x-card-header>
  </x-card-contents>
  <x-card-description>description</x-card-description>
  <x-card-actions>
    <x-button />
    ...
  </x-card-actions>
</x-card>

```
`x-card-contents` means primary contents in card, the area can tap and select.  
If you want to tap some parts of card, inclose applicable parts by `x-card-contents`.

## feature
### custom elements
* `x-card`
  * `x-card-contents`
  * `x-card-media`
  * `x-card-header`
    * `x-card-title`
    * `x-card-subtitle`
  * `x-card-description`
  * `x-card-actions`

### attributes
Nothing.
### types
* card
  * default
  * outlined
* media
  * 16-9
  * square
* actions
  * full-bleed


