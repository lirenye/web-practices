import express from 'express'
import cors from 'cors'

/**
 * 
 * @param {Express} app express instance
 */
function initMiddleware(app){
  app.use(express.json())
  app.use(cors())
}

export default initMiddleware;