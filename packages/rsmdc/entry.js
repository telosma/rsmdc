import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import tabItem from '../tabs/src/rs-tab-item.vue'
import tabBar from '../tabs/src/rs-tab-bar.vue'
import cardActions from '../card/src/rs-card-actions.vue'
import cardMedia from '../card/src/rs-card-media.vue'
import cardDescription from '../card/src/rs-card-description.vue'
import cardSubtitle from '../card/src/rs-card-subtitle.vue'
import cardTitle from '../card/src/rs-card-title.vue'
import cardHeader from '../card/src/rs-card-header.vue'
import cardContents from '../card/src/rs-card-contents.vue'
import card from '../card/src/rs-card.vue'
import menu from '../menu/src/rs-menu.vue'
import textFieldAction from '../textfield/src/rs-text-field-action.vue'
import textArea from '../textfield/src/rs-textarea.vue'
import textField from '../textfield/src/rs-text-field.vue'
import formError from '../form-field/src/rs-form-error.vue'
import formHelper from '../form-field/src/rs-form-helper.vue'
import formField from '../form-field/src/rs-form-field.vue'

export const TabItem = wrap(Vue, tabItem)
export const TabBar = wrap(Vue, tabBar)
export const CardActions = wrap(Vue, cardActions)
export const CardMedia = wrap(Vue, cardMedia)
export const CardDescription = wrap(Vue, cardDescription)
export const CardSubtitle = wrap(Vue, cardSubtitle)
export const CardTitle = wrap(Vue, cardTitle)
export const CardHeader = wrap(Vue, cardHeader)
export const CardContents = wrap(Vue, cardContents)
export const Card = wrap(Vue, card)
export const Menu = wrap(Vue, menu)
export const TextFieldAction = wrap(Vue, textFieldAction)
export const TextArea = wrap(Vue, textArea)
export const TextField = wrap(Vue, textField)
export const FormError = wrap(Vue, formError)
export const FormHelper = wrap(Vue, formHelper)
export const FormField = wrap(Vue, formField)