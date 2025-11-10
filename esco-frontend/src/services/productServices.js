import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const addProduct = async (product) => {
  const token = localStorage.getItem("token");
  const res = await api.post("/products", product, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateProduct = async (id, product) => {
  const token = localStorage.getItem("token");
  const res = await api.put(`/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
