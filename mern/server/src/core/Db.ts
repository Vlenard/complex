/// <reference types="node" />

import mongoose from "mongoose";

const Db = async (): Promise<void> => {

    const URI = process.env.MONGO_URI as string;
    const DB_NAME = process.env.MONGO_DB_NAME || "rbeerv3";

    try {
        await mongoose.connect(URI, { dbName: DB_NAME });
    } catch (error) {
        throw error;
    }
};

export default Db;
