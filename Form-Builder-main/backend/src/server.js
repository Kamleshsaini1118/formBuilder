const express = require("express");
const mongoose = require("mongoose");
const formRoute = require("./routes/formRoute")
const responseRoute = require("./routes/responseRoute")
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
const corsOptions = {
  origin: [
    'https://form-builder-vdom.vercel.app',
    'https://form-builder-vdom.vercel.app/',
    'http://localhost:5173',
    'http://localhost:5000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS with options
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));


app.use(express.json());

// connect to mongoDB
mongoose.connect('mongodb+srv://form:QhEkNLCkewZ1lK0Z@cluster1.b2ik1.mongodb.net/form')
.then(() => {
    console.log('Connected to DB');
}).catch(err => console.error("MongoDB connection error:", err));


// routes
app.use("/api/forms", formRoute); // yeh form-route
app.use("/api/response", responseRoute); // yeh response-route

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
