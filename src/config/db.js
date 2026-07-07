import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Atlas Connected");
    } catch (error) {
        console.error("MongoDB connection failed");
        console.error(error.message);
        process.exit(1);
    }
}