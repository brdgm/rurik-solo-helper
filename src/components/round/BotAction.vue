<template>
  <div class="float-end">
    <BotCoinPreview :botCoins="bot.coins" @stealCoin="stealCoin" @giveCoin="giveCoin"/>
    <div class="mt-3 me-2">
      <h6>{{t('actionBot.locationOrder')}}</h6>
      <ol>
        <li v-for="location of locationOrder" :key="location">{{location}}</li>
      </ol>
    </div>
  </div>
  
  <div class="flex">
    <div class="card mt-4">
      <div class="card-body">
        <h3>{{t('gameAction.' + action)}}</h3>

        <AppIcon type="advisor" :name="slot.advisor" :color="botColor" class="advisor"/>
        <AppIcon v-if="actionAllowed" type="slot-action" :name="slot.action" class="action"/>
        <AppIcon v-else type="bonus-action" :name="oneCoinBonusAction" class="bonusAction mt-5"/>

        <template v-for="(bonusAction, index) of bonusActions" :key="index">
          <AppIcon type="bonus-action" :name="bonusAction.bonusAction" class="bonusAction"/>
        </template>

        <button class="btn btn-primary btn-lg mt-3" @click="actionPlayed(slot)">
          {{t('action.next')}}
        </button>
      </div>
    </div>

    <div class="instructions mt-4 p-2">
      <ActionMuster v-if="isMuster"/>
      <ActionMove v-if="isMove" :actionPriority="actionPriority"/>
      <ActionAttack v-if="isAttack" :actionPriority="actionPriority" :botLeader="botLeader" :isStoneBladeExpansion="isStoneBladeExpansion"/>
      <ActionTax v-if="isTax" :botLeader="botLeader" :isStoneBladeExpansion="isStoneBladeExpansion"/>
      <ActionBuild v-if="isBuild" :cardDeck="cardDeck" :actionPriority="actionPriority" :botLeader="botLeader" :botColor="botColor" :isStoneBladeExpansion="isStoneBladeExpansion" @unlockBonusAction="unlockBonusAction"/>
      <ActionScheme v-if="isScheme"/>

      <template v-if="hasMoveBonusAction">
        <hr/>
        <h3>{{t('gameAction.move')}}</h3>
        <ActionMove :actionPriority="actionPriority"/>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore, StrategyBoardSlot, ActionRoundBot } from '@/store'
import { useRoute } from 'vue-router'
import AppIcon from '../structure/AppIcon.vue'
import BotCoinPreview from './BotCoinPreview.vue'
import ActionMuster from './instructions/ActionMuster.vue'
import ActionMove from './instructions/ActionMove.vue'
import ActionAttack from './instructions/ActionAttack.vue'
import ActionTax from './instructions/ActionTax.vue'
import ActionBuild from './instructions/ActionBuild.vue'
import ActionScheme from './instructions/ActionScheme.vue'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'
import SlotActionMappings from '@/services/SlotActionMappings'
import Advisor from '@/services/enum/Advisor'
import BotAction from '@/services/BotAction'
import Action from '@/services/enum/Action'
import Expansion from '@/services/enum/Expansion'
import { capitalize } from 'lodash'
import BotLeader from '@/services/enum/BotLeader'
import BonusAction from '@/services/enum/BonusAction'

export default defineComponent({
  name: 'BotAction',
  components: {
    AppIcon,
    BotCoinPreview,
    ActionMuster,
    ActionMove,
    ActionAttack,
    ActionTax,
    ActionBuild,
    ActionScheme,
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const botColor = store.state.setup.botColor
    const navigationState = new NavigationState(route, store)
    
    const round = navigationState.round
    const actionPriority = navigationState.actionPriority
    const cardDeck = navigationState.cardDeck
    const actionRound = navigationState.actionRound
    const strategyBoard = navigationState.strategyBoard

    const slot = strategyBoard.findNextAdvisorActions(Player.BOT)[0]
    const action = SlotActionMappings.get(slot.action).action

    const bot = new BotAction(navigationState.difficultyLevel, navigationState.botCoins, navigationState.bonusActions)
    const bonusActions = bot.getBonusActions(action)
    const actionAllowed = bot.executeAutomaticActions(slot.action, bonusActions)

    return { t, botColor, round, actionPriority, cardDeck, actionRound, strategyBoard, slot, action, actionAllowed, bot, bonusActions }
  },
  computed: {
    nextButtonRouteTo() : string {
      if (this.strategyBoard.getPlacedAdvisorCount(Player.PLAYER) == 0) {
        return '/round/' + this.round + '/claim'
      }
      else {
        return '/round/' + this.round + '/action/player/' + (this.actionRound + 1)
      }
    },
    locationOrder() : string[] {
      return this.cardDeck.activeCard.locationOrder.map(location => capitalize(location as string))
    },
    isStoneBladeExpansion() : boolean {
      return this.$store.state.setup.expansions.includes(Expansion.STONE_BLADE)
    },
    isMuster() : boolean {
      return this.action == Action.MUSTER
    },
    isMove() : boolean {
      return this.action == Action.MOVE
    },
    isAttack() : boolean {
      return this.action == Action.ATTACK
    },
    isTax() : boolean {
      return this.action == Action.TAX
    },
    isBuild() : boolean {
      return this.action == Action.BUILD
    },
    isScheme() : boolean {
      return this.action == Action.SCHEME
    },
    botLeader() : BotLeader {
      return this.$store.state.setup.botLeader
    },
    hasMoveBonusAction() : boolean {
      if (this.action == Action.MOVE) {
        // main action is move - ignore additional bonus move actions
        return false
      }
      return this.bonusActions.find(item => item.bonusAction == BonusAction.MOVE) != undefined
    },
    oneCoinBonusAction() : BonusAction {
      return BonusAction.COIN_1
    }
  },
  methods: {
    actionPlayed(slot: StrategyBoardSlot) : void {
      this.strategyBoard.removeAdvisor(slot.advisor as Advisor, Player.BOT)

      const actionRoundBot : ActionRoundBot = {
        round: this.round,
        actionRound : this.actionRound,
        botCoins : this.bot.coins,
        strategyBoard : this.strategyBoard.toPersistence(),
        bonusActions : this.bot.bonusActions
      }
      this.$store.commit('actionRoundBot', actionRoundBot)

      this.$router.push(this.nextButtonRouteTo)
    },
    unlockBonusAction() : void {
      this.bot.unlockNextBonusAction()
      this.$forceUpdate()
    },
    stealCoin() : void {
      this.bot.stealCoin()
      this.$forceUpdate()
    },
    giveCoin() : void {
      this.bot.giveCoin()
      this.$forceUpdate()
    }
  }
})
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.card {
  width: 14rem;
  margin-right: 1rem;
}
.advisor {
  height: 4rem;
  position: absolute;
}
.action {
  width: 12rem;
}
.bonusAction {
  width: 6rem;
}
button {
  display: block;
}
.instructions {
  width: 60%;
}
</style>
