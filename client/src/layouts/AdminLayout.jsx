import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const links = [
  ["/admin/dashboard", "Dashboard"],
  ["/admin/profile", "Profile"],
  ["/admin/projects", "Projects"],
  ["/admin/skills", "Skills"],
  ["/admin/experience", "Experience"],
  ["/admin/education", "Education"],
  ["/admin/messages", "Messages"],
  ["/admin/settings", "Settings"],
];
export default function AdminLayout() {
  const { logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-dark flex">
      <aside className="w-64 border-r border-white/10 p-5 hidden md:block">
        <h2 className="font-black text-xl gradient-text mb-8">Admin CMS</h2>
        <div className="space-y-2">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 ${isActive ? "bg-primary/20 text-primary" : "text-slate-300 hover:bg-white/5"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <button
          onClick={async () => {
            await logout();
            nav("/admin/login");
          }}
          className="mt-8 btn btn-ghost w-full"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-5 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
