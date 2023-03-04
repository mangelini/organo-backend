import express, { Application } from "express";
import cors from "cors";

import foodRouter from "./routes/food.router";
import invoiceRouter from "./routes/invoice.router";
import menuRouter from "./routes/menu.router";
import orderRouter from "./routes/order.router";
import orderItemRouter from "./routes/orderItem.router";
import userRouter from "./routes/user.router";

const app: Application = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://organo-frontend.vercel.app/"],
  })
);

app.use("/users", userRouter);
app.use("/foods", foodRouter);
app.use("/menus", menuRouter);
app.use("/orders", orderRouter);
app.use("/orderItems", orderItemRouter);
app.use("/invoices", invoiceRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
