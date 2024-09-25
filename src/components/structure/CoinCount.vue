<template>
  <div class="wrapper">
    <div class="count">{{value}}</div>
    <AppIcon type="coin" name="coin" class="coin" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: 'CoinCount',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: inline-block;
  width: 4rem;
  position: relative;
}
.coin {
  width: 100%;
}
.count {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: #fff;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
</style>
