import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(user_id) },
  });
  res.json(user);
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // check if user already exists
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  // if user exists, return error
  if (userExists) {
    res.status(400).json({ error: "User already exists" });
  }

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // if user does not exist, return error
  if (!user) {
    res.status(400).json({ error: "User does not exist" });
  }

  // check if password is correct
  if (user?.password !== password) {
    res.status(400).json({ error: "Password is incorrect" });
  }

  res.json(user);
});

// update user
router.put("/:user_id", async (req, res) => {
  const { id } = req.body;
  const { firstName, lastName, email, password } = req.body;
  const user = await prisma.user.update({
    where: { id },
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
  res.json(user);
});

export default router;
