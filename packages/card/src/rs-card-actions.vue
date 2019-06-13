<template>
  <div class="rs-card__actions" ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick()
      .then(this.fixSlot.bind(this))
      .then(() => {
        const slotChildren = Array.from(this.$el.querySelector('slot').assignedNodes()).filter(node => node.nodeType === 1)
        const icons = []
        const buttons = []
        slotChildren.forEach(child => {
          const isIcon = this.getElementProperty(child, '--rs-button__icon') === 'true' ? true : false
          if(isIcon) {
            child.classList.add('-icon')
            icons.push(child)
          } else {
            child.classList.add('-button')
            buttons.push(child)
          }
        })
        if(icons.length === 0 || buttons.length === 0) { return }
        icons.shift().classList.add('-first')
        buttons.pop().classList.add('-last')
      })
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
    },
    getElementProperty(el, prop) {
      const style = window.getComputedStyle(el)
      const value = String(style.getPropertyValue(prop)).trim()
      return value
    }
  }
}
</script>
<style lang="scss">
@import '@rsmdc/rtl/mixins';
@import '@rsmdc/theme/mixins';
@import '@rsmdc/theme/variables';

@mixin rs-card-actions-layout_($display: flex) {
  display: $display;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
}

.rs-card__actions {
  @include rs-card-actions-layout_;

  min-height: 52px;
  padding: var(--rs-card-actions--padding, 8px);
}

// .rs-card__action
::slotted(*) {
  @include rs-card-actions-layout_(inline-flex);

  justify-content: center;
  cursor: pointer;
  user-select: none;
}
::slotted(*:focus) {
  outline: none;
}

// .rs-card__action--button
::slotted(.-button) {
  margin-right: var(--rs-card-actions_slotted-button--margin-right, 8px);
}
::slotted(.-button.-full-bleed) {
  justify-content: space-between;
  width: 100%;
  height: auto;
  max-height: none;
  margin: 0;
  padding: 8px 16px;
  /* @noflip */
  text-align: left;

  @include rs-rtl {
    /* @noflip */
    text-align: right;
  }
}
::slotted(.-button.-last) {
  @include rs-rtl-reflexive-box(margin, right, 16px);
}

// .rs-card__action-icon
::slotted(.-icon:not(:disabled)) {
  --re-button_not_disabled--color: #{rs-theme-ink-color-for-fill_(icon, $rs-theme-background)};
  margin: -6px 0;
}
::slotted(.-icon.-first) {
  margin-right: 0;
  margin-left: auto;
}
</style>

