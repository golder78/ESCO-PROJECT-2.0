import api from "./api";

export const placeOrder = async (orderData) => {
  const token = localStorage.getItem("token");
  const res = await api.post("/orders", orderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getOrders = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/orders", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
