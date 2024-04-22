import express from "express";
import CONFIG from "./config/config.js";
import connectToDb from "./database/connection.js";
import userRoute from "./routes/users.route.js";
import postRoute from "./routes/posts.route.js";
import data from "./res.data.js";

const app = express();
const PORT = CONFIG.PORT || 3000;

// Connect to Mongodb Database
connectToDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", userRoute);
app.use("/api/posts", postRoute);

// Handle the base route
app.get("", (req, res) => {
  res.status(404);
  res.json(data);
});

// catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "PAGE NOT FOUND",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://${CONFIG.LOCAL_HOST}:${CONFIG.PORT}/`);
});
