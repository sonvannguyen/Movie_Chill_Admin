<template>
  <div>
    <CommonSidebar />

    <div class="ml-[330px] w-[1100px]">
      <CommonHeader title="Users"></CommonHeader>

      <div class="flex w-[500px] gap-6">
        <v-text-field
          v-model="userSearch"
          variant="outlined"
          placeholder="Tìm kiếm user..."
          class="w-[400px] rounded-xl"
        ></v-text-field>
        <CommonButton title="Tìm kiếm" @click="handleSearchUser"></CommonButton>
        <CommonButton
          title="Reset"
          bgColor="#cccc"
          @click="handleResetSearch"
        ></CommonButton>
      </div>

      <CommonLoading v-if="isLoading"></CommonLoading>
      <UserList v-else :listData="listUserSearch"></UserList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user/user-store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { listUser } = storeToRefs(userStore)
const isLoading = ref(false)

const userSearch = ref()
const listUserSearch = ref<any>(listUser.value)

onBeforeMount(() => {
  if(!localStorage.getItem("movie_access_token")){
    navigateTo("/login")
  }
})

onMounted(async () => {
  if (!listUser.value?.length) {
    isLoading.value = true
    await userStore.getAllUser()
    listUserSearch.value = listUser.value
    isLoading.value = false
  }
})

const handleSearchUser = () => {
  if (!userSearch.value) {
    listUserSearch.value = listUser.value
    return
  }

  const resultSearch: any = []
  listUser.value.forEach((user: any) => {
    if (user.username.toLowerCase().includes(userSearch.value.toLowerCase())) {
      resultSearch.push(user)
    }
  })

  console.log({ resultSearch })
  listUserSearch.value = resultSearch
}

const handleResetSearch = () => {
  userSearch.value = ''
  listUserSearch.value = listUser.value
}
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
