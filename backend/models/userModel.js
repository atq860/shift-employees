import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { userType } from "../constants/userType.js";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      default: 0,
    },

    jobPosition: {
      type: String,
      required: true,
      default: "Sample"
    },

    team: {
      type: String,
      required: true,
      default: "Sample"
    },

    type: {
      type: String,
      required: true,
      default: userType.USER, 
    },

    deleteRequest: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true, // create fields like creatAt, updateAt etc.
  }
);

// we can also compare name by using this.name
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // returns Promise so we need AWAIT
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
