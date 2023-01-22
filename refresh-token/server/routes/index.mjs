import loginRouter from "./login.mjs";
/**
 * 
 * @param {Express} app 
 */
function routes(app) {
  app.get('/', (req, res)=> res.status(200).send('app server say hello for you'))
  app.use('/login', loginRouter)
};

export default routes;