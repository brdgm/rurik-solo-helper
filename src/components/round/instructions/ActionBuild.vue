<template>
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
import CardDeck from '@/services/CardDeck'
import Structure from '@/services/enum/Structure'
import findMandatory from '@/util/findMandatory'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ActionBuild',
  components: {
    Icon
  },
  emits: ['unlockBonusAction'],
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      selectedStructure: undefined
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
    }
  },
  methods: {
    isChurch(structure : Structure) {
      return structure == Structure.CHURCH
    }
  }
})
</script>

<style lang="scss" scoped>
.structure {
  height: 2.5rem;
}
</style>
