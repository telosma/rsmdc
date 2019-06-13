<template>
  <hr class="rs-list-divider" :class="{ '-drawer': isDrawer }" />
</template>
<script>
export default {
  data() {
    return {
      el: '',
      host: '',
      drawerHost: '',
      isDrawer: false
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
      this.drawerHost = this.host.parentNode.parentNode.parentNode
    },
    drawerHost() {
      if(!this.drawerHost) { return }
      if(this.drawerHost.shadowRoot) {
        this.isDrawer = this.drawerHost.shadowRoot.querySelector('.rs-drawer__content') ? true : false
      }
    }
  },
  mounted() {
    this.el = this.$el
  }
}
</script>

<style lang="scss">
@import '../variables';
@import '@rsmdc/theme/variables';

.rs-list-divider {
  $divider-color: if(
    rs-theme-tone($rs-theme-background) == "dark",
    $rs-list-divider-color-on-dark-bg,
    $rs-list-divider-color-on-light-bg
  );
  height: 0;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;

  width: var(--rs-list-divider--width);
  margin: var(--rs-menu-list-divider--margin, var(--rs-list-divider--margin, 0));
  margin-left: var(--rs-list-divider--margin-left, 0);
  margin-right: var(--rs-list-divider--margin-right, 0);
  border-bottom-color: var(--rs-list-divider--border-bottom-color, $divider-color);

  [dir="rtl"] &,
  &[dir="rtl"] {
    margin-left: var(--rs-list-divider_rtl--margin-left);
    margin-right: var(--rs-list-divider_rtl--margin-right);
  }
}

.-drawer {
  margin: 3px 0 4px 0;
}

</style>


