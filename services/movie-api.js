import axios from 'axios'
import getConfigHeader from './config-header'

const BASE_URL_MOVIEGR = 'http://localhost:5000/admin/movieGroup'
const BASE_URL_MOVIE = 'http://localhost:5000/movie'

const movieApi = {
  getAllMovie: async () => {
    try {
      const configHeader = getConfigHeader()
      const res = await axios.get(`${BASE_URL_MOVIE}`, configHeader)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  getMovieDetail: async (movieSlug) => {
    try {
      const configHeader = getConfigHeader()
      const res = await axios.get(`${BASE_URL_MOVIE}/detail/${movieSlug}`, configHeader)
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
        configHeader
      )
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  createMovie: async (movieData) => {
    try {
      const configHeader = getConfigHeader()
      const res = await axios.post(`${BASE_URL_MOVIE}/create`, movieData, configHeader)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  deleteMovie: async (movieId) => {
    try {
      const configHeader = getConfigHeader()
      const res = await axios.delete(`${BASE_URL_MOVIE}/delete/${movieId}`, configHeader)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
}

const handleError = (err) => {
  console.log(err)
}
export default movieApi
