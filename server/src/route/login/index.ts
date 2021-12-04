import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { Context, DefaultState } from 'koa'
import { login } from './login'

export const loginRouter = new Router<DefaultState, Context>()
    .post('/login', bodyParser(), login)