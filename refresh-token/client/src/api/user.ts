import axios from '../utils/axios'

/**
 * @description 用户登陆请求
 * @returns {object} token
 */
export function login(){
  return axios.post('/login')
}


export function verifyTokenAPI(){
  return axios.post('/login/verify_token')
}