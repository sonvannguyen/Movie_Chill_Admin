import axios from 'axios'
import getConfigHeader from './config-header'

const BASE_URL_NOTIFICATION = 'http://localhost:5000/notification/'

const notificaitonApi = {
  getAllNotification: async () => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.get(`${BASE_URL_NOTIFICATION}/history`, configHeader)
      return res.data
    } catch (error) {
      handleError(error)
    }
  },
  deleteNotification: async (notificationId) => {
    try {
      const configHeader = getConfigHeader();
      await axios.delete(`${BASE_URL_NOTIFICATION}/delete/${notificationId}`, configHeader)
    } catch (error) {
      handleError(error)
    }
  },
  createNotification: async (content) => {
    try {
      const configHeader = getConfigHeader();
      await axios.post(`${BASE_URL_NOTIFICATION}/create`, {
        content,
      }, configHeader)
    } catch (error) {
      handleError(error)
    }
  },
}

const handleError = (err) => {
  console.log(err)
}
export default notificaitonApi
