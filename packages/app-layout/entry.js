import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import appLayoutContent from '../app-layout/src/rs-app-layout-content.vue'
import appLayout from '../app-layout/src/rs-app-layout.vue'

export const AppLayoutContent = wrap(Vue, appLayoutContent)
export const AppLayout = wrap(Vue, appLayout)
