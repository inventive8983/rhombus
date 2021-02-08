import axios from 'axios'
import {API_BASE_URL} from '../constants/ApiConstant'

var generalAPI = {}

generalAPI.getContent = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/general/${params.content}`)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

generalAPI.updateContent = (params,data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${API_BASE_URL}/general/update/${params.content}`, {content: data})
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}



export default generalAPI



