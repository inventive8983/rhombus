import axios from 'axios'
import {API_BASE_URL} from '../constants/ApiConstant'

var orderAPI = {}

orderAPI.getOrders = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/cart/orders`)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}

orderAPI.getOrder = (params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/cart/order/${params.id}`)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error);
      reject(error)
    })
  })
}


export default orderAPI