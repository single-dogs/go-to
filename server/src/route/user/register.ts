import { Context } from "koa"
import { MongoUser, UnknownUser } from "../../model"

export async function register(ctx: Context) {
    try {
        // validate
        const { username, password } = ctx.request.body
        const { error } = UnknownUser.validator.validate({ username, password });
        if (error) {
            ctx.body = {
                code: 1,
                message: error.message,
                data: null,
            }
            return
        }

        // check username
        const mongoUserFromUsername = await MongoUser.fromUsername(username);
        if (mongoUserFromUsername) {
            ctx.body = {
                code: 1,
                message: "用户名已存在",
                data: null,
            }
            return
        }

        const user = new UnknownUser({ username, password });
        const _id = (await user.save()).insertedId;

        ctx.body = {
            code: 0,
            message: '注册成功',
            data: {
                _id,
                username
            },
        }
    } catch (error: any) {
        ctx.body = {
            code: 1,
            message: error?.message,
            data: null,
        }
    }
}