<template>
  <div>
    <CommonSidebar />
    
    <div class="ml-[330px] w-[1100px]">
      <CommonHeader title="Dashboard"></CommonHeader>

      <div class="flex items-center gap-[40px]">
        <div class="box-item">
          <div class="flex justify-between items-center gap-[20px]">
            <v-icon color="white" size="55"> mdi-movie-play-outline</v-icon>
            <div>
              <h3 class="text-[20px]">Tổng số phim</h3>
              <h3 class="text-[24px] font-bold">1238</h3>
            </div>
          </div>
        </div>

        <div class="box-item">
          <div class="flex justify-between items-center gap-[20px]">
            <v-icon color="white" size="55"> mdi-account-check-outline</v-icon>
            <div>
              <h3 class="text-[20px]">Tổng số user</h3>
              <h3 class="text-[24px] font-bold">234</h3>
            </div>
          </div>
        </div>

        <div class="box-item">
          <div class="flex justify-between items-center gap-[20px]">
            <v-icon color="white" size="55"> mdi-poll</v-icon>
            <div>
              <h3 class="text-[20px]">Tổng lượt xem</h3>
              <h3 class="text-[24px] font-bold">23424</h3>
            </div>
          </div>
        </div>

        <div class="box-item">
          <div class="flex justify-between items-center gap-[20px]">
            <v-icon color="white" size="55">
              mdi-chat-processing-outline</v-icon
            >
            <div>
              <h3 class="text-[20px]">Tổng comments</h3>
              <h3 class="text-[24px] font-bold">2313</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-[100px] mt-13">
        <div>
          <h3 class="text-[20px] font-bold">Biểu đồ Views & Comments</h3>
          <CombinedChart :data="[]" class="h-[300px]"></CombinedChart>
        </div>

        <div>
          <h3 class="text-[20px] font-bold">Biểu đồ Users</h3>
          <BarChart :data="[]"></BarChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use 'sass:map';
.box-item {
  border-radius: 10px;
  padding: 10px 14px;
  background-color: map.get($colors, 'primary');
  color: white;
}
</style>
