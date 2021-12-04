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

const updateValidator = joi.object({
    username: validators.username,
    password: validators.password,
})

export class MongoUser {
    protected __id: ObjectId
    protected _username: string
    protected _hashedPassword: string

    public get _id() { return this.__id }
    public get username() { return this._username }
    public get hashedPassword() { return this._hashedPassword }

    private constructor({ _id, username, hashedPassword }: {
        _id: ObjectId
        username: string
        hashedPassword: string
    }) {
        this.__id = _id
        this._username = username
        this._hashedPassword = hashedPassword
    }

    async comparePassword(password: string | undefined): Promise<boolean> {
        if (this._hashedPassword == undefined) { return false }
        if (password == undefined) { return false }
        return await bycript.compare(password, this._hashedPassword)
    }

    async update({ username, password }: {
        username?: string
        password?: string
    }) {
        // validate
        const { error } = updateValidator.validate({ username, password })
        if (error) { throw error }

        // update
        const setter: any = {}
        if (username) { setter.username = username }
        if (password) { setter._hashedPassword = await bycript.hash(password, 10) }

        await UsersCollection.updateOne({ _id: this._id }, {
            $set: {
                username: this._username,
                hashedPassword: this._hashedPassword
            }
        })
    }

    static async fromId(id: ObjectId | string | undefined): Promise<MongoUser | null> {
        if (id == undefined) { return null }
        const user = await UsersCollection.findOne({ _id: id instanceof ObjectId ? id : ObjectId.createFromHexString(id) })
        if (user == undefined) { return null }
        return new MongoUser(user as any)
    }

    static async fromUsername(username: string | undefined): Promise<MongoUser | null> {
        if (username == undefined) { return null }
        const user = await UsersCollection.findOne({ username })
        if (user == undefined) { return null }
        return new MongoUser(user as any)
    }

}

export class UnknownUser {
    protected _username: string
    protected _password: string
    protected _hashedPassword: string

    static readonly validator = joi.object({
        username: validators.username.required(),
        password: validators.password.required(),
    })

    public get username(): string { return this._username }
    public get password(): string { return this._password }
    public get hashedPassword(): string { return this._hashedPassword }

    constructor({ username, password }: {
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
        return await UsersCollection.insertOne(pick(this, ["username", "hashedPassword"]))
    }
}