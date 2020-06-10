import axios from 'axios'

export default axios.create({
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
})
