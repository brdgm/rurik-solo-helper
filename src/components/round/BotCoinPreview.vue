<template>
  <span class="coinCoinLabel">{{t('botCoinsPreview.label')}}</span>
  <a data-bs-toggle="modal" data-bs-target="#botCoinStealModal"><CoinCount class="coinCount" :value="botCoins"/></a>

  <ModalDialog id="botCoinStealModal" :title="t('botCoinsPreview.stealGiveCoin.title')">
    <template #body>
      <p v-html="t('botCoinsPreview.stealGiveCoin.text')"></p>
    </template>
    <template #footer>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('stealCoin')" :disabled="botCoins < 1">{{t('botCoinsPreview.stealGiveCoin.stealCoin')}}</button>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('giveCoin')">{{t('botCoinsPreview.stealGiveCoin.giveCoin')}}</button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import CoinCount from '../structure/CoinCount.vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'BotCoinPreview',
  components: {
    CoinCount,
    ModalDialog
  },
  emits: ['stealCoin','giveCoin'],
  setup() {
    const { t } = useI18n()
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
