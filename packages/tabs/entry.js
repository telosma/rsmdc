import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import tabItem from './src/rs-tab-item.vue'
import tabBar from './src/rs-tab-bar.vue'

export const Tab = wrap(Vue, tabItem)
export const TabBar = wrap(Vue, tabBar)