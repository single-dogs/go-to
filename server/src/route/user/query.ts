import Koa from 'koa'
import joi from 'joi'
import { MongoUser } from '../../model'
import { pick } from 'lodash'

const queryValidator = joi.object({
    _id: joi.string().allow(null).optional(),
    username: joi.string().allow(null).optional(),
})
export async function query(ctx: Koa.Context) {
    try {

        const { _id, username } = ctx.query
        const { error } = queryValidator.validate({ _id, username })
        if (error || (_id == undefined && username == undefined)) {
            ctx.body = {
                code: 1,
                message: '参数错误',
                data: null
            }
            return
        }

        let mongoUser = null
        if (username) {
            mongoUser = await MongoUser.fromUsername(username as string)
        } else {
            mongoUser = await MongoUser.fromId(_id as string)
        }

        if (mongoUser == null) {
            ctx.body = {
                code: 1,
                message: '用户不存在',
                data: null
            }
            return
        }

        ctx.body = {
            code: 0,
            message: '查询成功',
            data: pick(mongoUser, ['_id', 'username'])
        }
    } catch (error: any) {
        ctx.body = {
            code: 1,
            message: error?.message,
            data: null
        }

    }

}

const queryMultiUserValidator = joi.object({
    _ids: joi.array().items(joi.string()).allow(null).optional(),
    usernames: joi.array().items(joi.string()).allow(null).optional(),
})

export async function queryMultiUser(ctx: Koa.Context) {
    try {
        const { _ids, usernames } = ctx.query
        const { error } = queryMultiUserValidator.validate({ _ids, usernames })
        _ids as string[] | null
        usernames as string[] | null
        if (error || (_ids == undefined && usernames == undefined)) {
            ctx.body = {
                code: 1,
                message: '参数错误',
                data: null
            }
            return
        }

        const responseData: {
            _idMap: {
                [_id: string]: {
                    _id?: string, username?: string
                } | null
            } | null,
            usernameMap: {
                [username: string]: {
                    _id: string, username: string
                } | null
            } | null
        } = { _idMap: null, usernameMap: null }

        if (_ids) {
            responseData._idMap = {}
            for (const _id of _ids) {
                const mongoUser = await MongoUser.fromId(_id)
                responseData._idMap[_id] = mongoUser ? { _id: mongoUser._id.toString(), username: mongoUser.username } : null
            }
        }

        if (usernames) {
            responseData.usernameMap = {}
            for (const username of usernames) {
                const mongoUser = await MongoUser.fromUsername(username)
                responseData.usernameMap[username] = mongoUser ? { _id: mongoUser._id.toString(), username: mongoUser.username } : null
            }
        }

        ctx.body = {
            code: 0,
            message: '查询成功',
            data: responseData
        }
    } catch (error: any) {
        ctx.body = {
            code: 1,
            message: error?.message,
            data: null
        }

    }

}