import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bomb, User, Shield, Server, File } from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="text-sm bg-red-900/20 border border-red-800/50 p-4 rounded">
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-red-500" />
          <p className="text-red-400 uppercase font-semibold">Notification de sécurité</p>
        </div>
        <p className="mt-2 text-gray-300">
          Bienvenue dans le système de contrôle SIGMA-9. Ce système contient des informations classifiées 
          de la plus haute importance. Toutes vos actions sont enregistrées et surveillées.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bomb className="h-4 w-4 mr-2 text-red-500" />
              Statut de menace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-500">ÉLEVÉ</p>
            <p className="text-xs text-gray-400 mt-1">Dernière mise à jour: aujourd'hui</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="h-4 w-4 mr-2 text-blue-500" />
              Personnel actif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">42</p>
            <p className="text-xs text-gray-400 mt-1">Agents sur le terrain</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              Sécurité système
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">OPÉRATIONNEL</p>
            <p className="text-xs text-gray-400 mt-1">Tous protocoles actifs</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Server className="h-4 w-4 mr-2 text-yellow-500" />
              Systèmes en ligne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">28/32</p>
            <p className="text-xs text-gray-400 mt-1">Serveurs opérationnels</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Documents récents</h2>
        <div className="space-y-2">
          {[
            "Rapport d'évaluation de menace #24601",
            "Protocole de confinement biologique",
            "Personnel de haut niveau - Mise à jour de sécurité",
            "Nouvelles procédures d'évacuation",
            "Analyse de faille de sécurité - Secteur Est"
          ].map((doc, index) => (
            <div 
              key={index} 
              className="p-3 bg-gray-900 border border-gray-800 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <File className="h-4 w-4 mr-2 text-blue-400" />
                  <span>{doc}</span>
                </div>
                <span className="text-xs text-gray-500">Niveau Alpha</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
