<template>
  <span class="coinCoinLabel">{{t('botCoinsPreview.label')}}</span>
  <a data-bs-toggle="modal" data-bs-target="#botCoinStealModal"><CoinCount class="coinCount" :value="botCoins"/></a>

  <div id="botCoinStealModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('botCoinsPreview.stealGiveCoin.title')}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-html="t('botCoinsPreview.stealGiveCoin.text')"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('stealCoin')" :disabled="botCoins < 1">{{t('botCoinsPreview.stealGiveCoin.stealCoin')}}</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('giveCoin')">{{t('botCoinsPreview.stealGiveCoin.giveCoin')}}</button>
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
  emits: ['stealCoin','giveCoin'],
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  props: {
    botCoins: {
      type: Number,
      required: true
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
