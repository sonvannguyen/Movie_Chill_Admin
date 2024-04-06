<template>
  <div>
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<style scoped lang="scss">
@use 'sass:map';
.title {
  font-size: 30px;
  font-weight: 700;
  display: inline-block;
  border-bottom: 4px solid map.get($colors, 'primary');
  padding: 0;
  margin-bottom: 40px;
  margin-top: 20px;
}
</style>
