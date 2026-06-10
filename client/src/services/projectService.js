import api from "./api";
export const getAll = () => api.get("/projects").then(r=>r.data.data);
export const getAdminAll = () => api.get("/projects/admin").then(r=>r.data.data);
export const getOne = (id) => api.get(`/projects/${id}`).then(r=>r.data.data);
export const createItem = (data) => api.post("/projects", data).then(r=>r.data.data);
export const updateItem = (id, data) => api.put(`/projects/${id}`, data).then(r=>r.data.data);
export const deleteItem = (id) => api.delete(`/projects/${id}`).then(r=>r.data);
