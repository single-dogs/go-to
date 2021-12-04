export const config = {
    serverPort: process.env.GOTO_PORT || 8080,
    mongodbUrl: process.env.GOTO_MONGOURL || 'mongodb://MongoDB:27017/goto',
    jwtSecret: process.env.GOTO_JWT_SECRET || '$2a$10$276IoZRSc9mue9037dn4JOMLBY1aGPnfP.fGaREwD14q3VcUwSCk6',
    jwtExpiration: process.env.GOTO_JWT_EXPIRATION || '1h',
}