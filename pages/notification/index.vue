<template>
  <div>
    <CommonSidebar />

    <div class="ml-[330px] w-[1100px]">
      <CommonHeader title="Notifications"></CommonHeader>

      <div class="mb-5">
        <CommonButton
          :width="160"
          title="Thêm thông báo"
          @click="handleCreateNoti"
        ></CommonButton>
      </div>

      <NotificationList :listData="listNoti"></NotificationList>
    </div>
  </div>
</template>

<script setup lang="ts">
import movieApi from '~/services/movie-api'

const listNoti = [
  {
    content: 'Cập nhật hệ thống 1',
    type: 'USER',
    updatedAt: '2024-04-08T22:35:43.921+00:00',
  },
  {
    content: 'Cập nhật hệ thống 2',
    type: 'USER',
    updatedAt: '2024-04-09T22:35:43.921+00:00',
  },
  {
    content: 'Cập nhật hệ thống 3',
    type: 'ALL',
    updatedAt: '2024-04-10T22:35:43.921+00:00',
  },
]
// const listMovie = ref<any>([])
// const listMovieSearch = ref<any>([])
// const movieSearch = ref<any>()

// onMounted(async () => {
//   const response = await movieApi.getAllMovie()
//   if (response?.moviesData?.length) {
//     listMovie.value = response.moviesData
//     listMovieSearch.value = response.moviesData
//   }
// })

const handleCreateNoti = () => {
  navigateTo('/notification/create')
}
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
