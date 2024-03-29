import express from 'express';
import CONFIG from "./config/config.js";
import connectToDb from "./database/connection.js";



const app = express();
const PORT = CONFIG.PORT || 3000;

// Connect to Mongodb Database
connectToDb()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(
        `Server running at http://${CONFIG.LOCAL_HOST}:${CONFIG.PORT}/`
      );
});
