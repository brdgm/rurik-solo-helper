<template>
  <p v-html="t('actionBot.scheme.text1')"></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ActionScheme',
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
