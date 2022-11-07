
// const { MongoClient } = require('mongodb')
import { MongoClient } from 'mongodb'

export default class MongodbDatabase {

    private db
    private client

    public async connectDB() {
        try {

            this.client = new MongoClient("mongodb://max:MAXMAX@13.212.122.82:27017/")
            await this.client.connect()
            this.db = await this.client.db('crossGame')

        } catch (error) {
            console.error(`MongoDB connection error: ${error}`);
        }
    }

    public async listGame(){
        return await this.db.collection('listGame')
    }

    public async profileMetadata(){
        return await this.db.collection('profileMetadata')
    }
}

