import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Eye, EyeOff, Shield, Check, X } from 'lucide-react';

interface RegisterPageProps {
  onRegister: (email: string) => void;
  onBackToLogin: () => void;
}

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Japan', 'China', 'Singapore', 'Netherlands'
];

export function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.country) {
      newErrors.country = 'Please select your country';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (isCommonPassword(formData.password)) {
      newErrors.password = 'This password is too common. Please choose a different password.';
    } else if (passwordStrength.score < 4) {
      newErrors.password = 'Password is too weak. Please include more character types.';
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and privacy policy';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    onRegister(formData.email);
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 bg-background overflow-y-auto">
      <div className="w-full max-w-md space-y-4 my-auto flex-shrink-0">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-medium">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join us today</p>
        </div>

        <Card className="border-border/50">
          <CardHeader className="space-y-1 pb-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-fit -ml-2"
              onClick={onBackToLogin}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company">Company/Brand</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Enter your company name (optional)"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country/Region *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
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

                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Terms */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-5">
                    I accept the{' '}
                    <button
                      type="button"
                      className="text-primary underline hover:no-underline"
                      onClick={() => setShowTermsModal(true)}
                    >
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      className="text-primary underline hover:no-underline"
                      onClick={() => setShowTermsModal(true)}
                    >
                      Privacy Policy
                    </button>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-destructive">{errors.terms}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Next'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Terms Modal */}
        <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Terms & Privacy Policy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Terms of Service</h4>
                <p className="text-muted-foreground">
                  This is a demo application. In a real implementation, you would include your complete terms of service here.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Privacy Policy</h4>
                <p className="text-muted-foreground">
                  This is a demo application. In a real implementation, you would include your complete privacy policy here.
                </p>
              </div>
              <Button 
                onClick={() => setShowTermsModal(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
