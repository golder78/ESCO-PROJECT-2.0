import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getStats = async (req, res) => {
  const users = await prisma.user.count();
  const orders = await prisma.order.count();
  const products = await prisma.product.count();
  res.json({ users, orders, products });
};
