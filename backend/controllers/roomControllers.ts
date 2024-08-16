import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";

// Get All Rooms => /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 8;

  const { searchParams } = new URL(req.url);

  const queryStr: any = {};

  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  const apiFilters = new APIFilters(Room, queryStr).search();
  let rooms: IRoom[] = await apiFilters.query;
  // const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  });
});

// Create new room  =>  /api/admin/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  // body.user = req.user._id;

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

// Get room details  =>  /api/rooms/:id
export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id).populate("reviews.user");

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Update room details  =>  /api/admin/rooms/:id
export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Delete room details  =>  /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    // Delete images associated with the room

    await room.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);
