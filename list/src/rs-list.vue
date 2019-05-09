<template>
  <ul class="rs-list" ref="slotContainer">
    <slot></slot>
  </ul>
</template>
<script>
import { RSList } from '../index'

export default {
  data() {
    return {
      el: '',
      host: ''
    }
  },
  watch: {
    el() {
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  created() {
    if(!window.__rsmdc) {
      window.__rsmdc = {}
    }
    if(!window.__rsmdc.list) {
      window.__rsmdc.list = {
        lists: [],
        items: [],
      }
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    new RSList(this.$el)
    this.el = this.$el
    window.__rsmdc.list.lists.push(this.el)
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
    }
  }
}
</script>

<style lang="scss">
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
