import Vue from 'vue'
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
  VMenu
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
    transitions
  },
  theme: {
    primary: '#7952b3', // a color that is not in the material colors palette
    accent: colors.grey.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
    infoBgcolor: colors.grey.lighten2,
    bgText: colors.grey.lighten4
  }
})
