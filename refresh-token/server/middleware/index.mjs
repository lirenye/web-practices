import express from 'express'
import cors from 'cors'
import validToken from './verifyToken.mjs'

/**
 * 
 * @param {Express} app express instance
 */
function initMiddleware(app){
  app.use(express.json())
  app.use(cors())
  // app.use((req, res, next)=>{
  //   console.log(res.status(401));
  //   next()
  // })
  app.use(validToken)
}

export default initMiddleware;