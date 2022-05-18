<template>
  <p v-html="t('claim.introText')"></p>

  <template v-if="!lastRound">
    <h3>{{t('claim.priority.title')}}</h3>

    <div class="question">
      {{t('claim.priority.questionAttack')}}
      <div class="switch">
        <input type="radio" id="priorityAttackYes" v-model="priorityAttack" :value="true"><label for="priorityAttackYes">{{t('claim.priority.question.yes')}}</label>
      </div>
      <div class="switch">
        <input type="radio" id="priorityAttackNo" v-model="priorityAttack" :value="false"><label for="priorityAttackNo">{{t('claim.priority.question.no')}}</label>
      </div>
    </div>

    <div class="question" v-if="priorityAttack == false">
      {{t('claim.priority.questionBuild')}}
      <div class="switch">
        <input type="radio" id="priorityBuildYes" v-model="priorityBuild" :value="true"><label for="priorityBuildYes">{{t('claim.priority.question.yes')}}</label>
      </div>
      <div class="switch">
        <input type="radio" id="priorityBuildNo" v-model="priorityBuild" :value="false"><label for="priorityBuildNo">{{t('claim.priority.question.no')}}</label>
      </div>
    </div>

    <div class="question" v-if="priorityBuild == false">
      {{t('claim.priority.questionTax')}}
      <div class="switch">
        <input type="radio" id="priorityTaxYes" v-model="priorityTax" :value="true"><label for="priorityTaxYes">{{t('claim.priority.question.yes')}}</label>
      </div>
      <div class="switch">
        <input type="radio" id="priorityTaxNo" v-model="priorityTax" :value="false"><label for="priorityTaxNo">{{t('claim.priority.question.no')}}</label>
      </div>
    </div>
    
    <p v-if="priorityQuestionsAnswered">
      {{t('claim.priority.nextPriority')}} <Icon type="actionPriority" :name="nextActionPriority" class="actionPriority"/>
    </p>

    <h3>{{t('claim.advanceTracks.title')}}</h3>

    <div class="question">
      {{t('claim.advanceTracks.question')}}<br/>
      <div class="switch" v-for="value of [0,1,2,3]" :key="value">
        <input type="radio" :id="'trackAdvance'+value" v-model="tracksAdvanced" :value="value"><label :for="'trackAdvance'+value">{{t('claim.advanceTracks.tracks',{count:value},value)}}</label>
      </div>
    </div>

    <p v-if="tracksAdvanced != undefined && tracksAdvanced > 0" v-html="t('claim.advanceTracks.unlock',{count:tracksAdvanced},tracksAdvanced)"></p>

    <h3>{{t('claim.income.title')}}</h3>

    <div class="question">
      {{t('claim.income.question')}}<br/>
      <div class="switch" v-for="value of [0,1,2,3,4,5]" :key="value">
        <input type="radio" :id="'boatRowsFilled'+value" v-model="boatRowsFilled" :value="value"><label :for="'boatRowsFilled'+value">{{t('claim.income.columns',{count:value},value)}}</label>
      </div>
    </div>

    <p v-if="boatRowsFilled != undefined && boatRowsFilled > 0" v-html="t('claim.income.earn',{count:boatRowsFilled},boatRowsFilled)"></p>
  </template>

  <h3>{{t('claim.deedCards.title')}}</h3>

  <p v-html="t('claim.deedCards.text')"></p>

  <p v-if="showLeaderAbility" class="mt-3 alert alert-warning">
    <b>{{t('leader.ability')}}</b>: {{t('leader.' + botLeader + '.abilityEndOfRound')}}
  </p>

  <button v-if="nextButtonVisible" @click="completeClaimPhase" class="btn btn-primary btn-lg mt-3">
    {{t('action.next')}}
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore, Claim, Round } from '@/store'
import { useRoute } from 'vue-router'
import Icon from '../structure/Icon.vue'
import NavigationState from '@/util/NavigationState'
import ActionPriority from '@/services/enum/ActionPriority'
import HouseholdMats from '@/services/HouseholdMats'
import BotAction from '@/services/BotAction'
import BotLeader from '@/services/enum/BotLeader'

export default defineComponent({
  name: 'ClaimPhaseRebellion',
  components: {
    Icon
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const navigationState = new NavigationState(route, store)    
    const round = navigationState.round
    const cardDeck = navigationState.cardDeck
    const bot = new BotAction(navigationState.difficultyLevel, navigationState.botCoins, navigationState.bonusActions)

    const claim = store.state.claim[round -1]
    let priorityAttack = ref(claim?.priorityAttack)
    let priorityBuild = ref(claim?.priorityBuild)
    let priorityTax = ref(claim?.priorityTax)
    let tracksAdvanced = ref(claim?.tracksAdvanced)
    let boatRowsFilled = ref(claim?.boatRowsFilled)

    return { t, round, bot, cardDeck,
        priorityAttack, priorityBuild, priorityTax, tracksAdvanced, boatRowsFilled }
  },
  computed: {
    lastRound() : boolean {
      return this.round == 4
    },
    nextButtonVisible() : boolean {
      return (this.priorityQuestionsAnswered && this.advanceTracksSelected && this.boatStatusSelected)
          || this.lastRound
    },
    priorityQuestionsAnswered() : boolean {
      return this.priorityAttack == true || this.priorityBuild == true || this.priorityTax != undefined
    },
    nextActionPriority() : ActionPriority {
      if (this.priorityAttack) {
        return ActionPriority.ATTACK_MOVE
      }
      else if (this.priorityBuild) {
        return ActionPriority.BUILD
      }
      else if (this.priorityTax) {
        return ActionPriority.TAX
      }
      else {
        const householdMat = HouseholdMats.get(this.$store.state.setup.difficultyLevel)
        return householdMat.startingPriority
      }
    },
    advanceTracksSelected() : boolean {
      return this.tracksAdvanced != undefined
    },
    boatStatusSelected() : boolean {
      return this.boatRowsFilled != undefined
    },
    botLeader() : BotLeader {
      return this.$store.state.setup.botLeader
    },
    showLeaderAbility() : boolean {
      return this.botLeader == BotLeader.SVIATOPOLK || this.botLeader == BotLeader.GLEB || this.botLeader == BotLeader.MARIA
    }
  },
  methods: {
    completeClaimPhase() : void {
      // skip all steps in last round
      if (this.lastRound) {
        this.$router.push('/round/' + this.round + '/end')
        return;
      }

      // unlock bonus actions
      for (let i=0; i<(this.tracksAdvanced as number); i++) {
        this.bot.unlockNextBonusAction()
      }

      // store claim
      const claim : Claim = {
        round: this.round,
        priorityAttack: this.priorityAttack as boolean,
        priorityBuild: this.priorityBuild,
        priorityTax: this.priorityTax,
        tracksAdvanced: this.tracksAdvanced,
        boatRowsFilled: this.boatRowsFilled,
        botCoins: this.bot.coins + this.boatRowsFilled,
        bonusActions: this.bot.bonusActions
      }
      this.$store.commit('claim', claim)

      // prepare next round with new priority
      this.cardDeck.draw()
      const round : Round = {
        round: this.round + 1,
        cardDeck: this.cardDeck.toPersistence(),
        actionPriority: this.nextActionPriority,
        strategyRound: [],
        actionRoundPlayer: [],
        actionRoundBot: []
      }
      this.$store.commit('round', round)

      // move to next
      this.$router.push('/round/' + (this.round + 1) + '/strategy/0')
    }
  }
})
</script>

<style lang="scss" scoped>
.question {
  margin-bottom: 1rem;
}
.switch {
  display: inline;
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  input[type=radio] {
    cursor: pointer;
  }
  label {
    padding-left: 0.5rem;
    cursor: pointer;
  }
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #eee;
  white-space: nowrap;
}
.actionPriority {
  height: 3rem;
}
</style>
