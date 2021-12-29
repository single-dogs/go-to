import { Context } from "koa"
import { pick } from "lodash"
import { MongoUser } from "../../model"
import { JwtUserValidator } from "../../util/jwt"

export async function login(ctx: Context) {
    try {
        const { username, password } = ctx.request.body
        const mongoUser = await MongoUser.fromUsername(username)
        if (mongoUser == null) {
            ctx.body = {
                code: 1,
                message: '用户不存在',
                data: null,
            }
            return
        }

        if (await mongoUser?.comparePassword(password)) {
            ctx.body = {
                code: 0,
                message: '登录成功',
                data: {
                    userinfo: pick(mongoUser, ['username', '_id']),
                    token: JwtUserValidator.signJWT({ _id: mongoUser._id, username: mongoUser.username, password }),
                },
            }
        } else {
            ctx.body = {
                code: 1,
                message: '密码错误',
                data: null,
            }
        }
    } catch (error: any) {
        ctx.body = {
            code: 1,
            message: error?.message,
            data: null,
        }
    }
}