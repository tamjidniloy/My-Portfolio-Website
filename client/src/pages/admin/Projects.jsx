import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
export default function Projects() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    description: "",
    techStack: [],
    category: "Web Application",
  });
  const [editing, setEditing] = useState(null);
  const load = () =>
    api.get("/projects/admin").then((r) => setItems(r.data.data));
  useEffect(() => {
    load();
  }, []);
  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.put(`${"/projects"}/${editing}`, form);
      else await api.post("/projects", form);
      toast.success("Saved");
      setForm({
        title: "",
        shortDescription: "",
        description: "",
        techStack: [],
        category: "Web Application",
      });
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };
  const edit = (x) => {
    setEditing(x._id);
    setForm({
      ...{
        title: "",
        shortDescription: "",
        description: "",
        techStack: [],
        category: "Web Application",
      },
      ...x,
    });
  };
  const del = async (id) => {
    if (!confirm("Delete this item?")) return;
    await api.delete(`${"/projects"}/${id}`);
    load();
  };
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">Projects</h1>
      <form onSubmit={save} className="glass rounded-3xl p-5 grid gap-4 mb-8">
        <input
          className="input"
          placeholder="title"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="input"
          placeholder="shortDescription"
          value={form.shortDescription || ""}
          onChange={(e) =>
            setForm({ ...form, shortDescription: e.target.value })
          }
        />
        <input
          className="input"
          placeholder="description"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="input"
          placeholder="category"
          value={form.category || ""}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          className="input"
          placeholder="liveUrl"
          value={form.liveUrl || ""}
          onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
        />
        <input
          className="input"
          placeholder="githubUrl"
          value={form.githubUrl || ""}
          onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
        />
        <button className="btn btn-primary w-fit">
          {editing ? "Update" : "Create"}
        </button>
      </form>
      <div className="grid gap-3">
        {items.map((x) => (
          <div
            key={x._id}
            className="glass rounded-2xl p-4 flex justify-between gap-4"
          >
            <div>
              <p className="font-bold">
                {x.title || x.name || x.company || x.institution}
              </p>
              <p className="text-slate-400 text-sm">
                {x.category || x.position || x.degree || x.shortDescription}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => edit(x)} className="btn btn-ghost">
                Edit
              </button>
              <button onClick={() => del(x._id)} className="btn btn-ghost">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
