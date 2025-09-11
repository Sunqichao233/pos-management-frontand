import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Shield, HelpCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string, rememberMe: boolean) => {
    success: boolean;
    error?: string;
    requiresVerification?: boolean;
    requiresCaptcha?: boolean;
    requiresRiskControl?: boolean;
  };
  onNavigateToRegister: () => void;
  onNavigateToPasswordRecovery: () => void;
  failedAttempts: number;
  isLocked: boolean;
}

export function LoginPage({ onLogin, onNavigateToRegister, onNavigateToPasswordRecovery, failedAttempts, isLocked }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (showCaptcha && !captchaVerified) {
      setError('Please complete the captcha verification');
      return;
    }

    setIsLoading(true);
    setError('');

    // 模拟 API 延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = onLogin(email, password, rememberMe);
    
    if (!result.success) {
      if (result.requiresRiskControl) {
        // Don't set error, just let the redirect happen
        return;
      }
      setError(result.error || 'Login failed');
      if (result.requiresCaptcha) {
        setShowCaptcha(true);
      }
    }

    setIsLoading(false);
  };

  const handleCaptchaVerify = () => {
    // Simulate captcha verification
    setCaptchaVerified(true);
    setError('');
  };

  const handleSSOLogin = (provider: string) => {
    setError(`${provider} login is not implemented in this demo`);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 bg-background overflow-y-auto">
      <div className="w-full max-w-md space-y-4 my-auto flex-shrink-0">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-medium">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <Card className="border-border/50">
          <CardHeader className="space-y-3 pb-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Phone</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email or phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLocked}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Failed attempts indicator */}
            {failedAttempts > 0 && !isLocked && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <Shield className="w-4 h-4" />
                Failed attempts: {failedAttempts}/10
                {failedAttempts >= 3 && (
                  <Badge variant="destructive" className="text-xs">
                    Security check required
                  </Badge>
                )}
              </div>
            )}

            {/* Account locked indicator */}
            {isLocked && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                <Shield className="w-4 h-4" />
                <div>
                  <p className="font-medium">Account Locked</p>
                  <p className="text-xs">Too many failed attempts. Contact support to unlock.</p>
                </div>
              </div>
            )}

            {/* Captcha simulation */}
            {showCaptcha && !captchaVerified && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm">Please verify you're human:</p>
                <div className="bg-background p-3 rounded border-2 border-dashed border-border text-center">
                  <p className="text-sm text-muted-foreground mb-2">I'm not a robot</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCaptchaVerify}
                  >
                    Verify
                  </Button>
                </div>
              </div>
            )}

            {captchaVerified && (
              <Badge variant="secondary" className="w-fit">
                ✓ Captcha verified
              </Badge>
            )}

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                {error}
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLocked}
              />
              <Label htmlFor="remember" className="text-sm">Remember me</Label>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              onClick={handleSubmit}
              disabled={isLoading || isLocked}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full h-9" 
                onClick={onNavigateToRegister}
                disabled={isLoading}
              >
                Register New Account
              </Button>
              <Button 
                variant="ghost" 
                className="w-full h-9" 
                onClick={onNavigateToPasswordRecovery}
                disabled={isLoading}
              >
                Forgot Password?
              </Button>
              <Button 
                variant="ghost" 
                className="w-full h-9" 
                onClick={() => setError('Customer support is not implemented in this demo')}
                disabled={isLoading}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Customer Support
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <p className="text-sm text-center text-muted-foreground">Or continue with</p>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => handleSSOLogin('Google')}
                  disabled={isLoading}
                >
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => handleSSOLogin('Apple')}
                  disabled={isLoading}
                >
                  Apple
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => handleSSOLogin('WeChat')}
                  disabled={isLoading}
                >
                  WeChat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground">
          Demo credentials: demo@example.com / password123
        </p>
      </div>
    </div>
  );
}
