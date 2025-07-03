import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectMongodb from "./config/db.js";
import { configDotenv } from "dotenv";
import connectRedis from "./config/redis.js";
import messageEventController from "./controller/messageEventController.js";

configDotenv();
//Express acts as requestHandler unless listener is added otherwise acts as server
const requestHandler = express();
const httpServer = http.createServer(requestHandler);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET","POST"],
  },
});




httpServer.listen(process.env.PORT, async () => {
  try {
   await Promise.all([connectMongodb(),connectRedis()])
          messageEventController(io);
    console.log("Server running on http://localhost:"+process.env.PORT);
  
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
});
