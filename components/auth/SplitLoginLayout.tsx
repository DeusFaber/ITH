
import { LoginForm } from "./LoginForm";
import { Logo } from "../ui/Logo";
import { useState, useEffect } from "react";
import Image3 from "../../imports/Image3-12-70";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface SplitLoginLayoutProps {
  onLogin: () => void;
  onClose?: () => void; // Added new prop for closing the login form
}

export function SplitLoginLayout({ onLogin, onClose }: SplitLoginLayoutProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left section with image */}
      <div className="hidden md:flex md:w-1/2 bg-sidebar relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sidebar/95 to-sidebar/80 z-10" />
        <div className="absolute inset-0">
          <Image3 />
        </div>
        <div className="absolute top-0 left-0 right-0 p-8 z-20">
          <Logo
            className="w-[200px] h-auto"
            variant="white"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="text-white space-y-2">
            <h2 className="text-2xl font-extralight">IT Health Management Platform</h2>
            <p className="text-white/80">
              Streamline your IT operations, enhance security, and accelerate digital transformation with our comprehensive solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Right section with login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12 relative">
        {/* Close button */}
        {onClose && (
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground hover:bg-muted/50 z-10 border-border/50 ithealth-button"
            onClick={onClose}
            aria-label="Return to home page"
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        <div className="w-full max-w-md">
          <div className="md:hidden flex justify-center mb-8">
            <Logo
              className="w-[200px] h-auto"
              variant={theme === "dark" ? "white" : "default"}
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-extralight mb-1 text-center md:text-left">Welcome to IT Health</h1>
          <p className="text-sm text-muted-foreground mb-8 text-center md:text-left">
            Sign in to access your dashboard and resources
          </p>
          <LoginForm onLogin={onLogin} hideHeader={true} />
        </div>
      </div>
    </div>
  );
}
