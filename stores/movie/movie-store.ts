import movieApi from '~/services/movie-api'

export const useMovieStore = defineStore('movie', () => {
  const listMovie = ref([])

  async function getAllMovie() {
    const movies = await movieApi.getAllMovie()
    listMovie.value = movies
  }

  return {
    listMovie,
    getAllMovie,
  }
})
