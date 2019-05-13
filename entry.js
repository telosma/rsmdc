import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import button from './button/src/rs-button.vue'
import buttonIcon from './button/src/rs-button-icon.vue'
import radio from './radio/src/rs-radio.vue'
import listDivider from './list/src/rs-list-divider.vue'
import listSubheader from './list/src/rs-list-subheader.vue'
import list from './list/src/rs-list.vue'
import listItem from './list/src/rs-list-item.vue'
import listItemGraphic from './list/src/rs-list-item-graphic.vue'
import listItemMeta from './list/src/rs-list-item-meta.vue'
import listItemText from './list/src/rs-list-item-text.vue'
import menuSurface from './menu-surface/src/rs-menu-surface.vue'
import menu from './menu/src/rs-menu.vue'
import menuListGroup from './menu/src/rs-menu-list-group.vue'
import topAppBar from './top-app-bar/src/rs-top-app-bar.vue'
import topAppBarNavigationIcon from './top-app-bar/src/rs-top-app-bar-navigation-icon.vue'
import topAppBarActionItem from './top-app-bar/src/rs-top-app-bar-action-item.vue'
import drawer from './drawer/src/rs-drawer.vue'
import drawerHeader from './drawer/src/rs-drawer-header.vue'
import drawerContent from './drawer/src/rs-drawer-content.vue'
import appLayout from './app-layout/src/rs-app-layout.vue'
import appLayoutContent from './app-layout/src/rs-app-layout-content.vue'

export const Button = wrap(Vue, button)
export const ButtonIcon = wrap(Vue, buttonIcon)
export const Radio = wrap(Vue, radio)
export const ListDivider = wrap(Vue, listDivider)
export const ListSubheader = wrap(Vue, listSubheader)
export const List = wrap(Vue, list)
export const ListItem = wrap(Vue, listItem)
export const ListItemGraphic = wrap(Vue, listItemGraphic)
export const ListItemMeta = wrap(Vue, listItemMeta)
export const ListItemText = wrap(Vue, listItemText)
export const MenuSurface = wrap(Vue, menuSurface)
export const Menu = wrap(Vue, menu)
export const MenuListGroup = wrap(Vue, menuListGroup)
export const TopAppBar = wrap(Vue, topAppBar)
export const TopAppBarNavigationIcon = wrap(Vue, topAppBarNavigationIcon)
export const TopAppBarActionItem = wrap(Vue, topAppBarActionItem)
export const Drawer = wrap(Vue, drawer)
export const DrawerHeader = wrap(Vue, drawerHeader)
export const DrawerContent = wrap(Vue, drawerContent)
export const AppLayout = wrap(Vue, appLayout)
export const AppLayoutContent = wrap(Vue, appLayoutContent)
