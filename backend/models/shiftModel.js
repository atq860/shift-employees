import mongoose from "mongoose";

const shiftSchema = mongoose.Schema(
  {
    // Manager who is going to make Schedule
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // Employee who is going to work
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    monday: {
      type: String,
      required: true,
    },

    tuesday: {
      type: String,
      required: true,
    },

    wednesday: {
      type: String,
      required: true,
    },

    thursday: {
      type: String,
      required: true,
    },

    friday: {
      type: String,
      required: true,
    },

    saturday: {
      type: String,
      required: true,
    },

    sunday: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Shift = mongoose.model("shift", shiftSchema);

export default Shift;
