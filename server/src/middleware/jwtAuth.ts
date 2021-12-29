import { JwtUserValidator } from '../util/jwt';
export const UserLoginedAuthMiddleware = JwtUserValidator.auth