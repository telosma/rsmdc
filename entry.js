import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import radio from './radio/src/rs-radio.vue'
import list from './list/src/rs-list.vue'
import listItem from './list/src/rs-list-item.vue'
import listGroup from './list/src/rs-list-group.vue'
import listSubheader from './list/src/rs-list-subheader.vue'


export const Radio = wrap(Vue, radio)
export const List = wrap(Vue, list)
export const ListItem = wrap(Vue, listItem)
export const ListGroup = wrap(Vue, listGroup)
export const ListSubheader = wrap(Vue, listSubheader)