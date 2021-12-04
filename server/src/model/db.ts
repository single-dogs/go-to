import { MongoClient } from "mongodb"
import { config } from "../config"

export const mongoClient = new MongoClient(config.mongodbUrl)
export const gotoDB = mongoClient.db("goto")


async function connect() {
    await mongoClient.connect();
    await mongoClient.db("admin").command({ ping: 1 });

    console.log("Connected successfully to mongodb server");
}

connect().catch(console.error).then(async () => {
    await gotoDB.collection("users").createIndex({ username: 1 }, { unique: true })
});