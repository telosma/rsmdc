import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import button from '../button/src/rs-button.vue'

export const Button = wrap(Vue, button)