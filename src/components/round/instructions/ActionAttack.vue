<template>
  <Icon type="actionPriority" :name="actionPriority" class="actionPriority"/>
  <p v-if="isAttackMovePriority" v-html="t('actionBot.attack.text1AttackMove')"></p>
  <p v-else v-html="t('actionBot.attack.text1Other')"></p>
  <ul class="small">
    <li v-html="t('actionBot.attack.note1')"></li>
    <li v-html="t('actionBot.attack.note2')"></li>
    <li>
      <span v-html="t('actionBot.attack.note3')"></span><span>&nbsp;</span>
      <span v-if="isStoneBladeExpansion" v-html="t('actionBot.attack.note3text2StoneBlade')"></span>
      <span v-else v-html="t('actionBot.attack.note3text2')"></span>
    </li>
    <li v-html="t('actionBot.attack.note4')"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/structure/Icon.vue'
import ActionPriority from '@/services/enum/ActionPriority'

export default defineComponent({
  name: 'ActionAttack',
  components: {
    Icon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    actionPriority: {
      type: String,
      required: true
    },
    isStoneBladeExpansion: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isAttackMovePriority() : boolean {
      return this.actionPriority == ActionPriority.ATTACK_MOVE
    }
  }
})
</script>

<style lang="scss" scoped>
.actionPriority {
  height: 2.5rem;
  float: left;
  padding-right: 1rem;
}
</style>
