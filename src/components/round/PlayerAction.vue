<template>
  <div class="float-end">
    <BotCoinPreview :botCoins="botCoins" @stealCoin="stealCoin" @giveCoin="giveCoin"/>
  </div>

  <div class="card mt-4" v-for="slot in nextActionSlots" :key="slot.action">
    <div class="card-body">
      <h3>{{t('gameAction.' + getAction(slot.action))}}</h3>

      <AppIcon type="advisor" :name="slot.advisor" :color="playerColor" class="advisor"/>
      <AppIcon type="slot-action" :name="slot.action" class="action"/>

      <button class="btn btn-primary btn-lg mt-3" @click="actionPlayed(slot)">
        {{t('action.next')}}
      </button>
    </div>
  </div>

  <p v-if="showLeaderAbility" class="mt-3 alert alert-warning">
    <b>{{t('leader.ability')}}</b>: {{t('leader.' + botLeader + '.ability')}}
  </p>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore, StrategyBoardSlot, ActionRoundPlayer } from '@/store/state'
import { useRoute } from 'vue-router'
import AppIcon from '../structure/AppIcon.vue'
import BotCoinPreview from './BotCoinPreview.vue'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'
import Action from '@/services/enum/Action'
import SlotAction from '@/services/enum/SlotAction'
import SlotActionMappings from '@/services/SlotActionMappings'
import Advisor from '@/services/enum/Advisor'
import BotLeader from '@/services/enum/BotLeader'

export default defineComponent({
  name: 'PlayerAction',
  components: {
    AppIcon,
    BotCoinPreview
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const route = useRoute()

    const playerColor = state.setup.playerColor
    const navigationState = new NavigationState(route, state)
    
    const round = navigationState.round
    const actionRound = navigationState.actionRound
    const botCoins = navigationState.botCoins
    const strategyBoard = navigationState.strategyBoard

    const nextActionSlots = strategyBoard.findNextAdvisorActions(Player.PLAYER)

    return { t, state, playerColor, round, actionRound, strategyBoard, botCoins, nextActionSlots }
  },
  computed: {
    nextButtonRouteTo() : string {
      return '/round/' + this.round + '/action/bot/' + this.actionRound
    },
    isAttack() : boolean {
      return this.nextActionSlots
          .map(slot => this.getAction(slot.action))
          .find(action => action == Action.ATTACK) != undefined
    },
    botLeader() : BotLeader {
      return this.state.setup.botLeader
    },
    showLeaderAbility() : boolean {
      return this.isAttack && this.botLeader == BotLeader.GLEB
    }
  },
  methods: {
    getAction(slotAction : SlotAction) : Action {
      return SlotActionMappings.get(slotAction).action
    },
    actionPlayed(slot: StrategyBoardSlot) : void {
      this.strategyBoard.removeAdvisor(slot.advisor as Advisor, Player.PLAYER)

      const actionRoundPlayer : ActionRoundPlayer = {
        round: this.round,
        actionRound : this.actionRound,
        botCoins : this.botCoins,
        strategyBoard : this.strategyBoard.toPersistence()
      }
      this.state.actionRoundPlayer(actionRoundPlayer)

      this.$router.push(this.nextButtonRouteTo)
    },
    stealCoin() : void {
      if (this.botCoins <= 0) {
        return
      }
      this.botCoins--
      this.$forceUpdate()
    },
    giveCoin() : void {
      this.botCoins++
      this.$forceUpdate()
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  width: 14rem;
  display: inline-block;
  margin-right: 1rem;
}
.advisor {
  height: 4rem;
  position: absolute;
}
.action {
  width: 12rem;
}
</style>
