import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import topAppBarActionItem from '../top-app-bar/src/rs-top-app-bar-action-item.vue'
import topAppBarActions from '../top-app-bar/src/rs-top-app-bar-actions.vue'
import topAppBarTitle from '../top-app-bar/src/rs-top-app-bar-title.vue'
import topAppBarNav from '../top-app-bar/src/rs-top-app-bar-nav.vue'
import topAppBar from '../top-app-bar/src/rs-top-app-bar.vue'

export const TopAppBarActionItem = wrap(Vue, topAppBarActionItem)
export const TopAppBarActions = wrap(Vue, topAppBarActions)
export const TopAppBarTitle = wrap(Vue, topAppBarTitle)
export const TopAppBarNav = wrap(Vue, topAppBarNav)
export const TopAppBar = wrap(Vue, topAppBar)