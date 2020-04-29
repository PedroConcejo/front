import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  useCredentials: true
})
export default {
  async getAllCategories () {
    const response = await API.get('/categories')
    return response.data
  },
  async getAllLocations () {
    const response = await API.get('/locations')
    return response.data
  },
  async getAllPartners () {
    const response = await API.get('/partners')
    return response.data
  }

}
