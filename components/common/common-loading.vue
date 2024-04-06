<template>
  <div class="loading text-center">
    <v-progress-circular
      indeterminate
      class="progress"
      size="48"
      bg-color="transparent"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use 'sass:map';
.loading {
  position: fixed;
  z-index: 9999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.progress {
  color: map.get($colors, 'primary');
}
</style>
