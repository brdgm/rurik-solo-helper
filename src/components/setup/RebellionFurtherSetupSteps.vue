<template>
  <h3 class="mt-4">{{t('setup.rebellion.steps.title')}}</h3>
  <AppIcon type="rebel" class="rebel" v-for="n in rebelMiniatureCount" :key="n"/>
  <ol class="clearfix">
    <li v-html="t('setup.rebellion.steps.rebels',{rebelMiniatureCount:rebelMiniatureCount})"></li>
    <li v-html="t('setup.rebellion.steps.mat')"></li>
    <li v-if="hasStoneBlade" v-html="t('setup.rebellion.steps.boonTokens')"></li>
    <li v-html="t('setup.rebellion.steps.leaderRegion', {region:leaderStartRegion})"></li>
    <li v-html="t('setup.rebellion.steps.rebelRegion', {region:rebelStartRegion1})"></li>
    <li v-html="t('setup.rebellion.steps.rebelRegion', {region:rebelStartRegion2})"></li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import AppIcon from '../structure/AppIcon.vue'
import Expansion from '@/services/enum/Expansion'
import CardDeck from '../../services/CardDeck'
import { capitalize } from 'lodash'
import Region from '@/services/enum/Region'

export default defineComponent({
  name: 'RebellionFurtherSetupSteps',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  computed: {
    hasStoneBlade() : boolean {
      return this.$store.state.setup.expansions.includes(Expansion.STONE_BLADE);
    },
    startingRegions() : Region[] {
      const cardDeck = CardDeck.fromPersistence(this.$store.state.setup.cardDeck)
      return cardDeck.activeCard.locationOrder.filter(region => region != Region.KIEV)
    },
    leaderStartRegion() : string {
      return capitalize(Region.KIEV)
    },
    rebelStartRegion1() : string {
      return capitalize(this.startingRegions[0])
    },
    rebelStartRegion2() : string {
      return capitalize(this.startingRegions[1])
    },
    rebelMiniatureCount() : number {
      return this.hasStoneBlade ? 16 : 15
    }
  }
})
</script>


<style lang="scss" scoped>
.rebel {
  width: 2.5rem;
  margin-bottom: 0.5rem;
}
</style>