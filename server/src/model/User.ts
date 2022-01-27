import { ObjectId, } from "mongodb"
import { gotoDB } from "./db"
import { pick } from 'lodash'
import bycript from "bcryptjs"
import joi from 'joi'

const UsersCollection = gotoDB.collection("users")

const validators = {
    username: joi.string().min(3).max(30),
    password: joi.string().min(8).max(30),
}

export interface UserStat {
    appointmentCount: number,
}

export class MongoUser {
    private __id: ObjectId
    private _username: string
    private _hashedPassword: string
    private _stat: UserStat | undefined

    public static readonly validator = joi.object({
        username: validators.username.allow(null).optional(),
        password: validators.password.allow(null).optional(),
    })

    public get _id() { return this.__id }
    public get username() { return this._username }
    public get hashedPassword() { return this._hashedPassword }
    public get stat() { return this._stat }

    private constructor({ _id, username, hashedPassword, stat }: {
        _id: ObjectId
        username: string
        hashedPassword: string
        stat?: UserStat
    }) {
        this.__id = _id
        this._username = username
        this._hashedPassword = hashedPassword
        this._stat = stat
    }

    public async comparePassword(password: string | undefined): Promise<boolean> {
        if (this._hashedPassword == undefined) { return false }
        if (password == undefined) { return false }
        return await bycript.compare(password, this._hashedPassword)
    }

    public async validateAndUpdate({ username, password }: {
        username?: string
        password?: string
    }) {
        // validate
        if (username == undefined && password == undefined) { return /* no update */ }
        const { error } = MongoUser.validator.validate({ username, password })
        if (error) { throw error }

        // update
        const setter: any = {}
        if (username) { setter.username = username }
        if (password) { setter.hashedPassword = await bycript.hash(password, 10) }

        const re = await UsersCollection.updateOne({ _id: this._id }, {
            $set: setter
        })
        if (re.acknowledged == false) { throw new Error("更新失败") }

        // update object
        const updated = await UsersCollection.findOne({ _id: this._id })
        if (updated == undefined) { throw new Error("更新失败") }
        this.__id = updated._id
        this._username = updated.username
        this._hashedPassword = updated._hashedPassword
    }

    public static async fromId(id: ObjectId | string | undefined): Promise<MongoUser | null> {
        if (id == undefined) { return null }
        const user = await UsersCollection.findOne({ _id: id instanceof ObjectId ? id : ObjectId.createFromHexString(id) })
        if (user == undefined) { return null }
        return new MongoUser(user as any)
    }

    public static async fromUsername(username: string | undefined): Promise<MongoUser | null> {
        if (username == undefined) { return null }
        const user = await UsersCollection.findOne({ username })
        if (user == undefined) { return null }
        return new MongoUser(user as any)
    }

}

export class UnknownUser {
    private _username: string
    private _password: string
    private _hashedPassword: string
    private _stat: UserStat = { appointmentCount: 0 }

    public static readonly validator = joi.object({
        username: validators.username.required(),
        password: validators.password.required(),
    })

    public get username(): string { return this._username }
    public get password(): string { return this._password }
    public get hashedPassword(): string { return this._hashedPassword }
    public get stat(): UserStat { return this._stat }

    public constructor({ username, password }: {
        username: string
        password: string
    }) {
        this._username = username
        this._password = password
        this._hashedPassword = bycript.hashSync(this.password, 10)
    }

    public async comparePassword(password: string): Promise<boolean> {
        if (this.hashedPassword == undefined) { return false }
        return await bycript.compare(password, this.hashedPassword)
    }

    public async save() {
        return await UsersCollection.insertOne(pick(this, ["username", "hashedPassword", "stat"]))
    }
}