import Koa from 'koa'
import { config } from './config'

const app = new Koa()

app.use(ctx => {
    ctx.body = 'hello world'
})

app.listen(config.serverPort, undefined, () => { console.log(`gotoServer is running at ${config.serverPort}`) })