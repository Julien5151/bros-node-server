import { MongoClient } from "mongodb";

const dbUri = `mongodb+srv://db-bros-admin:${process.env.DB_PASSWORD}@bros-mongo-development.nbukm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export async function connectDb(): Promise<MongoClient> {
    return mongoClient.connect();
}
