import axios from 'axios'
import {API_BASE_URL} from '../constants/ApiConstant'

var blogAPI = {}

blogAPI.getBlogs = (params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_BASE_URL}/blogs/all`)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            console.log(error);
            reject(error)
        })
    })
}

blogAPI.viewBlog = (params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_BASE_URL}/blogs/${params.id}`)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            console.log(error);
            reject(error)
        })
    })
}

blogAPI.addBlog = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_BASE_URL}/blogs/add`, data)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            console.log(error);
            reject(error)
        })
    })
}

blogAPI.updateBlog = (params, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_BASE_URL}/blogs/${params.id}`, data)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            console.log(error);
            reject(error)
        })
    })
}

blogAPI.publishBlog = (params, data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_BASE_URL}/blogs/publish/${params.id}`, data)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            console.log(error);
            reject(error)
        })
    })
}

blogAPI.deleteBlog = (params) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_BASE_URL}/blogs/${params.id}`)
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            console.log(error);
            reject(error)
        })
    })
}


export default blogAPI


