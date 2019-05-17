<template>
  <div class="rs-form-field">
    <div class="rs-checkbox">
      <input type="checkbox" class="rs-checkbox__native-control" :id="id" :checked="checked">
      <div class="rs-checkbox__background">
        <svg class="rs-checkbox__checkmark" viewBox="0 0 24 24">
          <path class="rs-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
        </svg>
        <div class="rs-checkbox__mixedmark"></div>
      </div>
    </div>
    <label :for="id" ref="slotContainer">
      <slot></slot>
    </label>
  </div>
</template>
<script>
import { RSRipple } from '@rsmdc/ripple'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
    new RSRipple(this.$el.querySelector('.rs-checkbox'))
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
@import '../rs-checkbox';

</style>


