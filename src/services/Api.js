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
  },
  async updateUser (updateUser) {
    const response = await API.put('/me/profile', {
      ...updateUser
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return response.data
  },
  async getMe () {
    const response = await API.get('/me/profile', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return response.data
  },
  async startRoom (room) {
    const response = await API.post('/me/rooms', {
      ...room
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return response.data
  },
  async getMyRooms () {
    const response = await API.get('/me/rooms', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return response.data
  },
  async getMessageByRoom (roomid) {
    const response = await API.get(`/me/rooms/${roomid}/msg`, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return response.data
  },
  async newMsn (roomid, newmsg) {
    const response = await API.post(`/me/rooms/${roomid}`, {
      ...newmsg
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    return response.data
  }
}
