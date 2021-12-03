"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const config_1 = require("./config");
const mongodb_1 = require("mongodb");
const app = new koa_1.default();
app.use(ctx => {
    ctx.body = 'hello world';
});
const mongoclient = mongodb_1.MongoClient.connect(config_1.config.mongodbUrl, (err, client) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('connected to mongodb');
    }
});
app.listen(config_1.config.serverPort, undefined, () => { console.log(`gotoServer is running at ${config_1.config.serverPort}`); });
