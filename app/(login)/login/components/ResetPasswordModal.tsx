import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, Check, X } from 'lucide-react';

interface ResetPasswordModalProps {
  onClose: () => void;
  onPasswordReset: () => void;
}

export function ResetPasswordModal({ onClose, onPasswordReset }: ResetPasswordModalProps) {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      notCommon: !isCommonPassword(password)
    };

    score = Object.values(checks).filter(Boolean).length;
    
    return {
      score,
      percentage: (score / 6) * 100,
      strength: score <= 2 ? 'Weak' : score <= 3 ? 'Fair' : score <= 4 ? 'Good' : score <= 5 ? 'Strong' : 'Very Strong',
      checks
    };
  };

  const isCommonPassword = (password: string) => {
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
      'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'password1',
      'qwerty123', 'admin123', 'welcome123', 'login', 'guest', 'root',
      'master', 'super', 'user', 'test', 'demo', 'sample'
    ];
    return commonPasswords.includes(password.toLowerCase());
  };

  const passwordStrength = getPasswordStrength(passwords.newPassword);

  const validatePasswords = () => {
    if (!passwords.newPassword) {
      return 'New password is required';
    }

    if (isCommonPassword(passwords.newPassword)) {
      return 'This password is too common. Please choose a different password.';
    }

    if (passwordStrength.score < 4) {
      return 'Password is too weak. Please include more character types.';
    }

    if (!passwords.confirmPassword) {
      return 'Please confirm your new password';
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      return 'Passwords do not match';
    }

    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validatePasswords();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');

    // 模拟 API 延迟
    await new Promise(resolve => setTimeout(resolve, 2000));

    onPasswordReset();
    setIsLoading(false);
  };

  const handlePasswordChange = (field: 'newPassword' | 'confirmPassword', value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reset Your Password</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPasswords.newPassword ? 'text' : 'password'}
                placeholder="Enter your new password"
                value={passwords.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                onClick={() => setShowPasswords(prev => ({ ...prev, newPassword: !prev.newPassword }))}
              >
                {showPasswords.newPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>

            {/* Password Strength Indicator */}
            {passwords.newPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Password strength:</span>
                  <span className={`font-medium ${
                    passwordStrength.strength === 'Weak' ? 'text-destructive' :
                    passwordStrength.strength === 'Fair' ? 'text-yellow-600' :
                    passwordStrength.strength === 'Good' ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    {passwordStrength.strength}
                  </span>
                </div>
                <Progress value={passwordStrength.percentage} className="h-2" />
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.length ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordStrength.checks.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    8+ characters
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.uppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordStrength.checks.uppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Uppercase
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.lowercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordStrength.checks.lowercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Lowercase
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.number ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordStrength.checks.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Number
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.special ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordStrength.checks.special ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Special char
                  </div>
                  <div className={`flex items-center gap-1 ${passwordStrength.checks.notCommon ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordStrength.checks.notCommon ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Not common
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showPasswords.confirmPassword ? 'text' : 'password'}
                placeholder="Confirm your new password"
                value={passwords.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
              >
                {showPasswords.confirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>

            {/* Password Match Indicator */}
            {passwords.confirmPassword && (
              <div className={`text-sm flex items-center gap-1 ${
                passwords.newPassword === passwords.confirmPassword ? 'text-green-600' : 'text-destructive'
              }`}>
                {passwords.newPassword === passwords.confirmPassword ? 
                  <Check className="w-3 h-3" /> : 
                  <X className="w-3 h-3" />
                }
                {passwords.newPassword === passwords.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </div>
            )}
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>

        <div className="text-xs text-muted-foreground">
          <p>• Use a strong, unique password that you haven't used elsewhere</p>
          <p>• Your new password will be effective immediately</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
