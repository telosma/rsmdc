import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import formError from '../form-field/src/rs-form-error.vue'
import formHelper from '../form-field/src/rs-form-helper.vue'
import formField from '../form-field/src/rs-form-field.vue'

export const FormError = wrap(Vue, formError)
export const FormHelper = wrap(Vue, formHelper)
export const FormField = wrap(Vue, formField)
