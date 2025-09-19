'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Shield, HelpCircle } from 'lucide-react';
import { loginApi } from '@/api/login';
import { Users } from "lucide-react";

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
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [showPassword, setShowPassword] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !password) {
      setError('请填写所有字段');
      return;
    }

    // if (showCaptcha && !captchaVerified) {
    //   setError('请完成验证码验证');
    //   return;
    // }

    setIsLoading(true);
    setError('');

    try {
      // 调用真实的登录API
      // const data = await loginApi.login({
      //   email,
      //   password,
      //   rememberMe
      // });
      console.log('模拟登录请求:');
      // if (data.token) {
      if (1) {
        // 登录成功，跳转到主页面
        // console.log('登录成功:', data);
        console.log('登录成功:');
        router.push('/dashboard');
      } else {
        setError('登录失败');
        // setError(data.message || '登录失败');
      }
    } catch (error: any) {
      console.error('登录错误:', error);

      // 处理不同类型的错误
      if (error.response?.status === 401) {
        setError('邮箱或密码错误');
      } else if (error.response?.status === 429) {
        setError('登录尝试次数过多，请稍后再试');
        setShowCaptcha(true);
      } else if (error.response?.status === 423) {
        setError('账户已被锁定，请联系客服');
      } else {
        setError(error.message || '网络错误，请稍后重试');
      }
    } finally {
      setIsLoading(false);
    }
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
    <div className="flex min-h-screen items-center justify-center bg-white">
      <Card className="w-full max-w-sm shadow-none border-0">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-gray-600">
            New to Square?{" "}
            <a onClick={onNavigateToRegister}
              className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </Button>
          </form>

          <div className="flex items-center my-4">
            <Separator className="flex-1" />
            <span className="px-2 text-gray-400 text-sm">or</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full bg-gray-100 hover:bg-gray-200 text-blue-600"
            onClick={onNavigateToPasswordRecovery}
          >
            <Users className="w-4 h-4 mr-2" />
            Sign in with a passkey
          </Button>
        </CardContent>
      </Card>

      {/* 顶部右侧 Learn more 链接 */}
      <a
        href="#"
        className="absolute top-4 right-6 text-sm text-blue-600 hover:underline"
      >
        Learn more
      </a>
    </div>
  );
}
