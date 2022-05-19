<template>
  <p v-if="leaderAbilityVisible" class="alert alert-warning">
    <b>{{t('leader.ability')}}</b>: {{t('leader.' + botLeader + '.ability')}}
    <button v-if="isBotLeaderMaria && !attackInstructionsVisible" type="button" class="btn btn-light btn-sm" @click="showAttackInstructions">{{t('actionBot.showAttackInstructions')}}</button>
    <button v-if="isBotLeaderTheofana && !musterInstructionsVisible" type="button" class="btn btn-light btn-sm" @click="showMusterInstructions">{{t('actionBot.showMusterInstructions')}}</button>
  </p>

  <p v-html="t('actionBot.build.text1')"></p>
  <p v-html="t('actionBot.build.chooseRegionText')"></p>
  <ol type="A">
    <li v-html="t('actionBot.build.chooseRegion.option1')"></li>
    <li v-html="t('actionBot.build.chooseRegion.option2')"></li>
    <li v-html="t('actionBot.build.chooseRegion.option3')"></li>
  </ol>
  <p v-html="t('actionBot.build.pickStructureText')"></p>
  <ol type="A">
    <li v-if="isStoneBladeExpansion">
      <Icon type="structure" :name="'stable-' + botColor" class="structure"/>
      <b>{{t('structure.stable')}}</b>
      <div class="small" v-html="t('actionBot.build.pickStructureNotes.stable')"></div>
      <button v-if="!moveInstructionsVisible" type="button" class="btn btn-light btn-sm" @click="showMoveInstructions">{{t('actionBot.showMoveInstructions')}}</button>
    </li>
    <li v-if="isStoneBladeExpansion">
      <Icon type="structure" :name="'tavern-' + botColor" class="structure"/>
      <b>{{t('structure.tavern')}}</b>
      <div class="small" v-html="t('actionBot.build.pickStructureNotes.tavern')"></div>
      <button type="button" class="btn btn-secondary btn-sm"  data-bs-toggle="modal" data-bs-target="#buildTavernUnlockBonusModal">{{t('actionBot.build.buildTavernUnlockBonus.title')}}</button>
    </li>
    <li v-html="t('actionBot.build.pickStructureTextChoose')"></li>
    <ol>
      <li v-for="structure of buildOrder" :key="structure">
        <Icon type="structure" :name="structure + '-' + botColor" class="structure"/>
        <b>{{t('structure.' + structure)}}</b>
        <div v-if="isChurch(structure)" class="small" v-html="t('actionBot.build.pickStructureNotes.church')"></div>
      </li>
    </ol>
  </ol>

  <template v-if="musterInstructionsVisible">
    <hr/>
    <ActionMuster />
  </template>

  <template v-if="moveInstructionsVisible">
    <hr/>
    <ActionMove :action-priority="actionPriority"/>
  </template>

  <template v-if="attackInstructionsVisible">
    <hr/>
    <ActionAttack :action-priority="actionPriority" :botLeader="botLeader" :is-stone-blade-expansion="isStoneBladeExpansion"/>
  </template>

  <div id="buildTavernUnlockBonusModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('actionBot.build.buildTavernUnlockBonus.title')}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-html="t('actionBot.build.buildTavernUnlockBonus.text')"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('unlockBonusAction')">{{t('actionBot.build.buildTavernUnlockBonus.title')}}</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Icon from '@/components/structure/Icon.vue'
import ActionMuster from './ActionMuster.vue'
import ActionMove from './ActionMove.vue'
import ActionAttack from './ActionAttack.vue'
import CardDeck from '@/services/CardDeck'
import Structure from '@/services/enum/Structure'
import findMandatory from '@/util/findMandatory'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import BotLeader from '@/services/enum/BotLeader'

export default defineComponent({
  name: 'ActionBuild',
  components: {
    Icon,
    ActionMuster,
    ActionMove,
    ActionAttack
  },
  emits: ['unlockBonusAction'],
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      selectedStructure: undefined as Structure | undefined,
      musterInstructionsVisible: false,
      moveInstructionsVisible: false,
      attackInstructionsVisible: false
    }
  },
  props: {
    cardDeck: {
      type: CardDeck,
      required: true
    },
    actionPriority: {
      type: String,
      required: true
    },
    botLeader: {
      type: String,
      required: true
    },
    botColor: {
      type: String,
      required: true
    },
    isStoneBladeExpansion: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    buildOrder() : Structure[] {
      return findMandatory(this.cardDeck.activeCard.priorities, item => item.priority==this.actionPriority).buildOrder
    },
    isBotLeaderMaria() : boolean {
      return this.botLeader == BotLeader.MARIA
    },
    isBotLeaderTheofana() : boolean {
      return this.botLeader == BotLeader.THEOFANA
    },
    leaderAbilityVisible() : boolean {
      return this.isBotLeaderMaria || this.isBotLeaderTheofana
    }
  },
  methods: {
    isChurch(structure : Structure) : boolean {
      return structure == Structure.CHURCH
    },
    showMusterInstructions() : void {
      this.musterInstructionsVisible = true
    },
    showMoveInstructions() : void {
      this.moveInstructionsVisible = true
    },
    showAttackInstructions() : void {
      this.attackInstructionsVisible = true
    }
  }
})
</script>

<style lang="scss" scoped>
.structure {
  height: 2.5rem;
}
</style>
