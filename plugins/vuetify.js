

import Vue from 'vue'
Vue.config.devtools = true

import {
  Vuetify,
  VApp,
  VCard,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VImg,
  VHover,
  VRating,
  VDivider,
  VProgressCircular,
  VChip,
  VAvatar,
  VDialog,
  VCarousel,
  VResponsive,
  VTextField,
  VForm,
  VTextarea,
  VMenu,
  VTabs,
  VAlert,
  VAutocomplete,
  VTooltip,
  VBadge,
  VBottomNav,
  VParallax
} from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import transitions from 'vuetify/es5/components/transitions'

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VImg,
    VHover,
    VRating,
    VDivider,
    VProgressCircular,
    VChip,
    VAvatar,
    VDialog,
    VCarousel,
    VResponsive,
    VTextField,
    VForm,
    VTextarea,
    VMenu,
    transitions,
    VTabs,
    VAlert,
    VAutocomplete,
    VTooltip,
    VBadge,
    VBottomNav,
    VParallax
  },
  theme: {
    primary: '#7952b3', // a color that is not in the material colors palette
    secondary: colors.purple.darken2,
    subprimary: '#BB86FC',
    accent: colors.grey.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
    infoBgcolor: colors.grey.lighten2,
    bgText: colors.grey.lighten4,
    subTitle: colors.grey.darken2,
    bodyBg: '#2c3440',
    text: '#9ab',
    facebook: '#4267b2',
    twitter: '#1da1f2',
    google: '#db4437'
  }
})
