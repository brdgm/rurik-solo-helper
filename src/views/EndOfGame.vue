<template>
  <h1>{{t('end.title')}}</h1>

  <h3 class="mt-4">{{t('end.botScoring.title')}}</h3>
  <ul>
    <li v-html="t('end.botScoring.tracks')"></li>
    <li v-html="t('end.botScoring.warfare')"></li>
    <li>
      <span v-html="t('end.botScoring.coins',{coinsVP:coinsVP,botCoins:botCoins},coinsVP)"></span><br/>
      <span v-html="t('end.botScoring.coinsNote')"></span>
    </li>
    <li v-if="isStoneBladeExpansion" v-html="t('end.botScoring.goodsStoneBlade')"></li>
    <li v-else v-html="t('end.botScoring.goods')"></li>
  </ul>

  <FooterButtons endGameButtonType="endGame" :backButtonRouteTo="backButtonRouteTo"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import { useRoute } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const route = useRoute()

    const navigationState = new NavigationState(route, state)
    const botCoins = navigationState.botCoins
    
    const round = navigationState.round

    return { t, state, round, botCoins }
  },
  computed: {
    backButtonRouteTo() : string {
      return '/round/' + this.round + '/claim'
    },
    coinsVP() : number {
      return Math.ceil(this.botCoins / 3)
    },
    isStoneBladeExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.STONE_BLADE)
    }
  }
})
</script>
