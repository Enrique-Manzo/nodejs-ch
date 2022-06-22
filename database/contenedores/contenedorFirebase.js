import getFirestoreApp from "../firebase/firebaseConfig.js";
import { getFirestore, getDoc, doc } from "firebase/firestore/lite";

const asObj = (doc)=>({id: doc.id, ...doc.data()})

class contenedorFirebase {
    
    // CREATE

    async createDoc(collectionName, newDocument) {
        const db = getFirestoreApp();
        const query = db.collection(collectionName)
        try {
            const doc = query.doc();
            await doc.create(newDocument)
        } catch (error) {
            console.log(error)
        }
    }

    // READ

    async readById(collectionName, documentID) {
        const db = getFirestoreApp();

        const queryDoc = await db.collection(collectionName).doc(documentID).get();

        return asObj(queryDoc);
    }

    // UPDATE

    async updateDoc(collectionName, documentID, newData) {
        try {
            const db = getFirestoreApp();
            const query = db.collection(collectionName);
            const doc = query.doc(documentID);
            await doc.update(newData);
        } catch(error) {
            console.log(error)
        }
    }

    // DELETE

    async deleteDoc(collectionName, documentID) {
        try {
            const db = getFirestoreApp();
            const query = db.collection(collectionName);
            const doc = query.doc(documentID);
            await doc.delete();
        } catch (error) {
            console.log(error)
        }
    }




}


