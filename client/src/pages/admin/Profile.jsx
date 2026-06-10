import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
export default function Profile() {
  const [form, setForm] = useState({
    fullName: "",
    title: "",
    tagline: "",
    bio: "",
    email: "",
    location: "",
  });
  useEffect(() => {
    api
      .get("/profile")
      .then((r) => setForm({ ...form, ...r.data.data }))
      .catch(() => {});
  }, []);
  const save = async (e) => {
    e.preventDefault();
    try {
      await api.put("/profile", form);
      toast.success("Profile updated");
    } catch (err) {
      try {
        await api.post("/profile", form);
        toast.success("Profile created");
      } catch (e) {
        toast.error(e.response?.data?.message || "Save failed");
      }
    }
  };
  return <Form title="Profile" form={form} setForm={setForm} save={save} />;
}
function Form({ title, form, setForm, save }) {
  return (
    <form onSubmit={save} className="max-w-3xl grid gap-4">
      <h1 className="text-3xl font-black mb-4">{title}</h1>
      {["fullName", "title", "tagline", "email", "location"].map((f) => (
        <input
          key={f}
          className="input"
          placeholder={f}
          value={form[f] || ""}
          onChange={(e) => setForm({ ...form, [f]: e.target.value })}
        />
      ))}
      <textarea
        className="input min-h-48"
        placeholder="bio"
        value={form.bio || ""}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />
      <button className="btn btn-primary w-fit">Save</button>
    </form>
  );
}
