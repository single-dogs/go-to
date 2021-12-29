import { ObjectId } from "mongodb";

export interface UserInfo { // jwt fields
    _id: ObjectId
    username: string
    password: string
}

export interface JwtPayload {
    userinfo?: UserInfo
}

// koa context 
declare module 'koa' {
    interface DefaultContext {
        state: JwtPayload
    }
}