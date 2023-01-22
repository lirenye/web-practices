import express from 'express'
import jwt from 'jsonwebtoken';
import { LowSync} from 'lowdb'
import { JSONFileSync} from 'lowdb/node'
import { fileURLToPath} from 'node:url'
import { join, dirname} from 'node:path'


const loginRouter = express.Router();
// 数据库文件文件路径
const file = join(dirname(fileURLToPath(import.meta.url)), '../../db_data/db.json')
// 数据库实例
const db = new LowSync(new JSONFileSync(file));
// 读取文件数据
db.read()


loginRouter.get('/', (req, res)=>{
  res.send('login API OK')
})


export default loginRouter;