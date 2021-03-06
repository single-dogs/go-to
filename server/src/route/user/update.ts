import { Context } from "koa"
import { MongoUser } from "../../model"
import joi from "joi"
import { pick } from "lodash"

const validator = joi.object({
    newUsername: joi.string().allow(null).optional(),
    newPassword: joi.string().allow(null).optional(),
    oldPassword: joi.string().required(),
})

export async function update(ctx: Context) {
    try {
        // validate
        const { error } = validator.validate(ctx.request.body)
        if (error || (ctx.request.body.newUsername == undefined && ctx.request.body.newPassword == undefined)) {
            ctx.body = {
                code: 1,
                message: error?.message ?? '参数错误',
                data: null,
            }
            return
        }

        // data
        const { newUsername, newPassword, oldPassword } = ctx.request.body
        const { userinfo: currentUser } = ctx.state

        // user in db
        let mongoUser = await MongoUser.fromId(currentUser?._id);
        if (!mongoUser) {
            ctx.body = {
                code: 1,
                message: '用户不存在',
                data: null,
            }
            return
        }

        // check old password
        if (! await mongoUser.comparePassword(oldPassword)) {
            ctx.body = {
                code: 1,
                message: "密码错误",
                data: null,
            }
            return
        }

        // update
        await mongoUser.validateAndUpdate({ username: newUsername, password: newPassword })

        ctx.body = {
            code: 0,
            message: '更新成功',
            data: pick(mongoUser, ['_id', 'username']),
        }

    } catch (error: any) {
        ctx.body = {
            code: 1,
            message: error?.message,
            data: null,
        }
    }
}
