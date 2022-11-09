<template>
  <h3 class="mt-4 mb-3">{{t('setup.player.playerColor.title')}}</h3>

  <div class="row">
    <div class="col-auto" v-for="color in colors" :key="color">
      <AppIcon type="troop" :color="color" class="troop" @click="updatePlayerColor(color)"/><br/>
      <input class="form-radio-input" type="radio" :id="'color_'+color" :value="color" v-model="selectedColor" @input="updatePlayerColorInput($event)">
      <label class="form-radio-label" :for="'color_'+color">{{t('color.' + color)}}</label>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import AppIcon from '../structure/AppIcon.vue'
import Color from '@/services/enum/Color'

export default defineComponent({
  name: 'PlayerColor',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  computed: {
    colors() : Color[] {
      return Object.values(Color)
          .filter(color => color != this.$store.state.setup.botColor)
    },
    selectedColor() : Color {
      return this.$store.state.setup.playerColor
    }
  },
  methods: {
    updatePlayerColor(color: Color) {
      this.$store.commit('setupPlayerColor', color)
    },
    updatePlayerColorInput(event: Event) {
      const color = (event.target as HTMLInputElement).value as Color
      this.$store.commit('setupPlayerColor', color)
    }
  }
})
</script>

<style lang="scss" scoped>
.troop {
  width: 6rem;
  cursor: pointer;
}
input {
  margin-left: 1rem;
}
label {
  padding-left: 0.25rem;
}
</style>
