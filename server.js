require("dotenv").config();
require("express-async-errors");

const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();

// MongoDB connection
const connectDB = require("./DB/connect");
// Routers
const authRouter = require("./routes/auth");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

// Error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const ServerOptions = {
  key: fs.readFileSync("cert.key"),
  cert: fs.readFileSync("cert.crt"),
};
const server = https.createServer(ServerOptions, app);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, "0.0.0.0", () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
