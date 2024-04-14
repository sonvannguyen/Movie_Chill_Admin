import axios from 'axios'
import getConfigHeader from './config-header'

const BASE_URL_MOVIEGR = 'http://localhost:5000/admin/movieGroup'
const BASE_URL_MOVIE = 'http://localhost:5000/movie'

const movieApi = {
  getAllMovie: async () => {
    try {
      const res = await axios.get(`${BASE_URL_MOVIE}`)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  getMovieDetail: async (movieSlug) => {
    try {
      const res = await axios.get(`${BASE_URL_MOVIE}/detail/${movieSlug}`)
      return {
        ...res.data?.movie,
      }
    } catch (error) {
      handleError(error)
    }
  },
  updateMovie: async (movieId, movieData) => {
    try {
      const configHeader = getConfigHeader()
      const res = await axios.put(
        `${BASE_URL_MOVIE}/update/${movieId}`,
        movieData,
      )
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  //   getMoviesByGroupName: async (movieGroupName) => {
  //     try {
  //       const res = await axios.get(`${BASE_URL_MOVIEGR}/${movieGroupName}`)
  //       return res.data
  //     } catch (error) {
  //       handleError(error)
  //     }
  //   },
  //   searchMovie: async ({ movieName, page }) => {
  //     try {
  //       const res = await axios.get(
  //         `${BASE_URL_MOVIE}/search?movieName=${movieName}&page=${page}`,
  //       )
  //       return res.data
  //     } catch (error) {
  //       handleError(error)
  //     }
  //   },
  //   filterMovie: async ({ search, page }) => {
  //     try {
  //       let res = {}
  //       if (search.includes('page=')) {
  //         const newSearch = search.replace(/page=\d+/, 'page=')
  //         res = await axios.get(`${BASE_URL_MOVIE}/filter${newSearch}${page}`)
  //       } else {
  //         res = await axios.get(`${BASE_URL_MOVIE}/filter${search}`)
  //       }
  //       return res.data
  //     } catch (error) {
  //       handleError(error)
  //     }
  //   },
  //   getMovieRecommend: async (filter) => {
  //     try {
  //       const { type, category, country } = filter
  //       const res = await axios.get(
  //         `${BASE_URL_MOVIE}/filter?type=${type}&category=${category}&country=${country}`,
  //       )
  //       return res.data
  //     } catch (error) {
  //       handleError(error)
  //     }
  //   },
  //   createNewComment: async (commentData) => {
  //     try {
  //       const configHeader = getConfigHeader()
  //       const res = await axios.post(
  //         `${BASE_URL_MOVIE}/create/comment`,
  //         commentData,
  //         configHeader,
  //       )
  //       return res.data
  //     } catch (error) {
  //       handleError(error)
  //     }
  //   },
  //   deleteComment: async ({ movieId, commentId }) => {
  //     try {
  //       const configHeader = getConfigHeader()
  //       const res = await axios.delete(
  //         `${BASE_URL_MOVIE}/${movieId}/comment/${commentId}`,
  //         configHeader,
  //       )
  //       return res.data
  //     } catch (error) {
  //       handleError(error)
  //     }
  //   },
}

const handleError = (err) => {
  console.log(err)
}
export default movieApi
