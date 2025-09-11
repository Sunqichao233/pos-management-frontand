import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Shield, Mail } from 'lucide-react';

interface PasswordRecoveryPageProps {
  onSendCode: (email: string) => void;
  onBackToLogin: () => void;
}

export function PasswordRecoveryPage({ onSendCode, onBackToLogin }: PasswordRecoveryPageProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    onSendCode(email);
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 bg-background overflow-y-auto">
      <div className="w-full max-w-md space-y-4 my-auto flex-shrink-0">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-muted-foreground mt-2">
            Enter your email address and we'll send you a verification code to reset your password
          </p>
        </div>

        <Card className="border-border/50">
          <CardHeader className="space-y-1 pb-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-fit -ml-2"
              onClick={onBackToLogin}
              disabled={isLoading}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className="pl-10"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Sending Code...' : 'Send Verification Code'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <button
                  onClick={onBackToLogin}
                  className="text-primary hover:underline"
                  disabled={isLoading}
                >
                  Sign in instead
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Help text */}
        <div className="text-xs text-center text-muted-foreground space-y-1">
          <p>You'll receive a verification code at the email address you provide.</p>
          <p>If you don't receive the email, check your spam folder or contact support.</p>
        </div>
      </div>
    </div>
  );
}
