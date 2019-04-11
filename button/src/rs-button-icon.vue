<template>
  <span class="rs-button__icon"><slot></slot></span>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
@import  '/../assets/rs-button';
@import '../../feature-targeting/assets/rs-mixins';

.rs-button__icon {
  @include rs-button__icon_;

  :not(:disabled) {
    @include set-rs-feat-color(color, var(--rs-button-icon_not_disabled--color, var(--rs-button_not_disabled--color, #{$rs-theme-primary})));
  }
}

</style>


