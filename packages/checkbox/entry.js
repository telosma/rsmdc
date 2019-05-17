import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import checkbox from './src/rs-checkbox.vue'

export const Checkbox = wrap(Vue, checkbox)