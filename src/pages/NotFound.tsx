
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
      
      <h1 className="text-3xl font-bold mb-2">ACCÈS REFUSÉ</h1>
      <p className="text-gray-400 mb-8 max-w-md text-center">
        La page demandée n'existe pas ou nécessite un niveau d'autorisation supérieur.
        Cet incident a été signalé aux services de sécurité.
      </p>
      
      <Button asChild variant="outline" className="border-red-800 text-red-500 hover:bg-red-900/20">
        <Link to="/">Retour à l'écran principal</Link>
      </Button>
    </div>
  );
};

export default NotFound;
