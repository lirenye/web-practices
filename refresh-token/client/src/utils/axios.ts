import axios,{type AxiosRequestConfig, type AxiosResponse} from 'axios'

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
instance.interceptors.response.use((config: AxiosResponse) => config, (error)=>{
  console.log(error);
  return Promise.reject(error)
})
export default instance;