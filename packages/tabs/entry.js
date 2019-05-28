import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import tab from './src/rs-tab.vue'
import tabBar from './src/rs-tab-bar.vue'

export const Tab = wrap(Vue, tab)
export const TabBar = wrap(Vue, tabBar)