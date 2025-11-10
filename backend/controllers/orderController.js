import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Place order — only for logged-in users
export const placeOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, please log in" });
    }

    const { total } = req.body;

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        total,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// ✅ Get orders — user sees their orders, admin sees all
export const getOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, please log in" });
    }

    let orders;

    if (req.user.role === "admin") {
      // Admin can see all orders
      orders = await prisma.order.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
    } else {
      // Regular user only sees their own orders
      orders = await prisma.order.findMany({
        where: { userId: req.user.id },
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
    }

    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
