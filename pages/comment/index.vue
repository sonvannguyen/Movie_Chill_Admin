<template>
  <div>
    <CommonSidebar />

    <div class="ml-[330px] w-[1100px]">
      <CommonHeader title="Comments"></CommonHeader>

      <div class="flex w-[500px] gap-6">
        <v-text-field
          v-model="userSearch"
          variant="outlined"
          placeholder="Tìm kiếm theo user..."
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
      <CommentList v-else :listData="listCommentByUser"></CommentList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommentStore } from '~/stores/comment/comment-store';
import { storeToRefs } from 'pinia'

const commentStore = useCommentStore()
const { listComment } = storeToRefs(commentStore)
const isLoading = ref(false)

const userSearch = ref()
const listCommentByUser = ref<any>(listComment.value)

onMounted(async () => {
  if (!listComment.value?.length) {
    isLoading.value = true
    await commentStore.getCommentsReport()
    listCommentByUser.value = listComment.value
    isLoading.value = false
  }
})

const handleSearchUser = () => {
  if (!userSearch.value) {
    listCommentByUser.value = listComment.value
    return
  }

  const resultSearch: any = []
  listComment.value.forEach((comment: any) => {
    if (
      comment.username.toLowerCase().includes(userSearch.value.toLowerCase())
    ) {
      resultSearch.push(comment)
    }
  })

  listCommentByUser.value = resultSearch
}

const handleResetSearch = () => {
  userSearch.value = ''
  listCommentByUser.value = listComment.value
}
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
