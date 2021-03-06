import Koa from 'koa'
import joi from 'joi'
import { MongoUser } from '../../model'
import { pick } from 'lodash'
import { UserStat } from '../../model/User'
import { ObjectId } from 'mongodb'

const queryValidator = joi.object({
    _id: joi.string().allow(null).optional(),
    username: joi.string().allow(null).optional(),
})
export async function query(ctx: Koa.Context) {
    try {

        const { _id, username } = ctx.request.body
        const { error } = queryValidator.validate({ _id, username })
        if (error || (_id == undefined && username == undefined)) {
            ctx.body = {
                code: 1,
                message: error?.message ?? '参数错误',
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
            data: pick(mongoUser, ['_id', 'username', 'stat'])
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
        const { _ids, usernames } = ctx.request.body
        const { error } = queryMultiUserValidator.validate({ _ids, usernames })
        _ids as string[] | null
        usernames as string[] | null
        if (error || (_ids == undefined && usernames == undefined)) {
            ctx.body = {
                code: 1,
                message: error?.message ?? '参数错误',
                data: null
            }
            return
        }

        const responseData: {
            _idMap: {
                [_id: string]: {
                    _id?: ObjectId, username?: string, stat?: UserStat
                } | null
            } | null,
            usernameMap: {
                [username: string]: {
                    _id?: ObjectId, username?: string, stat?: UserStat
                } | null
            } | null
        } = { _idMap: null, usernameMap: null }

        if (_ids) {
            responseData._idMap = {}
            for (const _id of _ids) {
                const mongoUser = await MongoUser.fromId(_id)
                responseData._idMap[_id] = mongoUser != null ? pick(mongoUser, ['_id', 'username', 'stat']) : null
            }
        }

        if (usernames) {
            responseData.usernameMap = {}
            for (const username of usernames) {
                const mongoUser = await MongoUser.fromUsername(username)
                responseData.usernameMap[username] = mongoUser != null ? pick(mongoUser, ['_id', 'username', 'stat']) : null
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