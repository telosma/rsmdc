import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import menu from '../menu/src/rs-menu.vue'

export const Menu = wrap(Vue, menu)
