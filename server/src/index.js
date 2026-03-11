import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { replyRouter } from "./routes/reply.js";
import { historyRouter } from "./routes/history.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.use("/api/reply", replyRouter);
app.use("/api/history", historyRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "FreelancerReply AI Backend Running" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});