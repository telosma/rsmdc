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
      isFixedContents: false,
      scrollLeft: 0,
      leftPosition: 0
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      this.leftPosition = this.host.getBoundingClientRect().left
      this.isFixedContents = this.getElementProperty(this.host, '--rs-tab-indicator__fixed-contents') ? true : false
    }
  },
  mounted() {
    this.$nextTick()
    .then(this.fixSlot.bind(this))
    .then(() => {
      const tabs = Array.from(this.$el.querySelector('slot').assignedNodes()).filter(node => node.nodeType === 1)
      const indicator = this.$el.querySelector('.rs-tab-indicator')
      const scrollArea = this.$el.querySelector('.rs-tab-scroller__scroll-area')

      tabs.forEach((tab, i) => {
        const contentParent = tab.shadowRoot.querySelector('.rs-tab')
        const content = tab.shadowRoot.querySelector('.rs-tab__content')
        const tabLeftPosition = tab.getBoundingClientRect().left
        const left = tabLeftPosition - this.leftPosition + scrollArea.scrollLeft

        const contentParentWidth = parseInt(this.getElementProperty(contentParent, 'width').replace('px', ''))
        const contentWidth = parseInt(this.getElementProperty(content, 'width').replace('px', ''))
        const calculateWidth = (contentParentWidth - contentWidth) / 2
        
        const indicatorLeft = this.isFixedContents
          ? left + calculateWidth : left
        const indicatorWidth = this.isFixedContents
          ? this.getElementProperty(content, 'width') : this.getElementProperty(tab, 'width')

        const isActivated = tab.getAttribute('activated')
            ? true : tab.getAttribute('activated') === ''
            ? true : false

        if(isActivated) {
          tab.setAttribute('area-selected', true)
          indicator.style.setProperty('left', `${indicatorLeft}px`)
          indicator.style.setProperty('--rs-tab-indicator--width', indicatorWidth)
        }

        // event (move indicator and tab)
        tab.addEventListener('click', () => {


          indicator.style.setProperty('--rs-tab-indicator--width', indicatorWidth)
          indicator.style.setProperty('left', `${indicatorLeft}px`)

          tabs.forEach((ch, n) => {
            if(i === n) {
              ch.setAttribute('area-selected', true)
            } else {
              ch.removeAttribute('area-selected')
            }
          })


          // if(i === 0 || i === tabs.length-1) { return }

          // const scrollAreaWidth = parseInt(this.getElementProperty(scrollArea, 'width').replace('px', ''))
          // const tabWidth = parseInt(this.getElementProperty(tab, 'width').replace('px', ''))
          // const rightElRect = tabs[i+1].getBoundingClientRect()
          // const leftElRect = tabs[i-1].getBoundingClientRect()

          // if(scrollAreaWidth < rightElRect.right) {
          //   console.log(1)
          //   const width = parseInt(this.getElementProperty(tabs[i+1], 'width').replace('px', '')) / 2
          //   this.scrollLeft += rightElRect.right - scrollAreaWidth
          //   this.scrollLeft = scrollAreaWidth
          //   console.log(this.scrollLeft)
          //   console.log(rightElRect.right - scrollAreaWidth)
          //   scrollArea.scrollTo({
          //     top: 0,
          //     left: rightElRect.right - scrollAreaWidth,
          //     behavior: 'smooth'
          //   })
          // } else if(0 > leftElRect.left) {
          //   console.log(2)
          //   const width = parseInt(this.getElementProperty(tabs[i-1], 'width').replace('px', '')) / 2
          //   this.scrollLeft = leftElRect.left + scrollAreaWidth
          //   console.log(this.scrollLeft)
          //   console.log(leftElRect.left + scrollAreaWidth)
          //   scrollArea.scrollTo({
          //     top: 0,
          //     left: leftElRect.left + scrollAreaWidth,
          //     behavior: 'smooth'
          //   })
          // }
        })
      })
      indicator.classList.remove('-rs-no-animating')
    })
    this.el = this.$el
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
  height: 2px;
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

