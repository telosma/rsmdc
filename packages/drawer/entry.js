import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import drawerContent from '../drawer/src/rs-drawer-content.vue'
import drawerTitle from '../drawer/src/rs-drawer-title.vue'
import drawerSubtitle from '../drawer/src/rs-drawer-subtitle.vue'
import drawerHeader from '../drawer/src/rs-drawer-header.vue'
import drawer from '../drawer/src/rs-drawer.vue'

export const DrawerContent = wrap(Vue, drawerContent)
export const DrawerTitle = wrap(Vue, drawerTitle)
export const DrawerSubtitle = wrap(Vue, drawerSubtitle)
export const DrawerHeader = wrap(Vue, drawerHeader)
export const Drawer = wrap(Vue, drawer)