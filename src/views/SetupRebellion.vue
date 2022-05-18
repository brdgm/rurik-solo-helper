<template>
  <h1>{{t('setup.rebellion.title')}}</h1>

  <RebellionLeader/>
  <RebellionColor/>
  <RebellionFurtherSetupSteps/>

  <router-link to="/setup/player" class="btn btn-primary btn-lg mt-3">
    {{t('setup.player.title')}}
  </router-link>

  <FooterButtons endGameButtonType="abortGame" backButtonRouteTo="/setup/gameDifficulty"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import RebellionLeader from '@/components/setup/RebellionLeader.vue'
import RebellionColor from '@/components/setup/RebellionColor.vue'
import RebellionFurtherSetupSteps from '@/components/setup/RebellionFurtherSetupSteps.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'SetupRebellion',
  components: {
    RebellionLeader,
    RebellionColor,
    RebellionFurtherSetupSteps,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
