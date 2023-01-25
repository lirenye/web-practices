import express from 'express'
import { secret } from '../config/index.mjs';


const loginRouter = express.Router()
import jwt from 'jsonwebtoken';
const payload = {username: 'lirenye'}



loginRouter.post('/', (req, res)=>{
  const accessToken = jwt.sign(payload, secret, {expiresIn: "3s"})
  const refreshToken = jwt.sign(payload, secret, {expiresIn: '6s'})
  res.send({status: 200, msg: 'Login OK', data: {
    accessToken,
    refreshToken
  }})
})

loginRouter.post('/verify_token',(req, res)=>{
  res.send('token OK')
})

// 刷新token接口
loginRouter.post('/refresh_token', (req, res)=>{
  const token = req.body.refresh_token
  if(!token) {
    console.log(`/refresh_token: not found token`);
    return res.status(401).send('not found token')
  };


  try{
    jwt.verify(token, secret)

    const access_token = jwt.sign(payload, secret, {expiresIn: '3s'})
    const refresh_token = jwt.sign(payload, secret, {expiresIn: '6s'})
    res.send({
      access_token,
      refresh_token
    })
  }catch(error){
    res.status(401).send('verify token error')
  }
})



export default loginRouter;