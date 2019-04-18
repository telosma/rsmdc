<template>
  <span class="rs-list-item__text" ref="slotContainer"><slot></slot></span>
</template>
<style lang="scss">
@import '../rs-list';

:host {
  align-self: var(--rs-list-item-text--align-self);
}

</style>



