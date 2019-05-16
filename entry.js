import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import button from './packages/button/src/rs-button.vue'
import radio from './packages/radio/src/rs-radio.vue'
import listTextPrimary from './packages/list/src/rs-list-text-primary.vue'
import listTextSecondary from './packages/list/src/rs-list-text-secondary.vue'
import listText from './packages/list/src/rs-list-text.vue'
import listGraphic from './packages/list/src/rs-list-graphic.vue'
import listMeta from './packages/list/src/rs-list-meta.vue'
import listItem from './packages/list/src/rs-list-item.vue'
import listDivider from './packages/list/src/rs-list-divider.vue'
import listSubheader from './packages/list/src/rs-list-subheader.vue'
import listGroup from './packages/list/src/rs-list-group.vue'
import list from './packages/list/src/rs-list.vue'
import topAppBarActionItem from './packages/top-app-bar/src/rs-top-app-bar-action-item.vue'
import topAppBarActions from './packages/top-app-bar/src/rs-top-app-bar-actions.vue'
import topAppBarTitle from './packages/top-app-bar/src/rs-top-app-bar-title.vue'
import topAppBarNav from './packages/top-app-bar/src/rs-top-app-bar-nav.vue'
import topAppBar from './packages/top-app-bar/src/rs-top-app-bar.vue'
import menu from './packages/menu/src/rs-menu.vue'
import drawerContent from './packages/drawer/src/rs-drawer-content.vue'
import drawerTitle from './packages/drawer/src/rs-drawer-title.vue'
import drawerSubtitle from './packages/drawer/src/rs-drawer-subtitle.vue'
import drawerHeader from './packages/drawer/src/rs-drawer-header.vue'
import drawer from './packages/drawer/src/rs-drawer.vue'
import appLayoutContent from './packages/app-layout/src/rs-app-layout-content.vue'
import appLayout from './packages/app-layout/src/rs-app-layout.vue'

export const Button = wrap(Vue, button)
export const Radio = wrap(Vue, radio)
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
export const TopAppBarActionItem = wrap(Vue, topAppBarActionItem)
export const TopAppBarActions = wrap(Vue, topAppBarActions)
export const TopAppBarTitle = wrap(Vue, topAppBarTitle)
export const TopAppBarNav = wrap(Vue, topAppBarNav)
export const TopAppBar = wrap(Vue, topAppBar)
export const DrawerContent = wrap(Vue, drawerContent)
export const DrawerTitle = wrap(Vue, drawerTitle)
export const DrawerSubtitle = wrap(Vue, drawerSubtitle)
export const DrawerHeader = wrap(Vue, drawerHeader)
export const Drawer = wrap(Vue, drawer)
export const Menu = wrap(Vue, menu)
export const AppLayoutContent = wrap(Vue, appLayoutContent)
export const AppLayout = wrap(Vue, appLayout)
