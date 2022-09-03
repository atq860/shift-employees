import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import shiftRoutes from "./routes/shiftRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";

dotenv.config();
connectDB();

const app = express();

// We are only running it in Development but not in Production
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// we need for req.body for parse, allow us to accept json data in the body
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/announcements", announcementRoutes);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5008;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
);
