import axios from 'axios'
import getConfigHeader from './config-header'

const API_URL = 'http://localhost:5000/upload/image'

const uploadImage = async (fileToUpload) => {
  try {
    const configHeader = getConfigHeader()

    const res = await axios.post(API_URL, fileToUpload, configHeader)
    const urlImageCloud = res.data.secure_url
    return urlImageCloud
  } catch (err) {
    return err.message
  }
}

export default uploadImage
