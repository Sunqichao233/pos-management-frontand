import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MFAPopup } from './MFAPopup';
import { Eye, EyeOff, Mail, Phone } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
  onSwitchToRegister: () => void;
}

export function LoginPage({ onLoginSuccess, onSwitchToRegister }: LoginPageProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState<'login' | 'forgot-password' | 'reset-success'>('login');
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  
  // Phone verification states
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  const sendVerificationCode = () => {
    if (!identifier) {
      setError(t('error.enterPhoneNumber'));
      return;
    }
    
    setError('');
    setVerificationError('');
    setCodeSent(true);
    setResendCountdown(60);
    
    // Start countdown timer
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Simulate sending SMS code
    console.log('Verification code sent to:', identifier);
  };

  const verifyPhoneCode = () => {
    // Simulate verification - in real app, this would verify with backend
    if (verificationCode !== '123456') {
      setVerificationError(t('error.verificationIncorrect'));
      return;
    }
    
    setVerificationError('');
    setError('');
    onLoginSuccess(identifier);
  };

  const handleLogin = () => {
    if (loginType === 'email') {
      if (!identifier || !password) {
        setError(t('error.fillAllFields'));
        return;
      }

      // Simulate login validation
      if (password === 'wrong') {
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
        
        if (newFailedAttempts >= 10) {
          setIsLocked(true);
          setError(t('error.accountLocked'));
          return;
        } else if (newFailedAttempts >= 3) {
          setShowCaptcha(true);
          setError(t('error.completeCaptcha'));
          return;
        }
        
        setError(t('error.invalidCredentials'));
        return;
      }

      setError('');
      setShowMFA(true);
    } else {
      // Phone login - verify code
      if (!codeSent) {
        setError(t('error.fillAllFields'));
        return;
      }
      
      if (!verificationCode || verificationCode.length !== 6) {
        setError(t('login.enterCode'));
        return;
      }
      
      verifyPhoneCode();
    }
  };

  const handleMFASuccess = () => {
    setShowMFA(false);
    onLoginSuccess(identifier);
  };

  const handlePhoneVerification = () => {
    if (phoneVerificationCode.length === 6) {
      setShowPhoneVerification(false);
      onLoginSuccess(identifier);
    }
  };

  const handleForgotPassword = () => {
    if (!resetEmail) {
      setError(t('error.emailRequired'));
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setError(t('error.emailInvalid'));
      return;
    }

    setError('');
    setIsResetting(true);
    
    // Simulate sending reset email
    setTimeout(() => {
      setIsResetting(false);
      setCurrentView('reset-success');
    }, 2000);
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    setError('');
    setResetEmail('');
  };

  if (isLocked) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-background">
        <Card className="w-full max-w-md bg-card border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>{t('error.accountLockedTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="border-destructive">
              <AlertDescription>
                {t('error.accountLockedMessage')}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: theme === 'dark' 
            ? 'radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(251, 113, 133, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.04) 0%, transparent 50%)',
        }} />
        <Card className="w-full max-w-md border relative z-10 bg-card shadow-lg">
          <CardHeader className="text-center space-y-1 pb-6">
            <CardTitle className="text-3xl">{t('forgot.title')}</CardTitle>
            <p className="text-muted-foreground">
              {t('forgot.description')}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reset-email">{t('forgot.email')}</Label>
              <Input 
                id="reset-email"
                type="email" 
                placeholder={t('forgot.emailPlaceholder')}
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="h-12"
              />
            </div>

            {error && (
              <Alert className="border-destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Button 
                onClick={handleForgotPassword} 
                className="w-full h-12 bg-primary text-primary-foreground hover:opacity-90"
                disabled={isResetting}
              >
                {isResetting ? t('login.sendCode') + '...' : t('forgot.sendLink')}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleBackToLogin}
                className="w-full h-12"
              >
                {t('forgot.backToLogin')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentView === 'reset-success') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: theme === 'dark' 
            ? 'radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(251, 113, 133, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.04) 0%, transparent 50%)',
        }} />
        <Card className="w-full max-w-md border relative z-10 bg-card shadow-lg">
          <CardHeader className="text-center space-y-1 pb-6">
            <CardTitle className="text-3xl">{t('forgot.emailSent')}</CardTitle>
            <p className="text-muted-foreground">
              {t('forgot.checkEmail')}
            </p>
            <p className="font-medium">{resetEmail}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertDescription>
                {t('forgot.checkEmail')}
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button 
                onClick={handleBackToLogin}
                className="w-full h-12 bg-primary text-primary-foreground hover:opacity-90"
              >
                {t('forgot.returnToLogin')}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('forgot-password')}
                className="w-full h-12"
              >
                {t('login.resend')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8 relative overflow-hidden bg-background">
        {/* 微妙的背景层次 */}
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: theme === 'dark' 
            ? 'radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(251, 113, 133, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.04) 0%, transparent 50%)',
        }} />
        
        {/* Sympol POS Logo - 专业简洁 */}
        <div className="text-center relative z-10">
          <h1 className="tracking-tight text-foreground" style={{ 
            fontSize: '36px', 
            fontWeight: 600, 
            letterSpacing: '-0.02em'
          }}>
            Sympol <span className="text-primary">POS</span>
          </h1>
          <p className="mt-2 text-muted-foreground" style={{ 
            fontSize: '14px',
            letterSpacing: '0.02em'
          }}>
            {t('login.subtitle')}
          </p>
        </div>
        
        <Card className="w-full max-w-md border relative z-10 bg-card shadow-lg">
          <CardHeader className="text-center space-y-1 pb-6">
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={loginType} onValueChange={(value) => {
              setLoginType(value as 'email' | 'phone');
              // Reset all states when switching tabs
              setError('');
              setVerificationError('');
              setCodeSent(false);
              setVerificationCode('');
              setResendCountdown(0);
            }} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t('login.email')}
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {t('login.phone')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('login.emailAddress')}</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder={t('login.enterEmail')}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="h-12"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('login.phoneNumber')}</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="phone"
                      type="tel" 
                      placeholder={t('login.enterPhone')}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="h-12 flex-1"
                      disabled={codeSent}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={sendVerificationCode}
                      disabled={resendCountdown > 0 || !identifier}
                      className="h-12 whitespace-nowrap"
                    >
                      {codeSent 
                        ? resendCountdown > 0 
                          ? `${t('login.resend')} (${resendCountdown}s)` 
                          : t('login.resend')
                        : t('login.sendCode')
                      }
                    </Button>
                  </div>
                </div>
                
                {codeSent && (
                  <div className="space-y-2">
                    <Label htmlFor="verification-code">{t('login.verificationCode')}</Label>
                    <Input 
                      id="verification-code"
                      type="text" 
                      placeholder={t('login.enterCode')}
                      value={verificationCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setVerificationCode(value);
                        setVerificationError('');
                      }}
                      className="h-12 text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                    {verificationError && (
                      <p className="text-sm text-destructive">{verificationError}</p>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {loginType === 'email' && (
              <div className="space-y-2">
                <Label htmlFor="password">{t('login.password')}</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t('login.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <Alert className="border-destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loginType === 'email' && showCaptcha && (
              <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center text-muted-foreground">
                <p>{t('error.completeCaptcha')}</p>
              </div>
            )}

            <Button 
              onClick={handleLogin} 
              className="w-full h-12 bg-primary text-primary-foreground hover:opacity-90"
              disabled={isLocked}
            >
              {t('login.signIn')}
            </Button>

            <div className="text-center">
              <Button variant="link" className="text-sm" onClick={() => setCurrentView('forgot-password')}>
                {t('login.forgotPassword')}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {t('login.noAccount')}{' '}
              <Button variant="link" onClick={onSwitchToRegister} className="p-0">
                {t('login.signUp')}
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>

      {showMFA && (
        <MFAPopup 
          onSuccess={handleMFASuccess}
          onCancel={() => setShowMFA(false)}
        />
      )}

      {showPhoneVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Phone Verification</CardTitle>
              <p className="text-muted-foreground">
                We've sent a verification code to {identifier}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-code">Verification Code</Label>
                <Input 
                  id="phone-code"
                  type="text" 
                  placeholder="Enter 6-digit code"
                  value={phoneVerificationCode}
                  onChange={(e) => setPhoneVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-lg tracking-widest h-12"
                  maxLength={6}
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPhoneVerification(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handlePhoneVerification}
                  className="flex-1"
                  disabled={phoneVerificationCode.length !== 6}
                >
                  Verify
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}