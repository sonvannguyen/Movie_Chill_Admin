import axios from 'axios'
import getConfigHeader from './config-header'

const BASE_URL_ADMIN = 'http://localhost:5000/admin'

const adminApi = {
  getAllCommentReport: async () => {
    try {
      const res = await axios.get(`${BASE_URL_ADMIN}/report/comment`)
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
