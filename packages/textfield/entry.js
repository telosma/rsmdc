import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import textFieldAction from './src/rs-text-field-action.vue'
import textArea from './src/rs-textarea.vue'
import textField from './src/rs-text-field.vue'

export const TextFieldAction = wrap(Vue, textFieldAction)
export const TextArea = wrap(Vue, textArea)
export const TextField = wrap(Vue, textField)