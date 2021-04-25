import { Db, MongoClient } from "mongodb";

const dbUri = process.env.DB_URL as string;

const mongoClient = new MongoClient(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// DB object to be used for all queries
export let db: Db;

export async function connectDb(): Promise<MongoClient> {
    return mongoClient.connect().then((mongoClient) => {
        // Set DB variable after successfull connection
        db = mongoClient.db(process.env.DB_NAME);
        // Return client
        return mongoClient;
    });
}
