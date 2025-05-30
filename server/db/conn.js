import mongoose from "mongoose";

export const dbConnect = () => {
    const localURL = process.env.LocalMongoURL;
    const atlasURL = process.env.MONGO_URL;
    mongoose.connect(localURL)
        .then(() => {
            console.log("database successfully connected");
        }).catch((err) => {
            console.log(`${err} did not connect`);
        })
};