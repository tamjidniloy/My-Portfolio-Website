import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user,setUser]=useState(null); const [loading,setLoading]=useState(true);
  const login=async(email,password)=>{ const res=await api.post("/auth/login",{email,password}); localStorage.setItem("token",res.data.data.token); setUser(res.data.data.user); return res.data.data.user; };
  const logout=async()=>{ try{ await api.post("/auth/logout"); }catch{} localStorage.removeItem("token"); setUser(null); };
  useEffect(()=>{ const token=localStorage.getItem("token"); if(!token){setLoading(false); return;} api.get("/auth/me").then(r=>setUser(r.data.data)).catch(()=>localStorage.removeItem("token")).finally(()=>setLoading(false)); },[]);
  return <AuthContext.Provider value={{user,loading,login,logout,isAuthenticated:!!user}}>{children}</AuthContext.Provider>;
};
export const useAuth=()=>useContext(AuthContext);
