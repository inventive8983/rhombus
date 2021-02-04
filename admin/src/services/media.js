import axios from 'axios'
import {API_BASE_URL} from '../constants/ApiConstant'

var mediaAPI = {}

mediaAPI.getGallery = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/general/media/${params.folder}`)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

mediaAPI.delete = (params) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${API_BASE_URL}/general/media/${params.folder}/${params.filename}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        console.log(error);
        reject(error)
      })
    })
  }

export default mediaAPI