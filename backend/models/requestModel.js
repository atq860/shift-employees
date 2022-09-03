import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    isAccepted: {
      type: Boolean,
      default: false,
    },

    acceptedAt: {
      type: Date,
    },
  },

  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
