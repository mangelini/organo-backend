import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const orderItems = await prisma.orderItem.findMany();

  return res.json(orderItems);
});

router.get("/:orderItem_id", async (req, res) => {
  const { orderItem_id } = req.params;
  const orderItem = await prisma.orderItem.findUnique({
    where: {
      id: Number(orderItem_id),
    },
  });

  return res.json(orderItem);
});

router.post("/", async (req, res) => {
  const { quantity, unitPrice, orderId, foodId } = req.body;
  const order = await prisma.orderItem.create({
    data: {
      quantity,
      unitPrice,
      order: { connect: { id: orderId } },
      food: { connect: { id: foodId } },
    },
  });

  return res.json(order);
});

// get all order items for an order
router.get("/orders/:order_id", async (req, res) => {
  const { order_id } = req.params;
  const orderItems = await prisma.orderItem.findMany({
    where: {
      orderId: Number(order_id),
    },
  });

  return res.json(orderItems);
});

export default router;
