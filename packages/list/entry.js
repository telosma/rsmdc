import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import listTextPrimary from '../list/src/rs-list-text-primary.vue'
import listTextSecondary from '../list/src/rs-list-text-secondary.vue'
import listText from '../list/src/rs-list-text.vue'
import listGraphic from '../list/src/rs-list-graphic.vue'
import listMeta from '../list/src/rs-list-meta.vue'
import listItem from '../list/src/rs-list-item.vue'
import listDivider from '../list/src/rs-list-divider.vue'
import listSubheader from '../list/src/rs-list-subheader.vue'
import listGroup from '../list/src/rs-list-group.vue'
import list from '../list/src/rs-list.vue'

export const ListTextPrimary = wrap(Vue, listTextPrimary)
export const ListTextSecondary = wrap(Vue, listTextSecondary)
export const ListText = wrap(Vue, listText)
export const ListGraphic = wrap(Vue, listGraphic)
export const ListMeta = wrap(Vue, listMeta)
export const ListItem = wrap(Vue, listItem)
export const ListDivider = wrap(Vue, listDivider)
export const ListSubheader = wrap(Vue, listSubheader)
export const ListGroup = wrap(Vue, listGroup)
export const List = wrap(Vue, list)