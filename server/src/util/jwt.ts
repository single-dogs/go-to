import jwt from 'jsonwebtoken'
import { config } from '../config'
import { UserInfo, JwtPayload } from '../interface';
import Koa from 'koa'

function _signJWT(userinfo: UserInfo): string {
    const payload: JwtPayload = { userinfo, }
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
}

export abstract class JwtValidator {
    static signJWT(payload: any) {
        throw new Error('Not implemented');
    }

    static verifyJWT(token: string) {
        throw new Error('Not implemented');
    }

    static async auth(ctx: Koa.Context, next: Koa.Next) {
        throw new Error('Not implemented');
    }
}

export class JwtUserValidator extends JwtValidator {
    static signJWT(userinfo: UserInfo): string {
        return _signJWT(userinfo);
    }

    static verifyJWT(token: string): JwtPayload {
        return jwt.verify(token, config.jwtSecret) as JwtPayload;
    }

    static async auth(ctx: Koa.Context, next: Koa.Next) {
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
            if (typeof decoded === 'string' || decoded.userinfo == undefined) {
                throw new Error()
            }
            ctx.state.userinfo = typeof decoded == 'string' ? decoded : decoded.userinfo // as JwtPayload
        } catch (err) {
            ctx.body = {
                code: 1,
                message: 'Token 无效'
            }
            return
        }
        await next()
    }
}