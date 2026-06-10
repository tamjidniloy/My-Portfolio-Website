import api from "./api";
export const getAll = () => api.get("/profile").then(r=>r.data.data);
export const getAdminAll = () => api.get("/profile/admin").then(r=>r.data.data);
export const getOne = (id) => api.get(`/profile/${id}`).then(r=>r.data.data);
export const createItem = (data) => api.post("/profile", data).then(r=>r.data.data);
export const updateItem = (id, data) => api.put(`/profile/${id}`, data).then(r=>r.data.data);
export const deleteItem = (id) => api.delete(`/profile/${id}`).then(r=>r.data);
