
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { useAuthStore } from "@/stores/authStore";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] overflow-x-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`min-h-screen transition-all duration-200 overflow-hidden ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="p-4 md:p-6">
          <header className="mb-6 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Utilisateur: {user}</p>
              <h1 className="text-xl lg:text-2xl font-semibold">Terminal de contrôle principal</h1>
            </div>
          </header>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
