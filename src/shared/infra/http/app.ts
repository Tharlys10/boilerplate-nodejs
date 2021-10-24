import "dotenv/config";
import express from "express";
import cors from "cors";

import createConnection from "@shared/infra/typeorm";

createConnection();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", (req, res) => {
  return res.json("Server is running")
})

export { app };