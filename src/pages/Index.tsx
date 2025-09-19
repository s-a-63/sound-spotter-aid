import { useState } from "react";
import AccessibleHeader from "@/components/AccessibleHeader";
import LandingPage from "@/components/LandingPage";
import LoginPage from "@/components/LoginPage";
import DetectionPage from "@/components/DetectionPage";

type AppState = 'landing' | 'login' | 'detection';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleGetStarted = () => {
    setCurrentState('login');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentState('detection');
  };

  const handleBackToHome = () => {
    setCurrentState('landing');
  };

  const handleNavigateToDetection = () => {
    setCurrentState('detection');
  };

  return (
    <div className="min-h-screen bg-background">
      <AccessibleHeader 
        isLoggedIn={isLoggedIn}
        onLogin={() => setCurrentState('login')}
        onNavigateToDetection={handleNavigateToDetection}
      />
      
      {currentState === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      
      {currentState === 'login' && (
        <LoginPage onLogin={handleLogin} onBack={handleBackToHome} />
      )}
      
      {currentState === 'detection' && (
        <DetectionPage onBack={handleBackToHome} />
      )}
    </div>
  );
};

export default Index;
