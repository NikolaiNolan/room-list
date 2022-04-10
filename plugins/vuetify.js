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
import Account from 'vue-material-design-icons/Account.vue';
import AccountArrowRight from 'vue-material-design-icons/AccountArrowRight.vue';
import AccountEdit from 'vue-material-design-icons/AccountEdit.vue';
import AccountMinus from 'vue-material-design-icons/AccountMinus.vue';
import AccountPlus from 'vue-material-design-icons/AccountPlus.vue';
import CalendarRange from 'vue-material-design-icons/CalendarRange.vue';
import CarSide from 'vue-material-design-icons/CarSide.vue';
import CashUsd from 'vue-material-design-icons/CashUsd.vue';
import Check from 'vue-material-design-icons/Check.vue';
import CheckboxBlankOutline from 'vue-material-design-icons/CheckboxBlankOutline.vue';
import CheckboxMarked from 'vue-material-design-icons/CheckboxMarked.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import City from 'vue-material-design-icons/City.vue';
import Close from 'vue-material-design-icons/Close.vue';
import Hotel from 'vue-material-design-icons/Hotel.vue';
import MapleLeaf from '~/components/MapleLeaf';
import MenuDown from 'vue-material-design-icons/MenuDown.vue';
import Needle from 'vue-material-design-icons/Needle.vue';
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
    account: {
      component: Account,
      props: {
        title: null,
        decorative: true,
      },
    },
    accountArrowRight: {
      component: AccountArrowRight,
      props: {
        title: null,
        decorative: true,
      },
    },
    accountMinus: {
      component: AccountMinus,
      props: {
        title: null,
        decorative: true,
      },
    },
    accountPlus: {
      component: AccountPlus,
      props: {
        title: null,
        decorative: true,
      },
    },
    calendarRange: {
      component: CalendarRange,
      props: {
        title: 'Arrival/departure dates',
        decorative: true,
      },
    },
    carSide: {
      component: CarSide,
      props: {
        title: null,
        decorative: true,
      },
    },
    cashUsd: {
      component: CashUsd,
      props: {
        title: null,
        decorative: true,
      },
    },
    check: {
      component: Check,
      props: {
        title: null,
        decorative: true,
      },
    },
    checkboxOff: {
      component: CheckboxBlankOutline,
      props: {
        title: null,
        decorative: true,
      },
    },
    checkboxOn: {
      component: CheckboxMarked,
      props: {
        title: null,
        decorative: true,
      },
    },
    city: {
      component: City,
      props: {
        title: null,
        decorative: true,
      },
    },
    close: {
      component: Close,
      props: {
        title: null,
        decorative: true,
      },
    },
    dropdown: {
      component: MenuDown,
      props: {
        title: null,
        decorative: true,
      },
    },
    edit: {
      component: AccountEdit,
      props: {
        title: null,
        decorative: true,
      },
    },
    expand: {
      component: ChevronDown,
      props: {
        title: null,
        decorative: true,
      },
    },
    hotel: {
      component: Hotel,
      props: {
        title: 'PayPal',
        decorative: true,
      },
    },
    mapleLeaf: {
      component: MapleLeaf,
      props: {
        title: null,
        decorative: true,
      },
    },
    needle: {
      component: Needle,
      props: {
        title: null,
        decorative: true,
      },
    },
    star: {
      component: Star,
      props: {
        title: null,
        decorative: true,
      },
    },
  },
});
