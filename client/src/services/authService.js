import api from "./api";
export const getAll = () => api.get("/auth").then(r=>r.data.data);
export const getAdminAll = () => api.get("/auth/admin").then(r=>r.data.data);
export const getOne = (id) => api.get(`/auth/${id}`).then(r=>r.data.data);
export const createItem = (data) => api.post("/auth", data).then(r=>r.data.data);
export const updateItem = (id, data) => api.put(`/auth/${id}`, data).then(r=>r.data.data);
export const deleteItem = (id) => api.delete(`/auth/${id}`).then(r=>r.data);
