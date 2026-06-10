import api from "./api";
export const getAll = () => api.get("/experiences").then(r=>r.data.data);
export const getAdminAll = () => api.get("/experiences/admin").then(r=>r.data.data);
export const getOne = (id) => api.get(`/experiences/${id}`).then(r=>r.data.data);
export const createItem = (data) => api.post("/experiences", data).then(r=>r.data.data);
export const updateItem = (id, data) => api.put(`/experiences/${id}`, data).then(r=>r.data.data);
export const deleteItem = (id) => api.delete(`/experiences/${id}`).then(r=>r.data);
