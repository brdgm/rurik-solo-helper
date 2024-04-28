<template>
  <h3 class="mt-4 mb-3">{{t('setup.rebellion.botLeader.title')}}</h3>

  <div class="row">
    <div class="col-auto" v-for="leader in leaders" :key="leader">
      <AppIcon type="leader-card" :name="leader" extension="jpg" class="troop" @click="updateBotLeader(leader)"/><br/>
      <input class="form-radio-input" type="radio" :id="'leader_'+leader" :value="leader" v-model="selectedLeader" @input="updateBotLeaderInput($event)">
      <label class="form-radio-label" :for="'leader_'+leader">{{t('leader.' + leader + '.name')}}</label>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p class="ability">
        {{t('leader.' + selectedLeader + '.ability')}} {{t('leader.' + selectedLeader + '.abilityEndOfRound')}}
      </p>
    </div>
    <div class="col">
      <p class="lore text-muted">{{t('leader.' + selectedLeader + '.lore')}}</p>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import AppIcon from '../structure/AppIcon.vue'
import BotLeader from '@/services/enum/BotLeader'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'RebellionLeader',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    leaders() : BotLeader[] {
      const leaders = [ BotLeader.SVIATOPOLK ]
      if (this.state.setup.expansions.includes(Expansion.STONE_BLADE)) {
        leaders.push(BotLeader.MARIA)
        leaders.push(BotLeader.GLEB)
        leaders.push(BotLeader.THEOFANA)
      }
      return leaders
    },
    selectedLeader() : BotLeader {
      return this.state.setup.botLeader
    }
  },
  methods: {
    updateBotLeader(leader: BotLeader) {
      this.state.setupBotLeader(leader)
    },
    updateBotLeaderInput(event: Event) {
      const leader = (event.target as HTMLInputElement).value as BotLeader
      this.state.setupBotLeader(leader)
    }
  }
})
</script>

<style lang="scss" scoped>
.troop {
  width: 10rem;
  cursor: pointer;
}
input {
  margin-left: 1rem;
}
label {
  padding-left: 0.5rem;
}
.lore {
  padding: 1rem;
  font-style: italic;
  background-color: #eee;
  border-radius: 0.5rem;
}
.ability {
  padding: 1rem;
}
</style>
