<template>
  <h3 class="mt-4 mb-3">{{t('setup.difficultyLevel.title')}}</h3>

  <div class="row">
    <div class="col-1 text-end">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.easy')}}</label>
    </div>
    <div class="col-8 col-md-4">
      <input type="range" class="form-range" min="1" max="4" id="difficultyLevel"
          :value="state.setup.difficultyLevel" @input="updateDifficultyLevel($event)">
    </div>
    <div class="col-1">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.hard')}}</label>
    </div>
  </div>  
  <div class="row">
    <div class="offset-1 col-8">
      <p class="text-muted">
        {{t('setup.difficultyLevel.useCards', { count: state.setup.difficultyLevel }, state.setup.difficultyLevel)}}
      </p>
    </div>
  </div>  

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'DifficultyLevel',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  methods: {
    updateDifficultyLevel(event: Event) {
      const level = parseInt((event.target as HTMLInputElement).value)
      this.state.setup.difficultyLevel = level
    }
  }
})
</script>
