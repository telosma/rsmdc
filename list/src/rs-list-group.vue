<template>
  <div class="rs-list-group">
    <slot></slot>
  </div>
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
    new RSList(this.$el.querySelector('.rs-list'))
  }
}
</script>

<style lang="scss">
@import '../rs-list';

.rs-list-group {
  --rs-list--pading: 0;
}

</style>
