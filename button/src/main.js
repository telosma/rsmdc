import button from './rs-button.vue'
import buttonIcon from './rs-button-icon.vue'
import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'

export const ButtonIcon = wrap(Vue, buttonIcon)
export const Button = wrap(Vue, button)
