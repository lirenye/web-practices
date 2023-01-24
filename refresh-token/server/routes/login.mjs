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




export default loginRouter;