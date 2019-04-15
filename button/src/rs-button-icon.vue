<template>
  <i class="rs-button__icon" aria-hidden="true"><slot></slot></i>
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
  @include rs-button__icon_svg_;

  //type
  margin-left: var(--rs-button-label_-icon--margin-left, var(--rs-button-icon--margin-left, 0px));
  margin-right: var(--rs-button-label_-icon--margin-right, var(--rs-button-icon--margin-right, 8px));

  &:not(:disabled) {
    color: var(--rs-button-icon_not_disabled--color);
  }
}

</style>


