import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import button from '../button/src/rs-button.vue'
import radio from '../radio/src/rs-radio.vue'
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
import cardActions from '../card/src/rs-card-actions.vue'
import cardMedia from '../card/src/rs-card-media.vue'
import cardDescription from '../card/src/rs-card-description.vue'
import cardSubtitle from '../card/src/rs-card-subtitle.vue'
import cardTitle from '../card/src/rs-card-title.vue'
import cardHeader from '../card/src/rs-card-header.vue'
import cardContents from '../card/src/rs-card-contents.vue'
import card from '../card/src/rs-card.vue'
import topAppBarActionItem from '../top-app-bar/src/rs-top-app-bar-action-item.vue'
import topAppBarActions from '../top-app-bar/src/rs-top-app-bar-actions.vue'
import topAppBarTitle from '../top-app-bar/src/rs-top-app-bar-title.vue'
import topAppBarNav from '../top-app-bar/src/rs-top-app-bar-nav.vue'
import topAppBar from '../top-app-bar/src/rs-top-app-bar.vue'
import menu from '../menu/src/rs-menu.vue'
import drawerContent from '../drawer/src/rs-drawer-content.vue'
import drawerTitle from '../drawer/src/rs-drawer-title.vue'
import drawerSubtitle from '../drawer/src/rs-drawer-subtitle.vue'
import drawerHeader from '../drawer/src/rs-drawer-header.vue'
import drawer from '../drawer/src/rs-drawer.vue'
import appLayoutContent from '../app-layout/src/rs-app-layout-content.vue'
import appLayout from '../app-layout/src/rs-app-layout.vue'
import checkbox from '../checkbox/src/rs-checkbox.vue'

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
export const CardActions = wrap(Vue, cardActions)
export const CardMedia = wrap(Vue, cardMedia)
export const CardDescription = wrap(Vue, cardDescription)
export const CardSubtitle = wrap(Vue, cardSubtitle)
export const CardTitle = wrap(Vue, cardTitle)
export const CardHeader = wrap(Vue, cardHeader)
export const CardContents = wrap(Vue, cardContents)
export const Card = wrap(Vue, card)
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
export const Checkbox = wrap(Vue, checkbox)