const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

const authRoute = require("../routes/authRoute")
const dashboardRoute = require("../routes/dashboardRoute")

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json());

// async function connectToMongo() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//     } catch (error) {
//         console.log(error)
//     }
// }

// connectToMongo().then(() => { console.log("Successfully connected to database") });

const PORT = process.env.PORT || 8080
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/"

console.log(dbUrl)


// Connect to Database
async function connectToMongo() {
    mongoose.set("strictQuery", false);
    try {
        await mongoose.connect(dbUrl);
        console.log("Successfully connected to MongoDB database");
        console.log("Connected to database:", mongoose.connection.name); // Logs the database name
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}


connectToMongo().catch(err => console.log("Some error"));

app.get("/", (req, res) => {
    res.send("Server listening on the get request")
})

app.use("/api/auth", authRoute);
app.use("/api/dashboard", dashboardRoute)

app.listen(PORT, (req, res) => {
    console.log(`Server started on PORT ${PORT}`);
})