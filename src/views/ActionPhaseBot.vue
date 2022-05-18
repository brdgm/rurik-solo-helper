<template>
  <StrategyBoardPreview :strategy-board="strategyBoard"/>

  <Icon type="leader-mini" :name="botLeader" :color="botColor" class="mini"/>
  <h1 class="clearfix">{{t('actionBot.title')}}</h1>

  <BotAction/>

  <FooterButtons endGameButtonType="abortGame" :backButtonRouteTo="backButtonRouteTo"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import Icon from '@/components/structure/Icon.vue'
import StrategyBoardPreview from '@/components/round/StrategyBoardPreview.vue'
import BotAction from '@/components/round/BotAction.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'ActionPhaseBot',
  components: {
    Icon,
    StrategyBoardPreview,
    BotAction,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const botLeader = store.state.setup.botLeader
    const botColor = store.state.setup.botColor
    const navigationState = new NavigationState(route, store)
    
    const round = navigationState.round
    const actionRound = navigationState.actionRound
    const strategyBoard = navigationState.strategyBoard

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