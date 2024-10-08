<template>
  <h3 class="mt-4">{{t('setup.player.steps.title')}}</h3>
  <ol class="clearfix">
    <li v-html="t('setup.player.steps.neutralTroops')"></li>
    <li v-html="t('setup.player.steps.playerTroops' + (hasStoneBlade?'StoneBlade':''), {region1: leaderStartRegion, region2: rebelStartRegion1, region3: rebelStartRegion2})"></li>
  </ol>

  <button @click="startGame" class="btn btn-primary btn-lg mt-3">
    {{t('action.startGame')}}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import { capitalize } from 'lodash'
import Region from '@/services/enum/Region'
import Expansion from '@/services/enum/Expansion'
import CardDeck from '@/services/CardDeck'
import HouseholdMats from '@/services/HouseholdMats'

export default defineComponent({
  name: 'PlayerFurtherSetupSteps',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasStoneBlade() : boolean {
      return this.state.setup.expansions.includes(Expansion.STONE_BLADE)
    },
    startingRegions() : Region[] {
      const cardDeck = CardDeck.fromPersistence(this.state.setup.cardDeck)
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
    }
  },
  methods: {
    startGame() : void {
      // prepare first round persistence
      const cardDeck = CardDeck.fromPersistence(this.state.setup.cardDeck)
      cardDeck.draw()
      const houseMat = HouseholdMats.get(this.state.setup.difficultyLevel)
      const roundPersistence = {
        round: 1,
        cardDeck: cardDeck.toPersistence(),
        actionPriority: houseMat.startingPriority,
        strategyRound: [],
        actionRoundPlayer: [],
        actionRoundBot: []
      }
      this.state.round(roundPersistence)

      // go to first strategy round
      this.$router.push('/round/1/strategy/0')
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