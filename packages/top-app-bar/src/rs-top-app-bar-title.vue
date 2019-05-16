<template>
  <h1 class="rs-top-app-bar__title" ref="slotContainer">
    <slot></slot>
  </h1>
</template>
<script>
export default {
  mounted() {
    this.$nextTick().then(this.fixSlot.bind(this))
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
@import '../variables';
@import '@rsmdc/theme/variables';
@import '@rsmdc/typography/mixins';

.rs-top-app-bar__title {
  @include rs-typography(headline6);
  
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;
  padding-right: 0;
  margin: 0; // override h1 h2 default style
  color: var(--rs-top-app-bar-title--color, $rs-theme-on-primary);
  transition: var(--rs-top-app-bar-title--transition);
  opacity: var(--rs-top-app-bar-title--opacity);
  display: var(--rs-top-app-bar-title--display);
  padding-left: var(--rs-top-app-bar-title--padding-left, $rs-top-app-bar-title-left-padding);
  padding-bottom: var(--rs-top-app-bar-title--padding-bottom);
  align-self: var(--rs-top-app-bar-title--align-self);
}
</style>

