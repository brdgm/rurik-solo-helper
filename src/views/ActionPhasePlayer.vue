<template>
  <StrategyBoardPreview :strategy-board="strategyBoard"/>

  <AppIcon type="troop" :color="playerColor" class="troop"/>
  <h1 class="clearfix">{{t('actionPlayer.title')}}</h1>

  <PlayerAction/>

  <FooterButtons endGameButtonType="abortGame" :backButtonRouteTo="backButtonRouteTo"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/structure/AppIcon.vue'
import StrategyBoardPreview from '@/components/round/StrategyBoardPreview.vue'
import PlayerAction from '@/components/round/PlayerAction.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'ActionPhasePlayer',
  components: {
    AppIcon,
    StrategyBoardPreview,
    PlayerAction,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const playerColor = store.state.setup.playerColor
    const navigationState = new NavigationState(route, store)
    
    const round = navigationState.round
    const actionRound = navigationState.actionRound
    const strategyBoard = navigationState.strategyBoard

    return { t, store, playerColor, round, actionRound, strategyBoard }
  },
  computed: {
    backButtonRouteTo() : string {
      try {
        if (this.actionRound == 0) {
          const lastStrategyRound = this.store.state.rounds[this.round-1].strategyRound.length
          return '/round/' + this.round + '/strategy/' + lastStrategyRound
        }
        else {
          return '/round/' + this.round + '/action/bot/' + (this.actionRound - 1)
        }
      }
      catch {
        return ''
      }
    }
  }
})
</script>

<style lang="scss" scoped>
h1 {
  padding-top: 1rem;
}
.troop {
  float: left;
  height: 5rem;
}
</style>