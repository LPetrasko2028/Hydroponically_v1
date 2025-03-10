import nano from 'nano';

const couchdbUrl = process.env.COUCHDB_URL;
const couchdbUser = process.env.COUCHDB_USER;
const couchdbPassword = process.env.COUCHDB_PASSWORD;

const nanoDb = nano(couchdbUrl);
const db = nanoDb.use('hydroponically');

// Create a new task
async function createTask(task) {
  const newTask = await db.insert(task);
  return newTask;
}