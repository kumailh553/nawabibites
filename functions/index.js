const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("Firebase Functions Working!");
});

// Instamojo Checkout Example API (you will update later)
app.post("/create-order", async (req, res) => {
  return res.json({ success: true, message: "Order API ready" });
});

exports.api = functions.https.onRequest(app);
