import MongoClient from "../MongoDB/mongo";

class ContenedorMongoDB {

    // CREATE

    async insertObject(database, collection, object) {
        try {
            await MongoClient.connect();
        
            const userDatabase = MongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
        
            await userCollection.insertOne(object)
        
        } catch(error) {
            console.log(error)
        } finally {
            await MongoClient.close();
        }
    }

    // READ

    async readAll(database, collection) {
        try {
            await MongoClient.connect();
        
            const userDatabase = MongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
        
            const collectionObjects = await userCollection.find().toArray();
        
            return collectionObjects
        
        } catch(error) {
            console.log(error)
        } finally {
            await MongoClient.close();
        }

    }

    async readById(database, collection, objectID) {
        try {
            await MongoClient.connect();
        
            const userDatabase = MongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
        
            const collectionObject = await userCollection.findOne({id: objectID});
        
            return collectionObject
        
        } catch(error) {
            console.log(error)
        } finally {
            await MongoClient.close();
        }
    }
    
    // UPDATE

    async updateOne(database, collection, query, newValues) {
        try {
            await MongoClient.connect();
        
            const userDatabase = MongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
        
            await userCollection.updateOne(query, newValues);
        
        } catch(error) {
            console.log(error)
        } finally {
            await MongoClient.close();
        }
    }

    // DELETE

    async deleteOne(database, collection, query) {
        try {

            await MongoClient.connect();
        
            const userDatabase = MongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
        
            await userCollection.deleteOne(query, newValues);
    
        } catch(error) {
            console.log(error)
        } finally {
            await MongoClient.close();
        }

    }

}