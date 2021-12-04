import Koa from 'koa'
import Router from 'koa-router'
import { config } from './config'
import { rootRouter } from './route'

const app = new Koa()
app.use(new Router().get('/', (ctx) => {
    ctx.body = 'Hello World'
}).routes())
app.use(rootRouter.routes())
    .use(rootRouter.allowedMethods())

app.listen(config.serverPort, undefined, () => {
    console.log(`gotoServer is running at ${config.serverPort}`)
})