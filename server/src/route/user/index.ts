import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { register } from './register'
import { update } from './update'
import { jwtAuth } from '../../middleware/jwtAuth'
import { Context, DefaultState } from 'koa'

export const userRouter = new Router<DefaultState, Context>()
    .post('/user', bodyParser(), register)
    .put('/user', jwtAuth, bodyParser(), update)