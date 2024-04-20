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

      <CommentList :listData="listCommentByUser"></CommentList>
    </div>
  </div>
</template>

<script setup lang="ts">
const listComment = ref([
  {
    commentContent: 'phim hay quas',
    username: 'Son van nguyen',
    avatar:
      'https://cdn.cosmicjs.com/5bcffc50-eaed-11ee-b074-b5c8fe3ef189-galaxy-1.png',
    movie_name: 'Galaxy 1',
    thumbnail_url:
      'https://img.hiephanhthienha.com/uploads/movies/su-tra-thu-cua-nguoi-thu-3-thumb.jpg',
    totalReport: 2,
    updatedAt: '2024-04-08T22:35:43.921+00:00',
  },
  {
    commentContent: 'phim oke day 2',
    username: 'User testtt',
    avatar:
      'https://cdn.cosmicjs.com/5bcffc50-eaed-11ee-b074-b5c8fe3ef189-galaxy-1.png',
    movie_name: 'Black Panther 2',
    thumbnail_url:
      'https://img.hiephanhthienha.com/uploads/movies/chien-binh-bao-den-2-wakanda-bat-diet-thumb.jpg',
    totalReport: 5,
    updatedAt: '2024-04-08T22:35:43.921+00:00',
  },

  {
    commentContent: 'phim oke day',
    username: 'User testtt',
    avatar:
      'https://cdn.cosmicjs.com/5bcffc50-eaed-11ee-b074-b5c8fe3ef189-galaxy-1.png',
    movie_name: 'Black Panther 2',
    thumbnail_url:
      'https://img.hiephanhthienha.com/uploads/movies/chien-binh-bao-den-2-wakanda-bat-diet-thumb.jpg',
    totalReport: 10,
    updatedAt: '2024-04-08T22:35:43.921+00:00',
  },
])

const userSearch = ref()
const listCommentByUser = ref<any>(listComment.value)

// onMounted(async () => {
//   const response = await movieApi.getAllMovie()
//   if (response?.moviesData?.length) {
//     listMovie.value = response.moviesData
//     listMovieSearch.value = response.moviesData
//   }
// })

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
