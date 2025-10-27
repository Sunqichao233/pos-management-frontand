'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ResetPasswordModal } from './components/ResetPasswordModal';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { ThemeProvider } from './components/ThemeContext';


type ViewType = 'login' | 'password-recovery' | 'code-sent' | 'register' | 'register-success' | 'password-reset-success';

export default function Login() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  const handleLogin = (email: string, password: string, rememberMe: boolean) => {
    // Demo login logic
    if (email === 'demo@example.com' && password === 'password123') {
      return { success: true };
    }

    // Login failed
    const newFailedAttempts = failedAttempts + 1;
    setFailedAttempts(newFailedAttempts);

    if (newFailedAttempts >= 10) {
      setIsLocked(true);
      return {
        success: false,
        error: 'Account has been locked, please contact support'
      };
    }

    if (newFailedAttempts >= 3) {
      return {
        success: false,
        error: 'Login failed, please check your credentials',
        requiresCaptcha: true
      };
    }

    return {
      success: false,
      error: 'Invalid email or password'
    };
  };

  const handleNavigateToRegister = () => {
    setCurrentView('register');
  };

  // 新增：根据新版 LoginPage 的 props 定义回调
  const handleLoginSuccess = (email: string) => {
    router.push('/dashboard');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  return (
    // 新增：用 Provider 包裹页面，避免 useLanguage/useTheme 报错
    <LanguageProvider>
      <ThemeProvider>
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      </ThemeProvider>
    </LanguageProvider>
  );
}
