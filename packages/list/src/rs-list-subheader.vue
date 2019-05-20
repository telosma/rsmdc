<template>
  <h3 class="rs-list-group__subheader" :class="{ '-rs-drawer': isDrawer }" ref="slotContainer">
    <slot></slot>
  </h3>
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
      this.drawerHost = this.host.parentNode.parentNode
    },
    drawerHost() {
      if(this.drawerHost.shadowRoot) {
        this.isDrawer = this.drawerHost.shadowRoot.querySelector('.rs-drawer__content') ? true : false
      }
    }
  },
  mounted() {
    this.el = this.$el
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
@import '@rsmdc/drawer/variables';
@import '@rsmdc/typography/mixins';
@import '@rsmdc/typography/variables';
@import '@rsmdc/theme/variables';

.rs-list-group__subheader {
  $rs-list-subheader-virtual-height: 3rem;
  $rs-list-subheader-leading: map-get(map-get($rs-typography-styles, body1), line-height);
  $rs-list-subheader-margin: ($rs-list-subheader-virtual-height - $rs-list-subheader-leading) / 2;
  @include rs-typography(subtitle1);
  margin: $rs-list-subheader-margin $rs-list-side-padding;

  color: var(--rs-list-group-subheader--color, rs-theme-ink-color-for-fill_(primary, $rs-theme-background));
}

.-rs-drawer {
  @include rs-typography(body2);
  @include rs-typography-baseline-top(24px);
  color: var(--rs-drawer-subtitle--color, rgba(rs-theme-prop-value($rs-drawer-subtitle-ink-color), $rs-drawer-subtitle-ink-opacity));
  margin: 0;
  padding: 0 $rs-drawer-surface-padding;
}

</style>

