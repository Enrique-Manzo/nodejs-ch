import getFirestoreApp from "../firebase/firebaseConfig.js";
import { getFirestore, getDoc, doc } from "firebase/firestore/lite";

const asObj = (doc)=>({id: doc.id, ...doc.data()})

export default class contenedorFirebase {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    // CREATE

    async createDoc(newDocument) {
        const db = getFirestoreApp();
        const query = db.collection(this.collectionName)
        try {
            const doc = query.doc();
            await doc.create(newDocument)
        } catch (error) {
            console.log(error)
        }
    }

    // READ

    async readById(documentID) {
        const db = getFirestoreApp();

        const queryDoc = await db.collection(this.collectionName).doc(documentID).get();

        return asObj(queryDoc);
    }

    async readAll() {
        const db = getFirestoreApp();

        const queryDoc = await db.collection(this.collectionName).get();

        return asObj(queryDoc);
    }

    // UPDATE

    async updateDoc(documentID, newData) {
        try {
            const db = getFirestoreApp();
            const query = db.collection(this.collectionName);
            const doc = query.doc(documentID);
            await doc.update(newData);
        } catch(error) {
            console.log(error)
        }
    }

    // DELETE

    async deleteDoc(documentID) {
        try {
            const db = getFirestoreApp();
            const query = db.collection(this.collectionName);
            const doc = query.doc(documentID);
            await doc.delete();
        } catch (error) {
            console.log(error)
        }
    }

}


