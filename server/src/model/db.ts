import { MongoClient } from "mongodb"
import { config } from "../config"

export const mongoClient = MongoClient.connect(config.mongodbUrl, (err, client) => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected to mongodb')
    }
})