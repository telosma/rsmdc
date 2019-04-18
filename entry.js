import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import radio from './radio/src/rs-radio.vue'
import listGroup from './list/src/rs-list-group.vue'
import listDivider from './list/src/rs-list-divider.vue'
import listSubheader from './list/src/rs-list-subheader.vue'
import list from './list/src/rs-list.vue'
import listItem from './list/src/rs-list-item.vue'
import listItemGraphic from './list/src/rs-list-item-graphic.vue'
import listItemMeta from './list/src/rs-list-item-meta.vue'
import listItemText from './list/src/rs-list-item-text.vue'
import listItemTextPrimary from './list/src/rs-list-item-text-primary.vue'
import listItemTextSecondary from './list/src/rs-list-item-text-secondary.vue'

export const Radio = wrap(Vue, radio)
export const ListGroup = wrap(Vue, listGroup)
export const ListDivider = wrap(Vue, listDivider)
export const ListSubheader = wrap(Vue, listSubheader)
export const List = wrap(Vue, list)
export const ListItem = wrap(Vue, listItem)
export const ListItemGraphic = wrap(Vue, listItemGraphic)
export const ListItemMeta = wrap(Vue, listItemMeta)
export const ListItemText = wrap(Vue, listItemText)
export const ListItemTextPrimary = wrap(Vue, listItemTextPrimary)
export const ListItemTextSecondary = wrap(Vue, listItemTextSecondary)
