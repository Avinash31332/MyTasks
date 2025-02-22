import { openDB } from "idb";

const DB_NAME = "MyTasksDB";
const STORE_NAME = "tasks";

// Initialize the database
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

// Function to add or update a task
export const saveTask = async (task) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.put(task);
  await tx.done;
};

// Function to retrieve all tasks
export const getTasks = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

// Function to delete a task
export const deleteTask = async (id) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.delete(id);
  await tx.done;
};
