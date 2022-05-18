<template>
  <span class="coinCoinLabel">{{t('botCoinsPreview.label')}}</span>
  <a v-if="allowSteal && botCoins > 0" data-bs-toggle="modal" data-bs-target="#botCoinStealModal"><CoinCount class="coinCount" :value="botCoins"/></a>
  <CoinCount v-else class="coinCount" :value="botCoins"/>

  <div id="botCoinStealModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('botCoinsPreview.stealCoin.title')}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-html="t('botCoinsPreview.stealCoin.text')"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('stealCoin')">{{t('botCoinsPreview.stealCoin.title')}}</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import CoinCount from '../structure/CoinCount.vue'

export default defineComponent({
  name: 'BotCoinPreview',
  components: {
    CoinCount
  },
  emits: ['stealCoin'],
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  props: {
    botCoins: {
      type: Number,
      required: true
    },
    allowSteal: {
      type: Boolean,
      required: false
    }
  }
})
</script>

<style lang="scss" scoped>
.coinCoinLabel {
  font-size: 1.5rem;
}
.coinCount {
  font-size: 2.2rem;
}
a .coinCount {
  cursor: pointer;
}
</style>
