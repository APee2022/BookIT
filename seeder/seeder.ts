import Room from "../backend/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://atulprakash:mongoDB2023@cluster0.o5rbfwo.mongodb.net/bookit"
    );

    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("Rooms are added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
