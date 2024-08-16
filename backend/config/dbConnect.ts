import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  let DB_URI: string = "";

  if (process.env.NODE_ENV === "development")
    DB_URI = process.env.DB_LOCAL_URI!;
  if (process.env.NODE_ENV === "production") DB_URI = process.env.DB_URI!;

  await mongoose
    .connect(DB_URI)
    .then((con) => console.log("DB Connected"))
    .catch((err) => console.log(err));
};

export default dbConnect;

/**
Connection readyState property has these values

0 = disconnected
1 = connected
2 = connecting
3 = disconnecting
99 = uninitialized 
*/
