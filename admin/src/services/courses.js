import axios from 'axios'
import {API_BASE_URL} from '../constants/ApiConstant'

var courseAPI = {}

courseAPI.getAllCourses = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/course/all`, params)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

courseAPI.getCourse = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/course/${params.id}`)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

courseAPI.duplicate = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/course/duplicate/${params.id}`)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}


courseAPI.addCourse = (data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${API_BASE_URL}/course/add`, data)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

courseAPI.changeStatus = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/course/status/${params.id}/${params.status}`)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

courseAPI.deleteCourse = (params) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${API_BASE_URL}/course/delete/${params.id}`,)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

export default courseAPI



