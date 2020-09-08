import apisauce from 'apisauce'

let url = 'http://1.179.246.6:8080/api/v1'

const create = (baseURL = url) => {
  const api = apisauce.create({
    baseURL,
    timeout: 10000
  })

  const login = (data) => api.post('login', data, { headers: { lang: 'th' } })
  const getProfile = (id) => api.get('/member/'+id, null, { headers: { lang: 'th' } })

  return {
    login,
    getProfile,
  }
}

export default {
  create
}