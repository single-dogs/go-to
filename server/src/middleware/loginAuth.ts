import Koa from "koa";
import { MongoUser } from "../model/User"

export async function loginAuth(ctx: Koa.Context, next: Koa.Next) {
    if (! await (await MongoUser.fromId(ctx.state.userinfo?._id))?.comparePassword(ctx.state.userinfo?.password)) {
        ctx.body = {
            code: 1,
            message: "登录信息失效",
            data: null,
        }
        return
    }
    await next()
}
