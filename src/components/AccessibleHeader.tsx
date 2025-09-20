import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";

interface AccessibleHeaderProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onNavigateToDetection?: () => void;
}

const AccessibleHeader = ({ isLoggedIn, onLogin, onNavigateToDetection }: AccessibleHeaderProps) => {
  return (
    <header className="border-b-2 border-border bg-card shadow-card">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between" role="navigation" aria-label="Main navigation">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-foreground">
              AI Assistive Mobility
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button 
                variant="accessible" 
                onClick={onNavigateToDetection}
                aria-label="Go to detection tool"
              >
                Detection Tool <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            ) : (
              <Button 
                variant="accessible" 
                onClick={onLogin}
                aria-label="Log in to access detection tool"
              >
                Log In / Sign Up <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AccessibleHeader;