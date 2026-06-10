import api from "./api";
export const getAll = () => api.get("/skills").then(r=>r.data.data);
export const getAdminAll = () => api.get("/skills/admin").then(r=>r.data.data);
export const getOne = (id) => api.get(`/skills/${id}`).then(r=>r.data.data);
export const createItem = (data) => api.post("/skills", data).then(r=>r.data.data);
export const updateItem = (id, data) => api.put(`/skills/${id}`, data).then(r=>r.data.data);
export const deleteItem = (id) => api.delete(`/skills/${id}`).then(r=>r.data);
