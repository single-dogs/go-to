import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { register } from './register'
import { update } from './update'
import { query, queryMultiUser } from './query'
import { UserLoginedAuthMiddleware } from '../../middleware/jwtAuth'
import { Context, DefaultState } from 'koa'
import { loginAuth } from '../../middleware/loginAuth'

export const userRouter = new Router<DefaultState, Context>()
    .post('/user', bodyParser(), register)
    .put('/user', UserLoginedAuthMiddleware, loginAuth, bodyParser(), update)
    .get('/user', query)
    .get('/users', queryMultiUser)