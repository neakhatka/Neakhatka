import mongoose from "mongoose";

async function connectMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://neakhatka:Y54vroRJDmgoLRk3@auth-service.lcga9wy.mongodb.net/auth-service?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB successfully!");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

export { connectMongoDB };
