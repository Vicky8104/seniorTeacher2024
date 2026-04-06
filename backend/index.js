
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS FIX (production ready)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://demo-project-livid-chi.vercel.app"
    ],
    credentials: true,
  })
);

// ✅ JSON middleware
app.use(express.json());

// ✅ STATIC PDF SERVE (IMPORTANT)
app.use("/pdfs", express.static("pdfs"));

// ✅ ROUTES
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// ✅ DB CONNECT
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log(err));

// ✅ TEST ROUTE (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ✅ SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
