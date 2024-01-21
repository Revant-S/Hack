const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const authRouters = require("./Routes/authRoutes")
const PollRoutes = require("./Routes/PollingRoutes")
const mongoose = require("mongoose")
const requireAuth = require("./MiddleWares/authMiddleware")

async function serverTurnON() {    
    await mongoose.connect("mongodb+srv://mathworldof71:svds0jaE11UsMGUi@cluster0.h1ttlcq.mongodb.net/HackDb");
    app.listen(3000,()=>{  console.log("Server is activated")})
}
serverTurnON()
console.log("hi");

const app = express();
app.use(express.json())
app.use(authRouters)
app.use("/IssuePollCreation",PollRoutes)