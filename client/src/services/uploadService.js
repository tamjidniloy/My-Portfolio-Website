import api from "./api";
export const uploadFile = async (file, folder = "portfolio") => {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);
  const res = await api.post("/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};
