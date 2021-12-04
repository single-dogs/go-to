import jwt from 'jsonwebtoken'
import Koa from 'koa';
import { config } from '../config'
import { JwtPayload } from '../interface';

export async function jwtAuth(ctx: Koa.Context, next: Koa.Next) {
    const authorization = ctx.header.authorization
    if (!authorization) {
        ctx.body = {
            code: 1,
            message: 'Token 无效',
        }
        return
    }
    const parts = authorization.split(' ')
    if (parts.length !== 2) {
        ctx.body = {
            code: 1,
            message: 'Token 无效'
        }
        return
    }
    const [scheme, token] = parts
    if (!/^Bearer$/i.test(scheme)) {
        ctx.body = {
            code: 1,
            message: 'Token 无效'
        }
        return
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret)
        ctx.jwtdata = decoded as JwtPayload // as JwtPayload
    } catch (err) {
        ctx.body = {
            code: 1,
            message: 'Token 无效'
        }
        return
    }
    await next()
}