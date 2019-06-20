<template>
  <span class="rs-text-field__trailing-icon" />
</template>
<style lang="scss">

.rs-text-field__trailing-icon {
  display: inline-block;
  width: 24px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;

  height: var(--rs-text-field-trailing-icon--height);
  font-family: var(--rs-text-field-trailing-icon--font-family);
  background-image: var(--rs-text-field-trailing-icon--background-image);
  font-size: var(--rs-text-field-trailing-icon--font-size, 24px);
  font-weight: var(--rs-text-field-trailing-icon--font-weight, 400);

  &::before {
    content: var(--rs-text-field-trailing-icon_before--content, '');
  }
}
</style>

