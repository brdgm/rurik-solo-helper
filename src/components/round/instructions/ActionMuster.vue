<template>
  <p v-html="t('actionBot.muster.text1')"></p>
  <p v-html="t('actionBot.muster.text2')"></p>
  <p v-html="t('actionBot.muster.text3')"></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ActionMuster',
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
