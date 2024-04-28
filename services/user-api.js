import axios from 'axios'
import getConfigHeader from './config-header'

const BASE_URL_USER = 'http://localhost:5000/user'

const userApi = {
  getAllUser: async () => {
    try {
      const res = await axios.get(`${BASE_URL_USER}/all`)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  deleteUser: async (userId) => {
    try {
      await axios.delete(`${BASE_URL_USER}/delete/${userId}`)
    } catch (error) {
      handleError(error)
    }
  },
  deleteComment: async (commentId) => {
    try {
      await axios.delete(`${BASE_URL_USER}/delete/comment/${commentId}`)
    } catch (error) {
      handleError(error)
    }
  },
}

const handleError = (err) => {
  console.log(err)
}
export default userApi
