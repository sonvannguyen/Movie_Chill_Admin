<template>
  <div>
    <CommonSidebar />
    
    <div class="ml-[330px] w-[1100px]">
      <CommonHeader title="Movies"></CommonHeader>

      <div class="flex w-[500px] gap-6">
        <v-text-field
          variant="outlined"
          placeholder="Tìm kiếm phim..."
          class="w-[400px] rounded-xl"
        ></v-text-field>
        <CommonButton title="Search"></CommonButton>
      </div>

      <MovieCrud>tewstttt</MovieCrud>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use 'sass:map';
</style>
