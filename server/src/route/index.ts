import { Context, DefaultState } from 'koa'
import Router from 'koa-router'
import { userRouter } from './user'
import { loginRouter } from './login'

export const rootRouter = new Router<DefaultState, Context>()
    .use(userRouter.routes())
    .use(loginRouter.routes())
