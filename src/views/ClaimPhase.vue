<template>
  <h1>{{t('claim.title')}}</h1>

  <ClaimPhaseRebellion/>

  <FooterButtons endGameButtonType="abortGame" :backButtonRouteTo="backButtonRouteTo"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import { useRoute } from 'vue-router'
import ClaimPhaseRebellion from '@/components/round/ClaimPhaseRebellion.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'ClaimPhase',
  components: {
    ClaimPhaseRebellion,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const route = useRoute()

    const navigationState = new NavigationState(route, state)    
    const round = navigationState.round

    return { t, state, round }
  },
  computed: {
    backButtonRouteTo() : string {
      try {
        const lastActionRound = this.state.rounds[this.round - 1].actionRoundBot.length - 1
        return '/round/' + this.round + '/action/bot/' + lastActionRound
      }
      catch {
        return ''
      }
    }
  }
})
</script>
