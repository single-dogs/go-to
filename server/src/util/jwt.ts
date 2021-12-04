import jwt from 'jsonwebtoken'
import { config } from '../config'
import { UserInfo, JwtPayload } from '../interface';

export function signJWT(userinfo: UserInfo): string {
    const payload: JwtPayload = { userinfo, }
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
}