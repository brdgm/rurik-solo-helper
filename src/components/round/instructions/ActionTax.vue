<template>
  <p v-html="t('actionBot.tax.text1')"></p>
  <p v-html="t('actionBot.tax.chooseRegionText')"></p>
  <ol type="A">
    <li v-html="t('actionBot.tax.chooseRegion.option1')"></li>
    <li v-html="t('actionBot.tax.chooseRegion.option2')"></li>
  </ol>
  <ul class="small">
    <li v-html="t('actionBot.tax.note1')"></li>
    <li v-html="t('actionBot.tax.note2')"></li>
    <li v-if="isStoneBladeExpansion" v-html="t('actionBot.tax.note3StoneBlade')"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ActionTax',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    isStoneBladeExpansion: {
      type: Boolean,
      required: true
    }
  }
})
</script>
