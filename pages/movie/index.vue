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
        </div>

        <div>
          <CommonButton
            :width="160"
            title="Thêm phim mới"
            @click="handleCreateMovie"
          ></CommonButton>
        </div>
      </div>

      <MovieCrud :listData="listMovieSearch"></MovieCrud>
    </div>
  </div>
</template>

<script setup lang="ts">
import movieApi from '~/services/movie-api'

const listMovie = ref<any>([])
const listMovieSearch = ref<any>([])
const movieSearch = ref<any>()

onMounted(async () => {
  const response = await movieApi.getAllMovie()
  if (response?.moviesData?.length) {
    listMovie.value = response.moviesData
    listMovieSearch.value = response.moviesData
  }
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

  console.log(movieSearch.value)
  console.log('slug: ', convertToSlug(movieSearch.value).toLowerCase())
  console.log(resultSearch)
}
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
