
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "../ui/Logo";

interface LoginFormProps {
  onLogin: () => void;
  hideHeader?: boolean;
}

export function LoginForm({ onLogin, hideHeader = false }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isDarkMode = document.documentElement.classList.contains("dark");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="w-full space-y-6">
      {!hideHeader && (
        <div className="text-left">
          <div className="flex justify-start mb-2 bg-[rgba(255,255,255,0)]">
            <Logo 
              className="h-10 w-auto" 
              variant={isDarkMode ? "white" : "default"}
            />
          </div>
        </div>
      )}

      <Card className="border-border/60 shadow-sm">
        {!hideHeader && (
          <CardHeader className="pb-4">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
        )}
        <CardContent className={hideHeader ? "pt-6" : ""}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@company.com" 
                required 
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a 
                  href="#" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm cursor-pointer">
                Remember me for 30 days
              </Label>
            </div>
            <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 rounded-[16px] rounded-tl-[16px] rounded-tr-[0px] rounded-bl-[16px] rounded-br-[16px]">
              Sign in
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <span>Don't have an account? </span>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Contact your administrator
              </a>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6 text-sm text-muted-foreground">
          <div className="space-x-4">
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact Support</a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
