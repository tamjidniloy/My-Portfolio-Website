import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";
const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};
export default function Home() {
  const [data, setData] = useState({
    profile: null,
    projects: [],
    skills: [],
    experiences: [],
    educations: [],
  });
  useEffect(() => {
    Promise.all([
      api.get("/profile").catch(() => ({ data: { data: null } })),
      api.get("/projects"),
      api.get("/skills"),
      api.get("/experiences"),
      api.get("/educations"),
    ]).then(([p, pr, s, e, ed]) =>
      setData({
        profile: p.data.data,
        projects: pr.data.data,
        skills: s.data.data,
        experiences: e.data.data,
        educations: ed.data.data,
      }),
    );
  }, []);
  const p = data.profile;
  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div {...fade}>
          <p className="text-primary font-bold mb-3">
            Modern SaaS Developer Portfolio
          </p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            Hi, I’m{" "}
            <span className="gradient-text">
              {p?.fullName || "Tamjid Niloy"}
            </span>
          </h1>
          <h2 className="mt-4 text-2xl text-slate-200">
            {p?.title || "AI-Enabled Full Stack Developer"}
          </h2>
          <p className="mt-5 text-slate-300 text-lg leading-8">
            {p?.tagline ||
              "Building scalable web applications and AI-powered digital solutions."}
          </p>
          <div className="mt-8 flex gap-4">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn btn-ghost" href="#contact">
              Contact Me
            </a>
          </div>
        </motion.div>
        <motion.div {...fade} className="glass rounded-[2rem] p-8">
          <div className="aspect-square rounded-[1.5rem] bg-gradient-to-br from-primary/30 to-accent/30 grid place-items-center text-8xl font-black">
            TN
          </div>
        </motion.div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14" id="about">
        <motion.div {...fade} className="glass rounded-3xl p-8">
          <h2 className="text-3xl font-black mb-4">About Me</h2>
          <p className="text-slate-300 leading-8">{p?.bio}</p>
        </motion.div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14" id="skills">
        <motion.h2 {...fade} className="text-3xl font-black mb-8">
          Skills
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.skills.map((x) => (
            <motion.div {...fade} key={x._id} className="glass rounded-2xl p-5">
              <p className="font-bold">{x.name}</p>
              <p className="text-sm text-slate-400 capitalize">
                {x.category} · {x.level}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14" id="projects">
        <motion.h2 {...fade} className="text-3xl font-black mb-8">
          Featured Projects
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project) => (
            <motion.article
              {...fade}
              key={project._id}
              className="glass rounded-3xl overflow-hidden"
            >
              <div className="h-44 bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center text-slate-400">
                Project Image
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black">{project.title}</h3>
                <p className="mt-3 text-slate-300">
                  {project.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full bg-white/10 px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14" id="contact">
        <motion.div {...fade} className="glass rounded-3xl p-8">
          <h2 className="text-3xl font-black mb-3">Contact</h2>
          <ContactForm />
        </motion.div>
      </section>
    </div>
  );
}
function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    await api.post("/messages", form);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };
  return (
    <form onSubmit={submit} className="grid gap-4 max-w-2xl">
      <input
        className="input"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="input"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="input"
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <textarea
        className="input min-h-32"
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button className="btn btn-primary w-fit">Send Message</button>
      {sent && <p className="text-primary">Message sent successfully.</p>}
    </form>
  );
}
