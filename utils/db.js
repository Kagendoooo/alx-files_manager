import { MongoClient } from 'mongodb';

// Class for DBClient
class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;
    
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbName = database;
    this.isConnected = false;

    // Connection to MongoDB and handling of connection errors
    this.client.connect()
      .then(() => {
        console.log('Connected to MongoDB');
        this.isConnected = true;
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error.message);
        this.isConnected = false;
      });
  }

  //Checks if the MongoDB client connection
  isAlive() {
    return this.isConnected;
  }

  //Gets the number of documents in the users
  async nbUsers() {
    try {
      const db = this.client.db(this.dbName);
      const collection = db.collection('users');
      return await collection.countDocuments();
    } catch (error) {
      console.error('Error counting users:', error.message);
      throw error;
    }
  }

  //Gets the number of documents in files
  async nbFiles() {
    try {
      const db = this.client.db(this.dbName);
      const collection = db.collection('files');
      return await collection.countDocuments();
    } catch (error) {
      console.error('Error counting files:', error.message);
      throw error;
    }
  }
}

// Create & export instance of DBClient
const dbClient = new DBClient();
export default dbClient;
