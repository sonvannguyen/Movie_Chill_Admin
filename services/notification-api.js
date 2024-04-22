import axios from 'axios'
import getConfigHeader from './config-header'

const BASE_URL_NOTIFICATION = 'http://localhost:5000/notification/'

const notificaitonApi = {
  getAllNotification: async () => {
    try {
      const res = await axios.get(`${BASE_URL_NOTIFICATION}/history`)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  deleteNotification: async (notificationId) => {
    try {
      await axios.delete(`${BASE_URL_NOTIFICATION}/delete/${notificationId}`)
    } catch (error) {
      handleError(error)
    }
  },
  createNotification: async (content) => {
    try {
      await axios.post(`${BASE_URL_NOTIFICATION}/create`, {
        content,
      })
    } catch (error) {
      handleError(error)
    }
  },
}

const handleError = (err) => {
  console.log(err)
}
export default notificaitonApi
