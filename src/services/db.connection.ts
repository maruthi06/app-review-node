import { MongoClient, Db } from 'mongodb';
import { Logger } from './logger';

export class DbConnection {
    private dbInstance!: Db;
    private mongoClient!: MongoClient;

    constructor(private connectionString: string, private logger: Logger) {
        this.mongoClient = new MongoClient(this.connectionString);
    }

    public async createConnection() {
        try {
            this.logger.info("Creating connection to DB");

            await this.mongoClient.connect();

            this.dbInstance = this.mongoClient.db();

            this.logger.info("Connection successfully estblished to DB");

            return this.dbInstance;
        } catch (error) {
            this.logger.error("Error connecting to db", error);

            throw error;
        }
    }

    public getDbInstance() {
        return this.dbInstance;
    }

    public async disconnect() {
        this.logger.info("Db disconnecting")
        return this.mongoClient.close();
    }
}
