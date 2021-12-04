import Koa from "koa";
import { MongoUser } from "../model/User"

export async function loginAuth(ctx: Koa.Context, next: Koa.Next) {
    if (!(await MongoUser.fromId(ctx.jwtdata.userinfo?._id))
        ?.comparePassword(ctx.jwtdata.userinfo?.password)) {
        ctx.body = {
            code: 1,
            message: "登录信息失效",
            data: null,
        }
        return
    }
}
