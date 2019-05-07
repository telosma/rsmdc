<template>
  <ul class="rs-list">
    <slot></slot>
  </ul>
</template>
<script>
import { RSList } from '../index'

export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  mounted() {
    new RSList(this.$el)
  }
}
</script>

<style lang="scss">
@import '../rs-list';
@import '../mixins';
@import "../../typography/mixins";

.rs-list {
  @include rs-list-base_;
  padding-top: var(--rs-list--padding-top, 8px);
  padding-bottom: var(--rs-list--padding-bottom, 8px);
  font-size: var(--rs-list--font-size);
  color: var(--rs-list--color, rs-theme-ink-color-for-fill_(primary, $rs-theme-background));
}

</style>
