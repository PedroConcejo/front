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
  },
  async login (user) {
    const response = await API.post('/auth/login', {
      ...user
    })
    return response.data
  },
  async signup (newUser) {
    const response = await API.post('/auth/signup', {
      ...newUser
    })
    return response.data
  },
  async getPartnerStyles (id) {
    const response = await API.get(`/partners/${id}/styles`)
    return response.data
  },
  async getAllByStyles (name = '', location = '', style = '') {
    const response = await API.get(
      `/partners/styles?name=${name}&location=${location}&style=${style}`
    )
    return response.data
  }

}
