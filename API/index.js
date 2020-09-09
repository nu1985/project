import apisauce from 'apisauce'

let url = 'http://1.179.246.6:8080/api/v1'

const create = (baseURL = url) => {
  const api = apisauce.create({
    baseURL,
    timeout: 100000
  })

  const login = (data) => api.post('/auth/signin', data)
  const signup = (data) => api.post('/auth/signup', data)
  const getProfile = (id) => api.get('/member/'+id)

  const getStatus = () => api.get('/status')
  const getUserLogin = () => api.get('/user/me')
  const updateUser = (data) => api.put('/user/me',data)

  return {
    login,
    signup,
    getProfile,
    getStatus,
    getUserLogin,
    updateUser,
  }
}

export default {
  create
}