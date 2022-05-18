<template>
  <img :src="imageUrl" :draggable="draggable" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Icon',
  setup() {
    const images = require.context('@/assets/icons', true, /\.(png|jpg)$/)
    return { images }
  },
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
      default: "png"
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    imageUrl() : string {
      let path = "./"
      if (this.type) {
        path += this.type + "/" + (this.name ?? this.type)
      }
      else {
        path += this.name
      }
      if (this.color) {
        path += "-" + this.color
      }
      return this.images(path + "." + this.extension)
    }
  }
})
</script>
