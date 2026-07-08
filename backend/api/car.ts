import express from "express";
import { prisma } from "../prisma";

export const carRouter = express.Router();

// GET cars
carRouter.get("/", async (req, res) => {
  const cars = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(cars);
});

// GET car by id
carRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const car = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  res.json(car);
});

carRouter.post("/", async (req, res) => {
  const { licensePlate, brand, model, note } = req.body;

  const vehicle = await prisma.vehicle.create({
    data: {
      licensePlate,
      brand,
      model,
      note: note ?? "",
    },
  });

  res.status(201).json(vehicle);
});

// UPDATE car
carRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, brand, price } = req.body;

  const car = await prisma.vehicle.update({
    where: { id },
    data: {
      name,
      brand,
      price: Number(price),
    },
  });

  res.json(car);
});

// DELETE car
carRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.vehicle.delete({
    where: { id },
  });

  res.json({ message: "Delete car success" });
});
