import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const foods = await prisma.food.findMany();

  return res.json(foods);
});

router.get("/:food_id", async (req, res) => {
  const { food_id } = req.params;
  const food = await prisma.food.findUnique({
    where: {
      id: Number(food_id),
    },
  });

  return res.json(food);
});

router.post("/", async (req, res) => {
  const { name, price, foodImage, menuId } = req.body;
  const food = await prisma.food.create({
    data: {
      name,
      price,
      foodImage,
      menu: { connect: { id: menuId } },
    },
  });

  return res.json(food);
});

// fetch foods by menu id
router.get("/menus/:menu_id", async (req, res) => {
  const { menu_id } = req.params;
  const foods = await prisma.food.findMany({
    where: {
      menuId: Number(menu_id),
    },
  });

  res.json(foods);
});
export default router;
