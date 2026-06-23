import mongoose from "mongoose";

class Database {
  private static instance: Database;
  private connection: typeof mongoose | null = null;
  private connectionPromise: Promise<typeof mongoose> | null = null;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect(): Promise<typeof mongoose> {
    if (this.connection) {
      return this.connection;
    }

    if (!this.connectionPromise) {
      const uri = process.env.MONGO_URI as string;
      const dbName = process.env.MONGO_DB_NAME || "rbeerv3";

      if (!uri) {
        throw new Error(
          "Please define the MONGO_URI environment variable inside .env.local",
        );
      }

      this.connectionPromise = mongoose
        .connect(uri, { dbName })
        .then((conn) => {
          this.connection = conn;
          return conn;
        })
        .catch((err) => {
          this.connectionPromise = null;
          throw err;
        });
    }

    return this.connectionPromise;
  }
}

const db = Database.getInstance();

export const connectDB = () => db.connect();

export default db;
