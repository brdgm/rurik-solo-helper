<template>
  <h1>{{t('strategy.title')}}</h1>

  <StrategyBoard/>

  <router-link v-if="nextButtonVisible" :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

  <FooterButtons endGameButtonType="abortGame" :backButtonRouteTo="backButtonRouteTo"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import { useRoute } from 'vue-router'
import StrategyBoard from '@/components/round/StrategyBoard.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'StrategyPhase',
  components: {
    StrategyBoard,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const route = useRoute()

    const navigationState = new NavigationState(route, state)
    
    const { round, strategyRound, strategyBoard } = navigationState

    return { t, round, strategyRound, strategyBoard }
  },
  computed: {
    nextButtonVisible() : boolean {
      return this.strategyBoard.playerAdvisorReserve.length == 0
    },
    nextButtonRouteTo() : string {
      return '/round/' + this.round + '/action/player/0'
    },
    backButtonRouteTo() : string {
      if (this.strategyRound == 0) {
        if (this.round == 1) {
          // no back button after start of game
          return ''
        }
        else {
          return '/round/' + (this.round - 1) + '/claim'
        }
      }
      else {
        return '/round/' + this.round + '/strategy/' + (this.strategyRound - 1)
      }
    }
  }
})
</script>
