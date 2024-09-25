<template>
  
  <div class="advisors">
    <h3>{{t('strategy.advisorsBot')}}</h3>
    <AppIcon v-for="advisor in botAdvisorReserve" :key="advisor" type="advisor" :name="advisor" :color="botColor" class="advisor" />
    <CoinCount class="coinCount" :value="botCoins"/>
  </div>

  <table class="board">
    <thead>
      <tr class="background1">
        <th>{{t('gameAction.muster')}}</th>
        <th>{{t('gameAction.move')}}</th>
        <th>{{t('gameAction.attack')}}</th>
        <th>{{t('gameAction.tax')}}</th>
        <th>{{t('gameAction.build')}}</th>
        <th>{{t('gameAction.scheme')}}</th>
      </tr>
    </thead>
    <tr v-for="(row, rowIndex) in rows" :key="rowIndex" :class="{ background1: rowIndex % 2 != 0, background2: rowIndex % 2 == 0 }">
      <td v-for="(slot, colIndex) in row" :key="colIndex">
        <div class="slot" :class="{used: slot.advisor, clickTarget: playerAdvisorSelected && playerAdvisorAllowedTarget(rowIndex, colIndex)}"
            @drop.prevent="dragDrop($event, slot.action, rowIndex, colIndex)" @dragover.prevent @dragenter.prevent>
          <AppIcon type="slot-action" :name="slot.action" class="action" @click="playerAdvisorClickSlot(slot.action, rowIndex, colIndex)"/>
          <template v-if="slot.advisor">
            <AppIcon type="advisor" :name="slot.advisor" :color="getPlayerColor(slot)" class="advisor" @click="playerAdvisorClickSlot(slot.action, rowIndex, colIndex)"/>
            <CoinCount v-if="slot.coins" class="coinCount" :value="(slot.coins)" @click="playerAdvisorClickSlot(slot.action, rowIndex, colIndex)"/>
          </template>
        </div>
      </td>
    </tr>
  </table>

  <div class="advisors player" v-if="playerAdvisorReserve.length > 0">
    <h3 class="mt-3">{{t('strategy.advisorsPlayer')}}</h3>
    <AppIcon v-for="advisor in playerAdvisorReserve" :key="advisor" type="advisor" :name="advisor" :color="playerColor" class="advisor"
        :class="{notSelected: playerAdvisorSelected && advisor!=playerAdvisor}"
        draggable @dragstart="dragStart($event,advisor)" @click="playerAdvisorClick(advisor)"/>
    <div class="advisors-hint alert alert-light small" v-html="t('strategy.advisorsHint')"></div>
  </div>

  <ModalDialog id="putAdvisorCoinsModal" :title="t('strategy.putAdvisorCoins.title')">
    <template #body>
      <div class="container">
        <div class="row">
          <div class="col-8">
            <p>{{t('strategy.putAdvisorCoins.text')}}</p>
            <p><input type="number" min="0" max="20" v-model="playerCoins" @focus="inputSelectAll"/> {{t('strategy.putAdvisorCoins.coins')}}</p>
          </div>
          <div class="col-4">
            <AppIcon type="slot-action" :name="playerSlotAction" class="action"/>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button class="btn btn-primary" data-bs-dismiss="modal" @click="putPlayerAdvisor">{{t('strategy.putAdvisorCoins.title')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>

  <ModalDialog id="putAdvisorNotPossible" :title="t('strategy.putAdvisorNotPossible.title')">
    <template #body>
      <div class="alert alert-danger" role="alert">{{errorMessage}}</div>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { StrategyRound, StrategyBoardSlot, useStateStore } from '@/store/state'
import { useRoute } from 'vue-router'
import AppIcon from '../structure/AppIcon.vue'
import CoinCount from '../structure/CoinCount.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import Color from '@/services/enum/Color'
import Player from '@/services/enum/Player'
import SlotAction from '@/services/enum/SlotAction'
import Advisor from '@/services/enum/Advisor'
import NavigationState from '@/util/NavigationState'
import getErrorMessage from '@brdgm/brdgm-commons/src/util/error/getErrorMessage'
import { Modal } from 'bootstrap'
import BotStrategy from '@/services/BotStrategy'

export default defineComponent({
  name: 'StrategyBoard',
  components: {
    AppIcon,
    CoinCount,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const route = useRoute()

    const navigationState = new NavigationState(route, state)
    
    const difficultyLevel = navigationState.difficultyLevel
    const round = navigationState.round
    const actionPriority = navigationState.actionPriority
    const cardDeck = navigationState.cardDeck
    const strategyRound = navigationState.strategyRound
    const botCoins = navigationState.botCoins
    const strategyBoard = navigationState.strategyBoard

    return { t, state, difficultyLevel, round, cardDeck, actionPriority, strategyRound, botCoins, strategyBoard }
  },
  data() {
    return {      
      playerSlotAction: SlotAction.ATTACK_1,
      playerAdvisor: Advisor.ONE,
      playerAdvisorSelected: false,
      playerCoins: 0,
      errorMessage: ''
    }
  },
  computed: {
    playerColor() : Color {
      return this.state.setup.playerColor
    },
    botColor() : Color {
      return this.state.setup.botColor
    },
    rows() : StrategyBoardSlot[][] {
      return this.strategyBoard.getRows()
    },
    playerAdvisorReserve() : readonly Advisor[] {
      return this.strategyBoard.playerAdvisorReserve
    },
    botAdvisorReserve() : readonly Advisor[] {
      return this.strategyBoard.botAdvisorReserve
    }
  },
  methods: {
    getPlayerColor(slot : StrategyBoardSlot) : Color {
      if (slot.player == Player.PLAYER) {
        return this.playerColor
      }
      else {
        return this.botColor
      }
    },
    playerAdvisorClick(advisor : Advisor) : void {
      if (this.playerAdvisorSelected && this.playerAdvisor == advisor) {
        this.playerAdvisorSelected = false
      }
      else {
        this.playerAdvisor = advisor
        this.playerAdvisorSelected = true
      }
    },
    playerAdvisorAllowedTarget(rowIndex : number, colIndex : number) : boolean {
      let anyFreeSlot = false
      for (let row = 0; row < this.rows.length; row++) {
        if (row < rowIndex && !this.rows[row][colIndex].advisor) {
          return false
        }
        anyFreeSlot = anyFreeSlot || !this.rows[row][colIndex].advisor
      }
      return anyFreeSlot
    },
    playerAdvisorClickSlot(action : SlotAction, rowIndex : number, colIndex : number) : void {
      if (!this.playerAdvisorSelected || !this.playerAdvisorAllowedTarget(rowIndex, colIndex)) {
        return
      }
      this.putPlayerAdvisorAskForCoins(action, this.playerAdvisor)
    },
    dragStart(evt : DragEvent, advisor : Advisor) {
      if (!evt.dataTransfer) {
        return
      }
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('advisor', advisor)
      this.playerAdvisor = advisor
      this.playerAdvisorSelected = true
    },
    dragDrop(evt : DragEvent, action : SlotAction, rowIndex : number, colIndex : number) : void {
      if (!evt.dataTransfer || !this.playerAdvisorAllowedTarget(rowIndex, colIndex)) {
        return
      }

      const advisor = evt.dataTransfer.getData('advisor') as Advisor
      this.putPlayerAdvisorAskForCoins(action, advisor)
    },
    putPlayerAdvisorAskForCoins(action : SlotAction, advisor : Advisor) : void {
      this.playerSlotAction = action
      this.playerAdvisor = advisor
      this.playerCoins = 0
      this.playerAdvisorSelected = false
      const modal = new Modal(document.getElementById('putAdvisorCoinsModal') as Element)
      modal.show()
    },
    putPlayerAdvisor() : void {
      try {
        this.strategyBoard.putAdvisor(this.playerSlotAction, this.playerAdvisor, Player.PLAYER, this.playerCoins)
      }
      catch (err : unknown) {
        this.errorMessage = getErrorMessage(err, translErr => this.t(translErr.key, translErr.named, translErr.plural))
        const modal = new Modal(document.getElementById('putAdvisorNotPossible') as Element)
        modal.show()
        return
      }
      
      this.putBotAdvisor()
      this.storeForNextStrategyRound()
      this.$router.push('/round/' + this.round + '/strategy/' + (this.strategyRound + 1))
    },
    putBotAdvisor() : void {
      const bot = new BotStrategy(this.round, this.actionPriority, this.botCoins)
      bot.placeNextAdvisor(this.strategyBoard, this.cardDeck.activeCard)
      this.botCoins = bot.coins
    },
    storeForNextStrategyRound() : void {
      const strategyRound : StrategyRound = {
        round: this.round,
        strategyRound: this.strategyRound+1,
        botCoins: this.botCoins,
        strategyBoard: this.strategyBoard.toPersistence()
      }
      this.state.strategyRound(strategyRound)
    },
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
    }
  }
})
</script>

<style lang="scss" scoped>
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/grid";
.board {
  max-width: 52rem;
  th {
    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    width: calc(100%/6);
    font-size: 1rem;
    height: 2rem;
  }
  @include media-breakpoint-up(md) {
    th {
      font-size: 1.2rem;
      height: 2.5rem;
    }
  }
  .background1 {
    th, td {
      background-image: url(@/assets/background/bg-strategy-board-1.png);
      background-size: 100% auto;
    }
  }
  .background2 {
    th, td {
      background-image: url(@/assets/background/bg-strategy-board-2.png);
      background-size: 100% auto;
    }
  }
  .slot {
    position: relative;
    .action {
      width: 100%;
      padding: 0.75rem;
    }
    &.used .action {
      filter: brightness(50%);
    }
    &.clickTarget {      
      .action {
        background: rgba(255,255,255,.4);
        border-radius: 50%;
        cursor: pointer;
      }
      .advisor, .coinCount {
        cursor: pointer;
      }
    }
    .advisor {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: drop-shadow(1px 1px 2px #fff) drop-shadow(-1px -1px 2px #fff);
    }
    .coinCount {
      position: absolute;
      right: 15%;
      bottom: 10%;      
    }
  }
}
.advisor {
  width: 3.5rem;
}
.coinCount {
  width: 3rem;
  font-size: 1.6rem;
}
.slot .coinCount {
  width: 2.5rem;
  font-size: 1.4rem;
}
@include media-breakpoint-up(md) {
  .advisor {
    width: 5rem;
  }
  .coinCount {
    width: 4rem;
    font-size: 2.2rem;
  }
  .slot .coinCount {
    width: 3rem;
    font-size: 1.6rem;
  }
}
.advisors {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  h3 {
    display: inline-block;
  }
}
.advisors.player .advisor {
  cursor: pointer;
  &.notSelected {
    filter: brightness(50%);
  }
}
.advisors-hint {
  display: inline-block;
  margin-left: 0.5rem;
}
.modal .action {
  width: 100%;
}
</style>
