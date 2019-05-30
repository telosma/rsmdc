<template>
  <div class="rs-tab-bar" role="tablist">
    <div class="rs-tab-scroller">
      <div class="rs-tab-scroller__scroll-area" :class="scroll">
        <div class="rs-tab-scroller__scroll-content" ref="slotContainer">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      el: '',
      host: '',
      tabs: [],
      indicator: '',
      scrollArea: '',
      isFixedContents: false,
      scrollLeft: 0,
      leftPosition: 0,
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      this.leftPosition = this.host.getBoundingClientRect().left
      this.isFixedContents = this.getElementProperty(this.host, '--rs-tab-indicator__fixed-contents') ? true : false
    },
    indicator() {
      this.indicator.classList.remove('-rs-no-animating')
    }
  },
  mounted() {
    this.$nextTick()
    .then(this.fixSlot.bind(this))
    .then(() => {
      this.tabs = Array.from(this.$el.querySelector('slot').assignedNodes()).filter(node => node.nodeType === 1)
      this.scrollArea = this.$el.querySelector('.rs-tab-scroller__scroll-area')
      this.indicator = this.$el.querySelector('.rs-tab-indicator')

      this.tabs.forEach((tab, i) => {
        const indicatorLeft = this.defineIndicatorPosition(tab)
        const indicatorWidth = this.defineIndicatorWidth(tab)
        const isActivated = tab.getAttribute('activated')
          ? true : tab.getAttribute('activated') === ''
          ? true : false

        if(isActivated) {
          this.activeTab = tab
          tab.setAttribute('area-selected', true)
          this.setIndicatorStyle(indicatorLeft, indicatorWidth)
        }

        // event (move indicator to active tab)
        tab.addEventListener('click', () => {
          const scrollAreaWidth = parseInt(this.getElementProperty(this.scrollArea, 'width').replace('px', ''))
          const tabRightPosition = tab.getBoundingClientRect().right
          const tabLeftPosition = tab.getBoundingClientRect().left

          this.setIndicatorStyle(indicatorLeft, indicatorWidth)
          this.tabs.forEach((ch, n) => {
            if(i === n) {
              ch.setAttribute('area-selected', true)
            } else {
              ch.removeAttribute('area-selected')
            }
          })

          if(i === 0 || i === this.tabs.length-1) {
            if(tabRightPosition > scrollAreaWidth) {
              const left = tabRightPosition + this.scrollArea.scrollLeft
              this.setScrollPosition(this.scrollArea, left)
            } else if(tabLeftPosition < 0) {
              this.setScrollPosition(this.scrollArea, 0)
            }
          } else {
            const rightTabWidth = parseInt(this.getElementProperty(this.tabs[i+1], 'width').replace('px', '')) / 3
            const leftTabWidth = parseInt(this.getElementProperty(this.tabs[i-1], 'width').replace('px', '')) / 3
            const rightViewPosition = tabRightPosition + rightTabWidth
            const leftViewPosition = tabLeftPosition - leftTabWidth

            if(rightViewPosition > scrollAreaWidth) {
              const diff = rightViewPosition - scrollAreaWidth
              const left = diff + this.scrollArea.scrollLeft
              this.setScrollPosition(this.scrollArea, left)
            } else if(leftViewPosition < 0) {
              const left = this.scrollArea.scrollLeft + leftViewPosition
              this.setScrollPosition(this.scrollArea, left)
            }
          }
        })
      })
    })
    this.el = this.$el
    const resizeObserver = new ResizeObserver(() => {
      this.tabs.forEach(tab => {
        const indicatorLeft = this.defineIndicatorPosition(tab)
        const indicatorWidth = this.defineIndicatorWidth(tab)
        const isActivated = tab.getAttribute('area-selected') ? true : false

        if(isActivated) {
          tab.setAttribute('area-selected', true)
          this.setIndicatorStyle(indicatorLeft, indicatorWidth)
        }

        tab.addEventListener('click', () => {
          this.setIndicatorStyle(indicatorLeft, indicatorWidth)
        })
      })
    })
    resizeObserver.observe(this.$el)
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
      const div = document.createElement('div')
      div.classList.add('rs-tab-indicator')
      div.classList.add('-rs-no-animating')
      this.$refs.slotContainer.append(div)
    },
    getElementProperty(el, prop) {
      const style = window.getComputedStyle(el)
      const value = String(style.getPropertyValue(prop)).trim()
      return value
    },
    defineIndicatorWidth(tab) {
      const content = tab.shadowRoot.querySelector('.rs-tab__content')

      return this.isFixedContents ? this.getElementProperty(content, 'width') : this.getElementProperty(tab, 'width')
    },
    defineIndicatorPosition(tab) {
      const contentParent = tab.shadowRoot.querySelector('.rs-tab')
      const content = tab.shadowRoot.querySelector('.rs-tab__content')
      const tabLeftPosition = tab.getBoundingClientRect().left
      const left = tabLeftPosition - this.leftPosition + this.scrollArea.scrollLeft

      const contentParentWidth = parseInt(this.getElementProperty(contentParent, 'width').replace('px', ''))
      const contentWidth = parseInt(this.getElementProperty(content, 'width').replace('px', ''))
      const calculateWidth = (contentParentWidth - contentWidth) / 2
      
      return this.isFixedContents ? left + calculateWidth : left
    },
    setIndicatorStyle(position, width) {
      this.indicator.style.setProperty('left', `${position}px`)
      this.indicator.style.setProperty('--rs-tab-indicator--width', width)
    },
    setScrollPosition(scrollArea, left) {
      scrollArea.scrollTo({
        top: 0,
        left: left,
        behavior: 'smooth'
      })
    }
  }
}
</script>
<style lang="scss">
@import "@rsmdc/animation/variables";
@import "@rsmdc/theme/variables";

.rs-tab-bar {
  width: var(--rs-tab-bar--width, 100%);
}

.rs-tab-scroller {
  overflow-y: hidden;
}

.rs-tab-scroller__scroll-area {
  -webkit-overflow-scrolling: touch;
  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}

.rs-tab-scroller__scroll-content {
  position: relative;
  display: flex;
  flex: 1 0 auto;
  transform: none;
  will-change: transform;
  justify-content: var(--rs-tab-scroller--justify-content);
}

.rs-tab-indicator {
  pointer-events: none;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: 
    left 0.2s ease-in-out,
    width 0.2s ease-in-out;
  width: var(--rs-tab-indicator--width);
  height: var(--rs-tab-indicator--height, 2px);
  background-color: var(--rs-tab-indicator--background-color, $rs-theme-primary);

  // first rendering only 
  &.-rs-no-animating {
    transition: none;
  }
}
</style>

