import api from "./api";
export const getAll = () => api.get("/settings").then((r) => r.data.data);
export const getAdminAll = () =>
  api.get("/settings/admin").then((r) => r.data.data);
export const getOne = (id) =>
  api.get(`/settings/${id}`).then((r) => r.data.data);
export const createItem = (data) =>
  api.post("/settings", data).then((r) => r.data.data);
export const updateItem = (id, data) =>
  api.put(`/settings/${id}`, data).then((r) => r.data.data);
export const deleteItem = (id) =>
  api.delete(`/settings/${id}`).then((r) => r.data);
