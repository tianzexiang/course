import axios from 'axios'

const baseURL = `http://localhost:4014`

const request = axios.create({
  baseURL
})

export { request }
