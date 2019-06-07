<template>
  <div class="rs-text-field-character-counter">{{ `${textLength} / ${maxLength}` }}</div>
</template>
<script>
export default {
  props: {
    maxLength: {
      type: Number,
      default: 0
    },
    textLength: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss">

</style>
