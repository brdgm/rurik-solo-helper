<template>
  <StrategyBoardPreview :strategy-board="strategyBoard"/>

  <AppIcon type="leader-mini" :name="botLeader" :color="botColor" class="mini"/>
  <h1 class="clearfix">{{t('actionBot.title')}}</h1>

  <BotAction/>

  <FooterButtons endGameButtonType="abortGame" :backButtonRouteTo="backButtonRouteTo"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/structure/AppIcon.vue'
import StrategyBoardPreview from '@/components/round/StrategyBoardPreview.vue'
import BotAction from '@/components/round/BotAction.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'ActionPhaseBot',
  components: {
    AppIcon,
    StrategyBoardPreview,
    BotAction,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const route = useRoute()

    const botLeader = state.setup.botLeader
    const botColor = state.setup.botColor
    const navigationState = new NavigationState(route, state)
    
    const { round, actionRound, strategyBoard } = navigationState

    return { t, botLeader, botColor, round, actionRound, strategyBoard }
  },
  computed: {
    backButtonRouteTo() : string {
      return '/round/' + this.round + '/action/player/' + this.actionRound
    }
  }
})
</script>

<style lang="scss" scoped>
h1 {
  padding-top: 1rem;
}
.mini {
  float: left;
  height: 5rem;
}
</style>