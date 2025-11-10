import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import path from "path";

// 🟢 Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// 🟢 Get a single product
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// 🔵 Create a product (Admin only)
export const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newProduct = await prisma.product.create({
      data: { name, description, price: parseFloat(price), image },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

// 🟠 Update a product (Admin only)
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        ...(image && { image }),
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// 🔴 Delete a product (Admin only)
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
