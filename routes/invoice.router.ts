import express from "express";
import prisma from "../helpers/prismaHelper";

const router = express.Router();

router.get("/", async (req, res) => {
  const invoices = await prisma.invoice.findMany();

  res.json(invoices);
});

router.get("/:invoice_id", async (req, res) => {
  const { invoice_id } = req.params;
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: Number(invoice_id),
    },
  });

  res.json(invoice);
});

router.post("/", async (req, res) => {
  const { paymentMethod, paymentStatus, orderId } = req.body;

  const invoice = await prisma.invoice.create({
    data: {
      paymentMethod,
      paymentStatus,
      order: { connect: { id: orderId } },
    },
  });

  res.json(invoice);
});

// update invoice
router.put("/:invoice_id", async (req, res) => {
  const { invoice_id } = req.params;
  const { paymentMethod, paymentStatus, orderId } = req.body;

  const invoice = await prisma.invoice.update({
    where: {
      id: Number(invoice_id),
    },
    data: {
      paymentMethod,
      paymentStatus,
      order: { connect: { id: orderId } },
    },
  });

  res.json(invoice);
});

export default router;
