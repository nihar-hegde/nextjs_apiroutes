import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Connected to MongoDB");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting to MongoDB...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "NextRestApi",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("Error connecting to MongoDB", error);
    throw new Error("Error connecting to MongoDB", error);
  }
};

export default connect;
