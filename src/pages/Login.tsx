
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Lock, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'attente pour l'authentification
    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        toast({
          title: "Accès autorisé",
          description: "Identifiants de sécurité validés",
          variant: "default",
        });
        navigate("/dashboard");
      } else {
        setLoginAttempts((prev) => prev + 1);
        toast({
          title: "Accès refusé",
          description: `Identifiants invalides. Tentative ${loginAttempts + 1}/3.`,
          variant: "destructive",
        });
        
        // Simulation de blocage après 3 tentatives
        if (loginAttempts >= 2) {
          toast({
            title: "ALERTE DE SÉCURITÉ",
            description: "Trop de tentatives échouées. Système verrouillé temporairement.",
            variant: "destructive",
          });
        }
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Shield className="h-16 w-16 text-red-500" />
          </div>
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">SIGMA-9</h1>
            <p className="text-sm text-gray-400">SIGMA-9 Security System</p>
            
            <div className="mt-4 text-xs bg-red-900/20 text-red-400 border border-red-800/50 p-2 rounded">
              AVERTISSEMENT: Système gouvernemental restreint. Accès non autorisé punissable selon la loi.
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label className="text-sm font-medium flex items-center mb-2">
                  <User className="h-4 w-4 mr-2" />
                  Identifiant
                </label>
                <Input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-900 border-gray-800"
                  required
                  autoFocus
                />
              </div>
              
              <div className="relative">
                <label className="text-sm font-medium flex items-center mb-2">
                  <Lock className="h-4 w-4 mr-2" />
                  Mot de passe
                </label>
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-900 border-gray-800"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Vérification..." : "Authentification"}
            </Button>
          </form>
          
          <div className="mt-8 border-t border-gray-800 pt-4">
            <div className="text-xs text-gray-500 text-center">
              <p>Terminal ID: TRM-648371</p>
              <p>Sécurité de niveau ALPHA requise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
