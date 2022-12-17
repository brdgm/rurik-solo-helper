<template>
  <button class="btn btn-secondary mt-3 me-3 float-end" data-bs-toggle="modal" data-bs-target="#strategyBoardPreviewModal">
    {{t('strategy.boardPreview')}}
  </button>

  <ModalDialog id="strategyBoardPreviewModal" :title="t('strategy.boardPreview')" :size-lg="true">
    <template #body>
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
              <AppIcon type="slot-action" :name="slot.action" class="action"/>
              <template v-if="slot.advisor">
                <AppIcon type="advisor" :name="slot.advisor" :color="getPlayerColor(slot)" class="advisor"/>
              </template>
            </div>
          </td>
        </tr>
      </table>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { StrategyBoardSlot, useStore } from '@/store'
import AppIcon from '../structure/AppIcon.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import Color from '@/services/enum/Color'
import Player from '@/services/enum/Player'
import StrategyBoard from '@/services/StrategyBoard'

export default defineComponent({
  name: 'StrategyBoardPreview',
  components: {
    AppIcon,
    ModalDialog
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
