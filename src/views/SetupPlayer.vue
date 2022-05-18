<template>
  <h1>{{t('setup.player.title')}}</h1>

  <PlayerColor/>
  <PlayerFurtherSetupSteps/>

  <FooterButtons endGameButtonType="abortGame" backButtonRouteTo="/setup/rebellion"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayerColor from '@/components/setup/PlayerColor.vue'
import PlayerFurtherSetupSteps from '@/components/setup/PlayerFurtherSetupSteps.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'SetupPlayer',
  components: {
    PlayerColor,
    PlayerFurtherSetupSteps,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
