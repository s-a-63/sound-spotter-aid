import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

const LoginPage = ({ onLogin, onBack }: LoginPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    if (isSignup) {
      // Simple password confirmation check
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Handle signup logic here
      alert("Account created successfully!");
      setIsSignup(false); // switch back to login
    } else {
      // Handle login logic here
      onLogin();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
          aria-label="Go back to home page"
        >
          <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
          Back to Home
        </Button>

        <Card className="shadow-accessible">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isSignup ? "Sign up for free" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-base">
              {isSignup
                ? "Create your account to start using the AI assistive mobility tool"
                : "Sign in to access your AI assistive mobility tool"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 text-base"
                  required
                  aria-describedby="email-help"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 text-base pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </div>

              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base font-semibold">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="h-12 text-base"
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                variant="accessible" 
                size="lg" 
                className="w-full"
                aria-label={isSignup ? "Sign up for a new account" : "Sign in to your account"}
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </Button>

              <div className="text-center">
                <p className="text-muted-foreground">
                  {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-base font-semibold"
                    onClick={() => setIsSignup(!isSignup)}
                    type="button"
                  >
                    {isSignup ? "Sign in" : "Sign up for free"}
                  </Button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Having trouble signing in?{" "}
            <Button variant="link" className="p-0 h-auto text-sm">
              Contact Support
            </Button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
