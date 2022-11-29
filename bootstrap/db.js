import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

export const connectToDB = async () => {

    return  new Promise(async (resolve, reject) => {
        try {
            
            const client = await MongoClient.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

            const db = client.db(process.env.DB_NAME);

            resolve(db)
        } catch (error) {
            reject(error)
        }      
    });
}
