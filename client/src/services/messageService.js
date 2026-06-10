import api from "./api";
export const getAll = () => api.get("/messages").then(r=>r.data.data);
export const getAdminAll = () => api.get("/messages/admin").then(r=>r.data.data);
export const getOne = (id) => api.get(`/messages/${id}`).then(r=>r.data.data);
export const createItem = (data) => api.post("/messages", data).then(r=>r.data.data);
export const updateItem = (id, data) => api.put(`/messages/${id}`, data).then(r=>r.data.data);
export const deleteItem = (id) => api.delete(`/messages/${id}`).then(r=>r.data);
