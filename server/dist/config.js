"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    serverPort: process.env.GOTO_PORT || 8080,
    mongodbUrl: process.env.GOTO_MONGOURL || 'mongodb://MongoDB:27017/goto',
};
