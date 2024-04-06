<template>
  <v-btn variant="elevated" :color="bgColor" :height="height" :width="width">{{
    title
  }}</v-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 50,
  },
  bgColor: {
    type: String,
    default: '#3cba9f',
  },
})
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
