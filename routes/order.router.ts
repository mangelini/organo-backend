import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const orders = await prisma.order.findMany();

  return res.json(orders);
});

router.get("/:order_id", async (req, res) => {
  const { order_id } = req.params;
  const order = await prisma.order.findUnique({
    where: {
      id: Number(order_id),
    },
  });

  return res.json(order);
});

router.post("/", async (req, res) => {
  const { userId } = req.body;
  const order = await prisma.order.create({
    data: {
      user: { connect: { id: userId } },
    },
  });

  return res.json(order);
});

// fetch orders for a user
// fetch orderItems for the order
// fetch food for the orderItem
// add food to the orderItem object
// add orderItems to the order object
router.get("/users/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(user_id) },
  });

  const orders = await prisma.order.findMany({
    where: { userId: user?.id },
  });

  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId: order.id },
      });

      const orderItemsWithFood = await Promise.all(
        orderItems.map(async (orderItem) => {
          const food = await prisma.food.findUnique({
            where: { id: orderItem.foodId },
          });

          return { ...orderItem, food };
        })
      );

      return { ...order, orderItems: orderItemsWithFood };
    })
  );

  res.json(ordersWithItems);
});

export default router;
