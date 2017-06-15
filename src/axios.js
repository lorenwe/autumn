import axios from 'axios'
import router from './router'

const instance = axios.create()
// application/x-www-form-urlencoded
instance.defaults.headers.post['Content-Type'] = 'application/json'

// axios拦截请求
instance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    let AuthStr = localStorage.getItem('token')
    config.headers.Oauth = AuthStr.replace(/(^")|("$)/g, '')
  }
  return config
}, err => {
  return Promise.reject(err)
})

// axios拦截响应
instance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 401 清除token信息并跳转到登录页面
        localStorage.removeItem('token')
        console.log(error.response.status)
        console.log('登入超时')
        router.replace({
          path: '/Login'
        })
    }
  }
})

export default {
  // 用户注册
  UserRegister (data) {
    return instance.post('/api/account/regist', data)
  },
  // 用户登录
  UserLogin (data) {
    return instance.post('/api/account/login', data)
  },
  // 获取文章列表
  GetPostList () {
    return instance.post('/api/article/list')
  },
  // 添加文章
  AddPost () {
    return instance.post('/api/article/add')
  },
  // 保存文章
  SavePost (data) {
    return instance.post('/api/article/save', data)
  },
  // 保存文章排序
  SaveSort (data) {
    return instance.post('/api/article/save_sort', data)
  },
  // 上传文章图片
  UploadImg (data) {
    return instance.post('/api/article/upload', data)
  }
}
