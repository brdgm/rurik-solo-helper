<template>
  <h3 class="mt-3 mb-3">{{t('setup.selectExpansion.title')}}</h3>
  <div class="row">
    <div class="col-lg-3 col-md-4 col-6">
      <img src="@/assets/game-rurik.jpg" class="game" alt=""/>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="coreBoxEnabled" checked disabled>
        <label class="form-check-label" for="coreBoxEnabled">
          {{t('setup.selectExpansion.baseGame')}}
        </label>
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <img src="@/assets/game-rurik-stone-blade.jpg" class="game selectable" alt="" :class="{disabled: !hasStoneBlade}"
          @click="toggleStoneBlade"/>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="stoneBladeEnabled" 
            :checked="hasStoneBlade" @click="toggleStoneBlade">
        <label class="form-check-label" for="stoneBladeEnabled">
          {{t('setup.selectExpansion.stoneBlade')}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'SelectExpansion',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasStoneBlade() : boolean {
      return this.state.setup.expansions.includes(Expansion.STONE_BLADE)
    }
  },
  methods: {
    toggleStoneBlade() {
      this.state.setupToggleExpansionStoneBlade()
    }
  }
})
</script>

<style lang="scss" scoped>
.game {
  width: 100%;
}
.game.selectable {
  cursor: pointer
}
.game.disabled {
  opacity: 0.4;
  filter: grayscale(1);
}
</style>