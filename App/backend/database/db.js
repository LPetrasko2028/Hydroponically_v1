import nano from 'nano';
import dotenv from 'dotenv';

dotenv.config();

const couchdb = nano({
    url: process.env.COUCHDB_URL,
    requestDefaults: {
        jar: true,
    },
});

const createDBObject = (dbName) => {
	return couchdb.db.use(dbName);
}

await couchdb.auth(process.env.COUCHDB_USER, process.env.COUCHDB_PASSWORD);

export default createDBObject;

// --- TESTING ---
// Create database
// await db.create('test');
// // Create document
// await db.insert('test', { test: 'test' });
// // Get document
// const doc = await db.get('test');
// console.log(doc);
// // Update document
// await db.insert('test', { test: 'test2' });
// // Get document
// const doc2 = await db.get('test');
// console.log(doc2);
// // Delete document
// await db.destroy('test');