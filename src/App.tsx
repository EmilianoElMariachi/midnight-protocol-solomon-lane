
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CountdownTimer from "@/components/CountdownTimer";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import DashboardHome from "@/pages/DashboardHome";
import BombControl from "@/pages/BombControl";
import GenericSecretPage from "@/pages/GenericSecretPage";
import NotFound from "@/pages/NotFound";
import { useAuthStore } from "@/stores/authStore";

const queryClient = new QueryClient();

// Composant pour les routes protégées qui nécessitent une authentification
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1F2C] overflow-x-hidden">
      <CountdownTimer />
      
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="bomb-control" element={<BombControl />} />
          <Route path=":pageId" element={<GenericSecretPage />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
