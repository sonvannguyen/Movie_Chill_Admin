import axios from 'axios'
import getConfigHeader from './config-header'

const BASE_URL_ADMIN = 'http://localhost:5000/admin'

const adminApi = {
  login: async (loginData) => {
    try {
      const res = await axios.post(`${BASE_URL_ADMIN}/login`, loginData)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  getAllCommentReport: async () => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.get(`${BASE_URL_ADMIN}/report/comment`, configHeader)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  getSystemStats: async () => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.get(`${BASE_URL_ADMIN}/system-stats`, configHeader)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
}

const handleError = (err) => {
  console.log(err)
}
export default adminApi
