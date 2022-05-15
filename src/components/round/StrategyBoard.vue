<template>
  
  <div class="advisors">
    <h3>{{t('strategy.advisorsBot')}}</h3>
    <Icon v-for="advisor in botAdvisorReserve" :key="advisor" type="advisor" :name="advisor" :color="botColor" class="advisor" />
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
        <div class="slot" :class="{used: slot.advisor}"
            @drop.prevent="dragDrop($event, slot.action)" @dragover.prevent @dragenter.prevent>
          <Icon type="slot-action" :name="slot.action" class="action"/>
          <template v-if="slot.advisor">
            <Icon type="advisor" :name="slot.advisor" :color="getPlayerColor(slot)" class="advisor"/>
            <CoinCount v-if="slot.coins" class="coinCount" :value="(slot.coins)"/>
          </template>
        </div>
      </td>
    </tr>
  </table>

  <div class="advisors player">
    <h3 class="mt-3">{{t('strategy.advisorsPlayer')}}</h3>
    <Icon v-for="advisor in playerAdvisorReserve" :key="advisor" type="advisor" :name="advisor" :color="playerColor" class="advisor"
        draggable @dragstart="dragStart($event,advisor)"/>
  </div>

  <div class="modal" id="putAdvisorCoinsModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><span v-html="t('strategy.putAdvisorCoins.title')"></span></h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-8">
                <p>{{t('strategy.putAdvisorCoins.text')}}</p>
                <p><input type="number" min="0" max="20" v-model="playerCoins" @focus="inputSelectAll"/> {{t('strategy.putAdvisorCoins.coins')}}</p>
              </div>
              <div class="col-4">
                <Icon type="slot-action" :name="playerSlotAction" class="action"/>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" data-bs-dismiss="modal" @click="putPlayerAdvisor">{{t('strategy.putAdvisorCoins.title')}}</button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="putAdvisorNotPossible" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><span v-html="t('strategy.putAdvisorNotPossible.title')"></span></h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger" role="alert">{{errorMessage}}</div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { StrategyRound, useStore } from '@/store'
import { useRoute } from 'vue-router'
import Icon from '../structure/Icon.vue'
import CoinCount from '../structure/CoinCount.vue'
import Color from '@/services/enum/Color'
import Player from '@/services/enum/Player'
import SlotAction from '@/services/enum/SlotAction'
import { StrategyBoardSlot } from "@/store";
import Advisor from '@/services/enum/Advisor'
import NavigationState from '@/util/NavigationState'
import getErrorMessage from '@/util/getErrorMessage'
import { Modal } from 'bootstrap'
import BotStrategy from '@/services/BotStrategy'

export default defineComponent({
  name: 'StrategyBoard',
  components: {
    Icon,
    CoinCount
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const navigationState = new NavigationState(route, store)
    
    const difficultyLevel = navigationState.difficultyLevel
    const round = navigationState.round
    const actionPriority = navigationState.actionPriority
    const cardDeck = navigationState.cardDeck
    const strategyRound = navigationState.strategyRound
    const botCoins = navigationState.botCoins
    const strategyBoard = navigationState.strategyBoard

    return { t, difficultyLevel, round, cardDeck, actionPriority, strategyRound, botCoins, strategyBoard }
  },
  data() {
    return {
      playerSlotAction: SlotAction.ATTACK_1,
      playerAdvisor: Advisor.ONE,
      playerCoins: 0,
      errorMessage: ''
    }
  },
  computed: {
    playerColor() : Color {
      return this.$store.state.setup.playerColor
    },
    botColor() : Color {
      return this.$store.state.setup.botColor
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
    getPlayerColor(slot : StrategyBoardSlot) {
      if (slot.player == Player.PLAYER) {
        return this.playerColor
      }
      else {
        return this.botColor
      }
    },
    dragStart(evt : DragEvent, advisor : Advisor) {
      if (!evt.dataTransfer) {
        return;
      }
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('advisor', advisor)
    },
    dragDrop(evt : DragEvent, action : SlotAction) {
      if (!evt.dataTransfer) {
        return;
      }

      const advisor = evt.dataTransfer.getData('advisor') as Advisor
      this.putPlayerAdvisorAskForCoins(action, advisor)
    },
    putPlayerAdvisorAskForCoins(action : SlotAction, advisor : Advisor) : void {
      this.playerSlotAction = action
      this.playerAdvisor = advisor
      this.playerCoins = 0
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
    putBotAdvisor() {
      const bot = new BotStrategy(this.difficultyLevel, this.round, this.actionPriority, this.botCoins)
      bot.placeNextAdvisor(this.strategyBoard, this.cardDeck.activeCard)
      this.botCoins = bot.coins
    },
    storeForNextStrategyRound() {
      const strategyRound : StrategyRound = {
        round: this.round,
        strategyRound: this.strategyRound+1,
        botCoins: this.botCoins,
        strategyBoard: this.strategyBoard.toPersistence()
      }
      this.$store.commit('strategyRound', strategyRound)
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
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/grid";
.board {
  max-width: 60rem;
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
}
.modal .action {
  width: 100%;
}
</style>
