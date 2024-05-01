import axios from 'axios'
import getConfigHeader from './config-header'

const BASE_URL_USER = 'http://localhost:5000/user'

const userApi = {
  getAllUser: async () => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.get(`${BASE_URL_USER}/all`, configHeader)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  deleteUser: async (userId) => {
    try {
      const configHeader = getConfigHeader();
      await axios.delete(`${BASE_URL_USER}/delete/${userId}`, configHeader)
    } catch (error) {
      handleError(error)
    }
  },
  deleteComment: async (commentId) => {
    try {
      const configHeader = getConfigHeader();
      await axios.delete(`${BASE_URL_USER}/delete/comment/${commentId}`, configHeader)
    } catch (error) {
      handleError(error)
    }
  },
}

const handleError = (err) => {
  console.log(err)
}
export default userApi
