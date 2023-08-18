import express from "express";
import prisma from "../helpers/prismaHelper";

const router = express.Router();

router.get("/", async (req, res) => {
  const menus = await prisma.menu.findMany();

  res.json(menus);
});

router.get("/:menu_id", async (req, res) => {
  const { menu_id } = req.params;
  const menu = await prisma.menu.findUnique({
    where: {
      id: Number(menu_id),
    },
  });

  res.json(menu);
});

router.post("/", async (req, res) => {
  const { name, category } = req.body;

  const menu = await prisma.menu.create({
    data: {
      name,
      category,
    },
  });

  res.json(menu);
});

export default router;
