import express from "express";
import { prisma } from "../prisma";

export const carRouter = express.Router();

function getVehicleInput(body: Record<string, unknown>) {
  const licensePlate =
    typeof body.licensePlate === "string" ? body.licensePlate.trim() : "";
  const brand = typeof body.brand === "string" ? body.brand.trim() : "";
  const model = typeof body.model === "string" ? body.model.trim() : "";
  const note = typeof body.note === "string" ? body.note.trim() : "";

  return { licensePlate, brand, model, note };
}

function isPrismaErrorCode(err: unknown, code: string) {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    err.code === code
  );
}

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
    return res.status(404).json({ message: "ไม่พบข้อมูลรถ" });
  }

  res.json(car);
});

carRouter.post("/", async (req, res) => {
  const { licensePlate, brand, model, note } = getVehicleInput(req.body);

  if (!licensePlate || !brand || !model) {
    return res.status(400).json({
      message: "กรุณากรอกทะเบียนรถ ยี่ห้อ และรุ่นให้ครบ",
    });
  }

  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        licensePlate,
        brand,
        model,
        note,
      },
    });

    res.status(201).json(vehicle);
  } catch (err) {
    if (isPrismaErrorCode(err, "P2002")) {
      return res.status(409).json({
        message: "ทะเบียนรถนี้มีอยู่แล้ว",
      });
    }

    console.error(err);
    res.status(500).json({
      message: "บันทึกข้อมูลไม่สำเร็จ กรุณาตรวจสอบฐานข้อมูล",
    });
  }
});

// UPDATE car
carRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { licensePlate, brand, model, note } = getVehicleInput(req.body);

  if (!licensePlate || !brand || !model) {
    return res.status(400).json({
      message: "กรุณากรอกทะเบียนรถ ยี่ห้อ และรุ่นให้ครบ",
    });
  }

  try {
    const car = await prisma.vehicle.update({
      where: { id },
      data: {
        licensePlate,
        brand,
        model,
        note,
      },
    });

    res.json(car);
  } catch (err) {
    if (isPrismaErrorCode(err, "P2002")) {
      return res.status(409).json({
        message: "ทะเบียนรถนี้มีอยู่แล้ว",
      });
    }

    if (isPrismaErrorCode(err, "P2025")) {
      return res.status(404).json({
        message: "ไม่พบข้อมูลรถที่ต้องการแก้ไข",
      });
    }

    console.error(err);
    res.status(500).json({
      message: "แก้ไขข้อมูลไม่สำเร็จ กรุณาตรวจสอบฐานข้อมูล",
    });
  }
});

// DELETE car
carRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.vehicle.delete({
      where: { id },
    });

    res.json({ message: "Delete car success" });
  } catch (err) {
    if (isPrismaErrorCode(err, "P2025")) {
      return res.status(404).json({
        message: "ไม่พบข้อมูลรถที่ต้องการลบ",
      });
    }

    console.error(err);
    res.status(500).json({
      message: "ลบข้อมูลไม่สำเร็จ กรุณาตรวจสอบฐานข้อมูล",
    });
  }
});
