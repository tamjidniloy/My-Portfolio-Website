import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/public/Home";
import NotFound from "./pages/public/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/admin/Profile";
import Projects from "./pages/admin/Projects";
import Skills from "./pages/admin/Skills";
import Experience from "./pages/admin/Experience";
import Education from "./pages/admin/Education";
import Messages from "./pages/admin/Messages";
import Settings from "./pages/admin/Settings";
export default function App(){ return <AuthProvider><Routes><Route element={<PublicLayout/>}><Route path="/" element={<Home/>}/><Route path="*" element={<NotFound/>}/></Route><Route path="/admin/login" element={<Login/>}/><Route path="/admin" element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}><Route index element={<Navigate to="dashboard"/>}/><Route path="dashboard" element={<Dashboard/>}/><Route path="profile" element={<Profile/>}/><Route path="projects" element={<Projects/>}/><Route path="skills" element={<Skills/>}/><Route path="experience" element={<Experience/>}/><Route path="education" element={<Education/>}/><Route path="messages" element={<Messages/>}/><Route path="settings" element={<Settings/>}/></Route></Routes></AuthProvider> }
