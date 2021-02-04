import axios from 'axios'
import {API_BASE_URL} from '../constants/ApiConstant'

var generalAPI = {}

generalAPI.getContent = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/general/content`)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

generalAPI.getTestimonials = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/general/testimonials`)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

generalAPI.updateContent = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    axios.post(`${API_BASE_URL}/general/content`, data)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

generalAPI.updateTestimonials = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    axios.post(`${API_BASE_URL}/general/testimonials`, data)
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



