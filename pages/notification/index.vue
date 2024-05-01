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

      <CommonLoading v-if="isLoading"></CommonLoading>
      <NotificationList v-else :listData="notifications"></NotificationList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '~/stores/notification/notification-store'
import { storeToRefs } from 'pinia'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)
const isLoading = ref(false)

onBeforeMount(() => {
  if(!localStorage.getItem("movie_access_token")){
    navigateTo("/login")
  }
})

onMounted(async () => {
  if (!notifications.value?.length) {
    isLoading.value = true
    await notificationStore.getNotifications()
    isLoading.value = false
  }
})

const handleCreateNoti = () => {
  navigateTo('/notification/create')
}
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
