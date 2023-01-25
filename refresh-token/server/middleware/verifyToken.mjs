import { secret } from "../config/index.mjs";
import jwt from 'jsonwebtoken'

const allow = ['/login', '/login/refresh_token']

/**
 * @description 验证token middleware
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export default function validToken(req, res, next){
  // console.log(req.path)
  try {
    const uri = req.path;
    const token = req.headers.authorization;
    if(allow.indexOf(uri) === -1){
      // valid token
      jwt.verify(token, secret)
      next()
    }else {
      next();
    }
  } catch (error) {
    res.status(401).send('token error')
  }
}