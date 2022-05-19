<template>
  <p v-if="leaderAbilityVisible" class="alert alert-warning">
    <b>{{t('leader.ability')}}</b>: {{t('leader.' + botLeader + '.ability')}}
    <button v-if="!musterInstructionsVisible" type="button" class="btn btn-light btn-sm" @click="showMusterInstructions">{{t('actionBot.showMusterInstructions')}}</button>
  </p>

  <p v-html="t('actionBot.tax.text1')"></p>
  <p v-html="t('actionBot.tax.chooseRegionText')"></p>
  <ol type="A">
    <li v-html="t('actionBot.tax.chooseRegion.option1')"></li>
    <li v-html="t('actionBot.tax.chooseRegion.option2')"></li>
  </ol>
  <ul class="small">
    <li v-html="t('actionBot.tax.note1')"></li>
    <li v-html="t('actionBot.tax.note2')"></li>
    <li v-if="isStoneBladeExpansion" v-html="t('actionBot.tax.note3StoneBlade')"></li>
  </ul>

  <template v-if="musterInstructionsVisible">
    <hr/>
    <ActionMuster />
  </template>

</template>

<script lang="ts">
import ActionMuster from './ActionMuster.vue'
import BotLeader from '@/services/enum/BotLeader'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ActionTax',
  components: {
    ActionMuster
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      musterInstructionsVisible: false
    }
  },
  props: {
    botLeader: {
      type: String,
      required: true
    },
    isStoneBladeExpansion: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    leaderAbilityVisible() : boolean {
      return this.botLeader == BotLeader.THEOFANA
    }
  },
  methods: {
    showMusterInstructions() : void {
      this.musterInstructionsVisible = true
    }
  }
})
</script>
