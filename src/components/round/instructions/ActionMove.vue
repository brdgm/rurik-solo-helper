<template>
  <AppIcon type="actionPriority" :name="actionPriority" class="actionPriority"/>
  <p v-if="isAttackMovePriority" v-html="t('actionBot.move.text1AttackMove')"></p>
  <p v-else v-html="t('actionBot.move.text1Other')"></p>
  <ul class="small">
    <li v-html="t('actionBot.move.note1')"></li>
    <li v-html="t('actionBot.move.note2')"></li>
    <li v-html="t('actionBot.move.note3')"></li>
    <li v-html="t('actionBot.move.note4')"></li>
    <li v-html="t('actionBot.move.note5')"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'
import ActionPriority from '@/services/enum/ActionPriority'

export default defineComponent({
  name: 'ActionMove',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    actionPriority: {
      type: String,
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
