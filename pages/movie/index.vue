<template>
  <div>
    <CommonSidebar />

    <div class="ml-[330px] w-[1100px]">
      <CommonHeader title="Movies"></CommonHeader>

      <div class="flex justify-between">
        <div class="flex w-[500px] gap-6">
          <v-text-field
            v-model="movieSearch"
            variant="outlined"
            placeholder="Tìm kiếm phim..."
            class="w-[400px] rounded-xl"
          ></v-text-field>
          <CommonButton
            title="Tìm kiếm"
            @click="handleSearchMovie"
          ></CommonButton>
          <CommonButton
            title="Reset"
            bgColor="#cccc"
            @click="handleResetSearch"
          ></CommonButton>
        </div>

        <div>
          <CommonButton
            :width="160"
            title="Thêm phim mới"
            @click="handleCreateMovie"
          ></CommonButton>
        </div>
      </div>

      <CommonLoading v-if="isLoading"></CommonLoading>
      <MovieCrud v-else :listData="listMovieSearch"></MovieCrud>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '~/stores/movie/movie-store'
import { storeToRefs } from 'pinia'

const movieStore = useMovieStore()
const { listMovie } = storeToRefs(movieStore)

const listMovieSearch = ref<any>([])
const movieSearch = ref<any>()
const isLoading = ref(false)

onMounted(async () => {
  if (!listMovie.value?.length) {
    isLoading.value = true
    await movieStore.getAllMovie()
    isLoading.value = false
  }
  listMovieSearch.value = listMovie.value
})

const handleCreateMovie = () => {
  navigateTo('/movie/create')
}

const convertToSlug = (movieName: string) => {
  const arrWord = movieName.split(' ').filter((word) => word !== '')
  let movieSlug = ''
  for (let i = 0; i < arrWord.length - 1; i++) {
    movieSlug += arrWord[i] + '-'
  }
  movieSlug += arrWord[arrWord.length - 1]

  return movieSlug
}

const handleSearchMovie = () => {
  if (!movieSearch.value) {
    console.log('tet')
    listMovieSearch.value = listMovie.value
    return
  }

  const resultSearch: any = []
  listMovie.value.forEach((movie: any) => {
    const slug = convertToSlug(movieSearch.value).toLowerCase()
    if (
      movie.name.toLowerCase().includes(movieSearch.value.toLowerCase()) ||
      movie.slug.toLowerCase().includes(slug)
    ) {
      resultSearch.push(movie)
    }
  })
  listMovieSearch.value = resultSearch
}

const handleResetSearch = () => {
  movieSearch.value = ''
  listMovieSearch.value = listMovie.value
}
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
