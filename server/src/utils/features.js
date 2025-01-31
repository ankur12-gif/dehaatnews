import mongoose from "mongoose";

const connectToMongoDB = (mongoUri) => {
    mongoose
        .connect(mongoUri, { dbName: "NewsDB" })
        .then((data) => {
            console.log(`Connected to db ${data.connection.host}`);
        })
        .catch((err) => {
            throw err;
        });
};



export { connectToMongoDB }