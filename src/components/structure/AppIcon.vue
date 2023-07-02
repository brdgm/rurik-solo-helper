<template>
  <img :src="imageUrl" :draggable="draggable" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppIcon',
  props: {
    type: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },
    extension: {
      type: String,
      required: false,
      default: 'png'
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    imageUrl() : string {
      const colorSuffix = this.color ? `-${this.color}` : ''
      if (this.type) {
        return new URL(`/src/assets/icons/${this.type}/${this.name ?? this.type}${colorSuffix}.${this.extension}`, import.meta.url).toString()
      }
      else {
        return new URL(`/src/assets/icons/${this.name}${colorSuffix}.${this.extension}`, import.meta.url).toString()
      }
    }
  }
})
</script>
