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
      scrollLeft: 0
    }
  },
  watch: {
    el() {
      this.host = this.el.parentNode.host
    },
    host() {
      this.leftPosition = this.host.getBoundingClientRect().left
    }
  },
  mounted() {
    this.$nextTick()
    .then(this.fixSlot.bind(this))
    .then(() => {
      const slotChildren = Array.from(this.$el.querySelector('slot').assignedNodes()).filter(node => node.nodeType === 1)
      slotChildren.forEach((child, i) => {
        child.addEventListener('click', () => {
          const width = this.getElementProperty(child, 'width')
          const indicator = this.$el.querySelector('.rs-tab-indicator')
          const scrollArea = this.$el.querySelector('.rs-tab-scroller__scroll-area')
          const rect = child.getBoundingClientRect()
          const indicatorLeft = rect.left - this.leftPosition + scrollArea.scrollLeft
          indicator.style.setProperty('width', width)
          indicator.style.setProperty('left', `${indicatorLeft}px`)

          if(i === 0 || i === slotChildren.length-1) { return }

          const scrollAreaWidth = parseInt(this.getElementProperty(scrollArea, 'width').replace('px', ''))
          const childWidth = parseInt(this.getElementProperty(child, 'width').replace('px', ''))
          const rightElRect = slotChildren[i+1].getBoundingClientRect()
          const leftElRect = slotChildren[i-1].getBoundingClientRect()

          // if(scrollAreaWidth < rightElRect.right) {
          //   console.log(1)
          //   const width = parseInt(this.getElementProperty(slotChildren[i+1], 'width').replace('px', '')) / 2
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
          //   const width = parseInt(this.getElementProperty(slotChildren[i-1], 'width').replace('px', '')) / 2
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
    })
    this.el = this.$el
  },
  methods: {
    fixSlot() {
      this.$refs.slotContainer.innerHTML = ''
      this.$refs.slotContainer.append(document.createElement('slot'))
      const div = document.createElement('div')
      div.classList.add('rs-tab-indicator')
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

  // &.rs-tab-scroller__scroll-area--scroll {
  //   overflow-x: scroll;
  // }

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
  width: var(--rs-tab-indicator--width, 100px);
  height: var(--rs-tab-indicator--height, 2px);
  background-color: var(--rs-tab-indicator--background-color, $rs-theme-primary);
}

// .rs-tab-scroller--animating .rs-tab-scroller__scroll-area {
//   -webkit-overflow-scrolling: auto;
// }

// .rs-tab-scroller--animating .rs-tab-scroller__scroll-content {
//   transition: 250ms transform $rs-animation-standard-curve-timing-function;
// }


</style>

