import axios from 'axios'

export const Api_client = axios.create({
    baseURL:"http://127.0.0.1:8000/api/",
    params:{key: localStorage.getItem('token')}
})