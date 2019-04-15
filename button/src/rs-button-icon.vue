<template>
  <svg class="rs-button__icon" aria-hidden="true" :viewBox="viewBox" :xmlns="xmlns" v-if="type === 'svg'"><slot></slot></svg>
  <i class="rs-button__icon" aria-hidden="true" v-else><slot></slot></i>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'image'
    },
    viewBox: {
      type: String,
      default: '0 0 0 0'
    },
    xmlns: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log(this.type)
  }
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


