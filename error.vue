<template>
  <div></div>
</template>
<script setup lang="ts">
import { DASHBOARD } from './constants/routes'

onBeforeMount(() => {
  navigateTo({ path: DASHBOARD })
})
</script>
<style scoped lang="scss">
.custom-btn {
  padding: 16px;
  color: blue;
}
</style>
