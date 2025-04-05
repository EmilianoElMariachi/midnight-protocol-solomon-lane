
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Lock, File, AlertTriangle } from "lucide-react";

const PAGES = {
  reports: {
    title: "Intelligence Reports",
    description: "Archive of classified intelligence reports and analyses",
    icon: File,
    color: "text-blue-500",
  },
  personnel: {
    title: "Personnel Database",
    description: "Classified personnel files and security clearances",
    icon: User,
    color: "text-yellow-500",
  },
  security: {
    title: "Security Protocols",
    description: "Active security measures and response procedures",
    icon: Shield,
    color: "text-green-500",
  },
  threats: {
    title: "Threat Assessments",
    description: "Current threat vectors and risk analyses",
    icon: AlertTriangle,
    color: "text-orange-500",
  },
};

const GenericSecretPage = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const page = pageId ? PAGES[pageId as keyof typeof PAGES] : null;
  
  if (!page) {
    return (
      <div className="text-center py-10">
        <p>Page non trouvée</p>
      </div>
    );
  }
  
  const PageIcon = page.icon;

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-2 border-b border-gray-800">
          <CardTitle className="text-lg font-medium flex items-center">
            <PageIcon className={`h-5 w-5 mr-2 ${page.color}`} />
            {page.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="bg-yellow-900/20 border border-yellow-800/50 p-4 rounded flex items-start">
              <Lock className="h-5 w-5 mr-2 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-yellow-400 mb-2 font-semibold">ACCÈS RESTREINT</p>
                <p className="text-sm text-gray-300">
                  Ces informations sont classifiées au niveau ALPHA. Toute divulgation 
                  non autorisée constitue une violation de la sécurité nationale.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 p-4 rounded">
              <p className="text-sm mb-4 text-gray-400">{page.description}</p>
              
              {/* Contenu simulé de documents classifiés */}
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div 
                    key={item} 
                    className="p-3 bg-black/40 border border-gray-800 rounded-md hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <File className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-mono">DOCUMENT-{String.fromCharCode(64 + item)}-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                    <div className="mt-2 text-gray-500 text-sm">
                      <p className="typing-effect overflow-hidden whitespace-nowrap">
                        {Array(50).fill('█').join('')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenericSecretPage;
