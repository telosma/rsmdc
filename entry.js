import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import radio from './radio/src/rs-radio.vue'

export const Radio = wrap(Vue, radio)