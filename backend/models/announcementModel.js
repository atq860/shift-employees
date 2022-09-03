import mongoose from "mongoose";

const announcementSchema = mongoose.Schema(
  {
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    managerTeam: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    announcement: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
