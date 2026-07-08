import express from "express";
import { carRouter } from "./api/car";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/cars", carRouter);
