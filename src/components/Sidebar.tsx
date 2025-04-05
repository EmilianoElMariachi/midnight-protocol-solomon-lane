
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, File, User, Settings, Menu, Clock, Bomb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { name: "Intelligence Reports", icon: <File className="mr-2 h-4 w-4" />, path: "/dashboard/reports" },
    { name: "Personnel Database", icon: <User className="mr-2 h-4 w-4" />, path: "/dashboard/personnel" },
    { name: "Security Protocols", icon: <Shield className="mr-2 h-4 w-4" />, path: "/dashboard/security" },
    { name: "Threat Assessments", icon: <Clock className="mr-2 h-4 w-4" />, path: "/dashboard/threats" },
    { name: "Bomb Controls", icon: <Bomb className="mr-2 h-4 w-4" />, path: "/dashboard/bomb-control" },
  ];

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-secondary text-foreground"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-black/95 border-r border-gray-800 w-64 transition-transform transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              <h2 className="font-semibold text-xl">MIDPROT</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-400 mt-1">Midnight Protocol Security System</p>
          <div className="text-xs bg-red-800/30 text-red-400 px-2 py-1 rounded mt-2 border border-red-800">
            CLEARANCE LEVEL: ALPHA
          </div>
        </div>
        
        <nav className="mt-8 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                    location.pathname === item.path
                      ? "bg-red-900/30 text-white border-l-2 border-red-500"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {item.path === "/dashboard/bomb-control" && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center text-xs text-gray-500">
            <Settings className="h-3 w-3 mr-1" />
            <span>SESSION ID: 94872-ALF</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
