
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bomb, Lock, Shield } from "lucide-react";
import { useTimerStore } from "@/stores/timerStore";
import { useToast } from "@/components/ui/use-toast";

const BombControl = () => {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const { isRunning, startTimer, stopTimer } = useTimerStore();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      const correct = code === "01102016";
      
      if (correct) {
        setIsCodeCorrect(true);
        toast({
          title: "Code validé",
          description: "Accès au contrôle de la bombe autorisé",
          variant: "default",
        });
      } else {
        toast({
          title: "Code invalide",
          description: "Le code saisi est incorrect. Nouvelle tentative possible.",
          variant: "destructive",
        });
      }
      
      setIsVerifying(false);
    }, 1500);
  };

  const handleToggleTimer = () => {
    if (isRunning) {
      stopTimer();
      toast({
        title: "DÉCOMPTE ARRÊTÉ",
        description: "Le compte à rebours de la bombe a été désactivé avec succès.",
        variant: "default",
      });
    } else {
      startTimer();
      toast({
        title: "DÉCOMPTE ACTIVÉ",
        description: "Le compte à rebours de la bombe a été réactivé. Évacuation recommandée.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black border-red-900">
        <CardHeader className="pb-2 border-b border-red-900">
          <CardTitle className="text-lg font-medium flex items-center text-red-500">
            <Bomb className="h-5 w-5 mr-2 text-red-500" />
            Contrôle du dispositif explosif
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="bg-red-900/20 border border-red-800/50 p-4 rounded">
              <p className="text-red-400 mb-2 font-semibold">AVERTISSEMENT DE SÉCURITÉ NIVEAU ALPHA</p>
              <p className="text-sm text-gray-300">
                Cette interface permet le contrôle du dispositif explosif nucléaire. Toute manipulation 
                non autorisée déclenchera des protocoles de sécurité et alertera les autorités compétentes.
              </p>
            </div>

            {!isCodeCorrect ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium flex items-center mb-2">
                    <Lock className="h-4 w-4 mr-2" />
                    Code d'autorisation (8 chiffres)
                  </label>
                  <Input
                    type="password"
                    placeholder="Entrez le code d'autorisation"
                    maxLength={8}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="bg-gray-900 border-gray-800 font-mono"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Le code d'accès est requis pour manipuler le dispositif
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-600"
                  disabled={isVerifying || code.length !== 8}
                >
                  {isVerifying ? "Vérification..." : "Valider le code"}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-900/20 border border-green-800/50 p-4 rounded">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-500" />
                    <p className="text-green-400 font-semibold">AUTHENTIFICATION RÉUSSIE</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">
                    Vous avez maintenant accès au contrôle du dispositif explosif. Manipulez avec précaution.
                  </p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm font-medium">Statut du décompte</p>
                      <p className={`text-lg font-bold ${isRunning ? 'text-red-500' : 'text-green-500'}`}>
                        {isRunning ? 'ACTIF' : 'DÉSACTIVÉ'}
                      </p>
                    </div>
                    <div className={`h-3 w-3 rounded-full ${isRunning ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  </div>
                  
                  <Button
                    onClick={handleToggleTimer}
                    className={`w-full ${
                      isRunning
                        ? "bg-green-700 hover:bg-green-600"
                        : "bg-red-700 hover:bg-red-600"
                    }`}
                  >
                    {isRunning ? "ARRÊTER LE DÉCOMPTE" : "REDÉMARRER LE DÉCOMPTE"}
                  </Button>
                </div>
                
                <div className="text-sm text-gray-400">
                  <p className="mb-1">Informations système:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Code d'authentification: ******16</li>
                    <li>Niveau d'accès: ALPHA</li>
                    <li>Dernier accès: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BombControl;
