export const config = {
    serverPort: process.env.GOTO_PORT || 8080,
    mongodbUrl: process.env.GOTO_MONGOURL || 'mongodb://MongoDB:27017/goto',
}