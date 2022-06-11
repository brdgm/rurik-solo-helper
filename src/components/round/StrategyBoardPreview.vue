<template>
  <button class="btn btn-secondary mt-3 me-3 float-end" data-bs-toggle="modal" data-bs-target="#strategyBoardPreviewModal">
    {{t('strategy.boardPreview')}}
  </button>

  <div id="strategyBoardPreviewModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('strategy.boardPreview')}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
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
                <div class="slot" :class="{used: slot.advisor}">
                  <Icon type="slot-action" :name="slot.action" class="action"/>
                  <template v-if="slot.advisor">
                    <Icon type="advisor" :name="slot.advisor" :color="getPlayerColor(slot)" class="advisor"/>
                  </template>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { StrategyBoardSlot, useStore } from '@/store'
import Icon from '../structure/Icon.vue'
import Color from '@/services/enum/Color'
import Player from '@/services/enum/Player'
import StrategyBoard from '@/services/StrategyBoard'

export default defineComponent({
  name: 'StrategyBoardPreview',
  components: {
    Icon
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  props: {
    strategyBoard: {
      type: StrategyBoard,
      required: true
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
    }
  }
})
</script>

<style lang="scss" scoped>
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
  }
}
.advisor {
  width: 4.5rem;
}
.slot .coinCount {
  width: 2.5rem;
  font-size: 1.4rem;
}
</style>
