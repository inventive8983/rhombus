import axios from 'axios'
import {API_BASE_URL} from '../constants/ApiConstant'

var authAPI = {}

authAPI.login = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_BASE_URL}/admin/login`, data)
        .then(response => {
            localStorage.setItem('token', response.data)
            resolve(response.data)
        })
        .catch(error => {
            console.log(error);
            reject(error)
        })
    })
}

authAPI.getUser = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_BASE_URL}/admin/user`, data)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            console.log(error);
            reject(error)
        })
    })
}

export default authAPI