import axios,{type AxiosRequestConfig, type AxiosResponse, type AxiosError} from 'axios'
import router from '@/router'


const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})

// 请求拦截器
instance.interceptors.request.use((config: AxiosRequestConfig) =>{
  const access_token = localStorage.getItem('access_token')

  if(access_token){
    config.headers['authorization'] = access_token
  }

  return config;
})


// 响应拦截器
instance.interceptors.response.use((config: AxiosResponse) => config, (error: AxiosError)=>{
  //  保存请求失败配置信息
  const originalRequest = error.config as AxiosRequestConfig
  
  if(error.response?.status === 401 && originalRequest.url !== '/login/refresh_token'){

    const refresh_token = localStorage.getItem('refresh_token')
    // 发送获取新token请求
    console.log('token 过期，使用备用token刷新')
    return instance.post('/login/refresh_token',{
      refresh_token
    }).then(response=>{
      if(response.data.access_token){
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('refresh_token', response.data.refresh_token)

        originalRequest.headers['authorization'] = response.data.access_token
        console.log('token刷新成功，重新发送请求')
        return axios(originalRequest)
      } else {
        console.log('没有token数据，返回登陆页面')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        router.push({replace: true, path: '/login'})
      };
    }).catch(error=>{
      console.log(`刷新token请求失败`)
      
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      router.push({ path: '/login'})
    })
  }
  return Promise.reject(error)
})
export default instance;