<template>
  <hr class="rs-list-divider"></hr>
</template>
<style lang="scss">
@import '../rs-list';

.rs-list-divider {
  $divider-color: if(
    rs-theme-tone($rs-theme-background) == "dark",
    $rs-list-divider-color-on-dark-bg,
    $rs-list-divider-color-on-light-bg
  );
  width: var(--rs-list-divider--width);
  margin: var(--rs-list-divider--margin, 0);
  margin-left: var(--rs-list-divider--margin-left, 0);
  margin-right: var(--rs-list-divider--margin-right, 0);
  border-bottom-color: var(--rs-list-divider--border-bottom-color, $divider-color);
}
</style>


