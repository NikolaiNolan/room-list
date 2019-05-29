import Vue from 'vue';
import Vuetify, {
  VApp,
  VAvatar,
  VBtn,
  VCheckbox,
  VDivider,
  VExpansionPanel,
  VExpansionPanelContent,
  VFlex,
  VIcon,
  VLayout,
  VList,
  VListGroup,
  VListTile,
  VListTileAction,
  VListTileAvatar,
  VListTileContent,
  VListTileTitle,
  VListTileSubTitle,
  VRangeSlider,
  VSelect,
  VSpacer,
  VSubheader,
} from 'vuetify/lib';
import AccountArrowRight from 'vue-material-design-icons/AccountArrowRight.vue';
import AccountCircle from 'vue-material-design-icons/AccountCircle.vue';
import AccountMinus from 'vue-material-design-icons/AccountMinus.vue';
import AccountPlus from 'vue-material-design-icons/AccountPlus.vue';
import CalendarRange from 'vue-material-design-icons/CalendarRange.vue';
import Car from 'vue-material-design-icons/Car.vue';
import CashUsd from 'vue-material-design-icons/CashUsd.vue';
import Check from 'vue-material-design-icons/Check.vue';
import CheckboxBlankOutline from 'vue-material-design-icons/CheckboxBlankOutline.vue';
import CheckboxMarked from 'vue-material-design-icons/CheckboxMarked.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import City from 'vue-material-design-icons/City.vue';
import Hotel from 'vue-material-design-icons/Hotel.vue';
import MapleLeaf from '~/components/MapleLeaf';
import Star from 'vue-material-design-icons/Star.vue';

Vue.use(Vuetify, {
  components: {
    VApp,
    VAvatar,
    VBtn,
    VCheckbox,
    VDivider,
    VExpansionPanel,
    VExpansionPanelContent,
    VFlex,
    VIcon,
    VLayout,
    VList,
    VListGroup,
    VListTile,
    VListTileAction,
    VListTileAvatar,
    VListTileContent,
    VListTileTitle,
    VListTileSubTitle,
    VRangeSlider,
    VSelect,
    VSpacer,
    VSubheader,
  },
  icons: {
    accountArrowRight: { component: AccountArrowRight },
    accountCircle: { component: AccountCircle },
    accountMinus: { component: AccountMinus },
    accountPlus: { component: AccountPlus },
    calendarRange: { component: CalendarRange },
    car: { component: Car },
    cashUsd: { component: CashUsd },
    check: { component: Check },
    checkboxOff: { component: CheckboxBlankOutline },
    checkboxOn: { component: CheckboxMarked },
    city: { component: City },
    expand: { component: ChevronDown },
    hotel: { component: Hotel },
    mapleLeaf: { component: MapleLeaf },
    star: { component: Star },
  },
});
