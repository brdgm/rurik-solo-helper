<template>
  <h3 class="mb-3">{{t('setup.rebellion.botColor.title')}}</h3>

  <div class="row">
    <div class="col-auto" v-for="color in colors" :key="color">
      <Icon type="leader-mini" :name="selectedLeader" :color="color" class="mini" @click="updateBotColor(color)"/><br/>
      <input class="form-radio-input" type="radio" :id="'color_'+color" :value="color" v-model="selectedColor" @input="updateBotColorInput($event)">
      <label class="form-radio-label" :for="'color_'+color">{{t('color.' + color)}}</label>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import Icon from '../structure/Icon.vue'
import Color from '@/services/enum/Color'
import BotLeader from '@/services/enum/BotLeader'

export default defineComponent({
  name: 'RebellionColor',
  components: {
    Icon
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t  }
  },
  computed: {
    colors() : Color[] {
      return Object.values(Color)
    },
    selectedLeader() : BotLeader {
      return this.$store.state.setup.botLeader
    },
    selectedColor() : Color {
      return this.$store.state.setup.botColor
    }
  },
  methods: {
    updateBotColor(color: Color) {
      this.$store.commit('setupBotColor', color)
    },
    updateBotColorInput(event: Event) {
      let color = (event.target as HTMLInputElement).value as Color
      this.$store.commit('setupBotColor', color)
    }
  }
})
</script>

<style lang="scss" scoped>
.mini {
  width: 8rem;
  cursor: pointer;
}
input {
  margin-left: 1rem;
}
label {
  padding-left: 0.25rem;
}
</style>
