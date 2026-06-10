import api from "./api";
export const getAll = () => api.get("/educations").then((r) => r.data.data);
export const getAdminAll = () =>
  api.get("/educations/admin").then((r) => r.data.data);
export const getOne = (id) =>
  api.get(`/educations/${id}`).then((r) => r.data.data);
export const createItem = (data) =>
  api.post("/educations", data).then((r) => r.data.data);
export const updateItem = (id, data) =>
  api.put(`/educations/${id}`, data).then((r) => r.data.data);
export const deleteItem = (id) =>
  api.delete(`/educations/${id}`).then((r) => r.data);
