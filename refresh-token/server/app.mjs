import express from 'express'
import routes from './routes/index.mjs';
import initMiddlewate from './middleware/index.mjs'

const app = express();
const port = 3000;

initMiddlewate(app)

app.listen(port, ()=> {
  console.log(`server running at ${port} port`)
  routes(app)
})