import Vue from 'vue-custom'
import wrap from '@vue/web-component-wrapper'
import cardActions from './src/rs-card-actions.vue'
import cardMedia from './src/rs-card-media.vue'
import cardDescription from './src/rs-card-description.vue'
import cardSubtitle from './src/rs-card-subtitle.vue'
import cardTitle from './src/rs-card-title.vue'
import cardHeader from './src/rs-card-header.vue'
import cardContents from './src/rs-card-contents.vue'
import card from './src/rs-card.vue'

export const CardActions = wrap(Vue, cardActions)
export const CardMedia = wrap(Vue, cardMedia)
export const CardDescription = wrap(Vue, cardDescription)
export const CardSubtitle = wrap(Vue, cardSubtitle)
export const CardTitle = wrap(Vue, cardTitle)
export const CardHeader = wrap(Vue, cardHeader)
export const CardContents = wrap(Vue, cardContents)
export const Card = wrap(Vue, card)
