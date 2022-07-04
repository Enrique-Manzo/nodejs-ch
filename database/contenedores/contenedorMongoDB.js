import mongoClient from "../MongoDB/mongo.js";

export default class ContenedorMongoDB {

    // CREATE

    async insertObject(database, collection, object) {
        try {
            await mongoClient.connect();
        
            const userDatabase = mongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
        
            await userCollection.insertOne(object)
        
        } catch(error) {
            console.log(error)
        } finally {
            await mongoClient.close();
        }
    }

    async insertManyObjects(database, collection, objectArray) {
        try {
            await mongoClient.connect();
        
            const userDatabase = mongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
        
            await userCollection.insertMany(objectArray)
        
        } catch(error) {
            console.log(error)
        } finally {
            await mongoClient.close();
        }
    }

    // READ

    async readAll(database, collection, update_id) {
        try {
            
            await mongoClient.connect();
            
            const userDatabase = mongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
            
            const collectionObjects = await userCollection.find().toArray();
        
            if (update_id) {
                for (let message of collectionObjects) {
                    message._id = message._id.toString()
                }
            }

            return collectionObjects
        
        } catch(error) {
            console.log(error)
        } finally {
            await mongoClient.close();
        }

    }

    async readById(database, collection, objectID) {
        try {
            await mongoClient.connect();
        
            const userDatabase = mongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
        
            const collectionObject = await userCollection.findOne({id: objectID});
        
            return collectionObject
        
        } catch(error) {
            console.log(error)
        } finally {
            await mongoClient.close();
        }
    }

    async findByUsername(database, collection, username) {
        try {
            await mongoClient.connect();

            const userDatabase = mongoClient.db(database);

            const userCollection = userDatabase.collection(collection);
        
            const user = await userCollection.findOne({username: username});

            if (user) {
                return user
            } else {
                return "No user found"
            }

        } catch(error) {
            console.log(error)
        } finally {
            await mongoClient.close();
        }
    }
    
    
    // UPDATE

    async updateOne(database, collection, query, newValues) {
        try {
            await mongoClient.connect();
        
            const userDatabase = mongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
        
            await userCollection.updateOne(query, newValues);
        
        } catch(error) {
            console.log(error)
        } finally {
            await mongoClient.close();
        }
    }

    // DELETE

    async deleteOne(database, collection, query) {
        try {

            await mongoClient.connect();
        
            const userDatabase = mongoClient.db(database);
        
            const userCollection = userDatabase.collection(collection);
        
            await userCollection.deleteOne(query, newValues);
    
        } catch(error) {
            console.log(error)
        } finally {
            await mongoClient.close();
        }

    }

}