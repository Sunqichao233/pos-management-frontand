import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Login Page
    'login.title': 'Sympol POS',
    'login.subtitle': 'Restaurant Management System',
    'login.email': 'Email',
    'login.phone': 'Phone',
    'login.emailAddress': 'Email address',
    'login.phoneNumber': 'Phone number',
    'login.password': 'Password',
    'login.sendCode': 'Send Code',
    'login.resend': 'Resend',
    'login.verificationCode': 'Verification Code',
    'login.enterCode': 'Enter 6-digit code',
    'login.signIn': 'Sign In',
    'login.forgotPassword': 'Forgot password?',
    'login.noAccount': "Don't have an account?",
    'login.signUp': 'Sign up',
    'login.enterEmail': 'Enter your email',
    'login.enterPhone': 'Enter your phone number',
    
    // Welcome Page
    'welcome.title': 'Welcome to Simpal POS, we make everything simple for you!',
    'welcome.enterPOS': 'Enter POS System',
    
    // Language Switcher
    'language.english': 'English',
    'language.chinese': '中文',
    
    // Registration - Account Type
    'register.accountType.title': 'Please select registration type',
    'register.accountType.individual': 'Individual Restaurant / Owner',
    'register.accountType.company': 'Company / Restaurant Chain',
    'register.accountType.next': 'Next',
    'register.accountType.back': 'Back',
    
    // Registration - Info Form
    'register.info.title': 'Create Your Account',
    'register.info.email': 'Email',
    'register.info.phone': 'Phone Number',
    'register.info.password': 'Password',
    'register.info.confirmPassword': 'Confirm Password',
    'register.info.enterEmail': 'Enter your email',
    'register.info.enterPhone': 'Enter your phone number',
    'register.info.enterPassword': 'Enter your password',
    'register.info.confirmPasswordPlaceholder': 'Confirm your password',
    'register.info.sendCode': 'Send Code',
    'register.info.next': 'Next',
    'register.info.back': 'Back',
    'register.info.passwordMismatch': 'Passwords do not match',
    'register.info.emailExists': 'Email already registered',
    
    // Registration - Email Verification
    'register.verify.title': 'Email Verification',
    'register.verify.description': 'Verification code has been sent to',
    'register.verify.code': 'Verification Code',
    'register.verify.enterCode': 'Enter 6-digit code',
    'register.verify.resend': 'Resend Code',
    'register.verify.countdown': 'Resend in {seconds}s',
    'register.verify.verify': 'Verify and Continue',
    'register.verify.back': 'Back',
    'register.verify.invalidCode': 'Invalid verification code',
    
    // Registration - Business Info
    'register.business.title': 'Restaurant / Business Information',
    'register.business.name': 'Restaurant / Company Name',
    'register.business.ownerName': 'Owner Name',
    'register.business.address': 'Restaurant Address',
    'register.business.logo': 'Upload Logo (Optional)',
    'register.business.namePlaceholder': 'Enter business name',
    'register.business.ownerPlaceholder': 'Enter owner name',
    'register.business.addressPlaceholder': 'Enter business address',
    'register.business.uploadLogo': 'Click to upload logo',
    'register.business.next': 'Next',
    'register.business.back': 'Back',
    
    // Registration - Terms
    'register.terms.title': 'Terms and Conditions',
    'register.terms.serviceTitle': 'Service Agreement',
    'register.terms.privacyTitle': 'Privacy Policy',
    'register.terms.agree': 'I have read and agree to the Terms of Service',
    'register.terms.continue': 'Continue Registration',
    'register.terms.back': 'Back',
    'register.terms.mustAgree': 'You must agree to the terms to continue',
    'register.terms.service1': '1. Acceptance of Terms: By accessing and using Sympol POS, you accept and agree to be bound by the terms and provision of this agreement.',
    'register.terms.service2': '2. Use License: Permission is granted to temporarily use Sympol POS for personal or commercial purposes. This is the grant of a license, not a transfer of title.',
    'register.terms.service3': '3. Service Description: Sympol POS provides point-of-sale software and related services for restaurant and retail businesses.',
    'register.terms.service4': '4. User Obligations: You agree to use the service only for lawful purposes and in accordance with these Terms of Service.',
    'register.terms.service5': '5. Payment Terms: Subscription fees are billed in advance on a monthly or annual basis and are non-refundable.',
    'register.terms.service6': '6. Limitation of Liability: Sympol POS shall not be liable for any indirect, incidental, special, consequential or punitive damages.',
    'register.terms.privacy1': '1. Information Collection: We collect information you provide directly to us when you create an account, use our services, or communicate with us.',
    'register.terms.privacy2': '2. Use of Information: We use the information we collect to provide, maintain, and improve our services, and to communicate with you.',
    'register.terms.privacy3': '3. Data Security: We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.',
    'register.terms.privacy4': '4. Data Sharing: We do not share your personal information with third parties except as described in this privacy policy.',
    'register.terms.privacy5': '5. Your Rights: You have the right to access, update, or delete your personal information at any time.',
    'register.terms.privacy6': '6. Cookies: We use cookies and similar tracking technologies to track activity on our service and hold certain information.',
    
    // Registration - Trial
    'register.trial.title': 'Congratulations! You will get 30 days free trial',
    'register.trial.description': 'You can upgrade to the full version at any time after the trial period ends',
    'register.trial.start': 'Start Using',
    'register.trial.features': 'Free Trial Features:',
    'register.trial.feature1': 'Full POS system access',
    'register.trial.feature2': 'Unlimited transactions',
    'register.trial.feature3': 'Basic reporting',
    'register.trial.feature4': 'Email support',
    
    // Forgot Password
    'forgot.title': 'Reset Password',
    'forgot.description': 'Enter your email address and we will send you a password reset link',
    'forgot.email': 'Email Address',
    'forgot.emailPlaceholder': 'Enter your email',
    'forgot.sendLink': 'Send Reset Link',
    'forgot.backToLogin': 'Back to Login',
    'forgot.emailSent': 'Reset Link Sent',
    'forgot.checkEmail': 'Please check your email and click the link to reset your password',
    'forgot.returnToLogin': 'Return to Login',
    
    // MFA (Multi-Factor Authentication)
    'mfa.title': 'Two-Factor Authentication',
    'mfa.description': 'Please verify your identity to continue',
    'mfa.sms': 'SMS',
    'mfa.email': 'Email',
    'mfa.totp': 'TOTP',
    'mfa.smsDescription': 'We\'ve sent a verification code to your phone ending in ••••89',
    'mfa.emailDescription': 'We\'ve sent a verification code to your email address',
    'mfa.totpDescription': 'Enter the 6-digit code from your authenticator app',
    'mfa.verificationCode': 'Verification Code',
    'mfa.enterCode': 'Enter 6-digit code',
    'mfa.trustDevice': 'Trust this device for 30 days',
    'mfa.cancel': 'Cancel',
    'mfa.verify': 'Verify',
    
    // Error Messages
    'error.fillAllFields': 'Please fill in all fields',
    'error.invalidCredentials': 'Invalid credentials',
    'error.accountLocked': 'Account locked due to too many failed attempts. Please try again in 30 minutes.',
    'error.accountLockedTitle': 'Account Locked',
    'error.accountLockedMessage': 'Your account has been temporarily locked due to multiple failed login attempts. Please try again in 30 minutes or contact support.',
    'error.completeCaptcha': 'Please complete the captcha below',
    'error.enterPhoneNumber': 'Please enter your phone number',
    'error.verificationIncorrect': 'Verification code is incorrect',
    'error.emailRequired': 'Please enter your email address',
    'error.emailInvalid': 'Please enter a valid email address',
    
    // Success Messages
    'success.codeSent': 'Verification code sent',
    'success.loginSuccess': 'Login successful',
    'success.registrationComplete': 'Registration complete',
    'success.passwordReset': 'Password reset successful',
    
    // POS System
    'pos.dashboard': 'POS System Dashboard',
    'pos.welcomeMessage': 'Welcome to Sympol POS!',
    'pos.backToLogin': 'Back to Login',
  },
  zh: {
    // Login Page
    'login.title': 'Sympol POS',
    'login.subtitle': '餐厅管理系统',
    'login.email': '邮箱',
    'login.phone': '手机',
    'login.emailAddress': '邮箱地址',
    'login.phoneNumber': '手机号码',
    'login.password': '密码',
    'login.sendCode': '发送验证码',
    'login.resend': '重新发送',
    'login.verificationCode': '验证码',
    'login.enterCode': '请输入6位数验证码',
    'login.signIn': '登录',
    'login.forgotPassword': '忘记密码？',
    'login.noAccount': '还没有账户？',
    'login.signUp': '注册',
    'login.enterEmail': '请输入您的邮箱',
    'login.enterPhone': '请输入您的手机号码',
    
    // Welcome Page
    'welcome.title': '欢迎使用 Simpal POS，我们让一切变得简单！',
    'welcome.enterPOS': '进入 POS 系统',
    
    // Language Switcher
    'language.english': 'English',
    'language.chinese': '中文',
    
    // Registration - Account Type
    'register.accountType.title': '请选择注册类型',
    'register.accountType.individual': '个人餐厅 / 店主',
    'register.accountType.company': '公司 / 餐饮连锁',
    'register.accountType.next': '下一步',
    'register.accountType.back': '返回',
    
    // Registration - Info Form
    'register.info.title': '创建您的账户',
    'register.info.email': '邮箱',
    'register.info.phone': '手机号',
    'register.info.password': '密码',
    'register.info.confirmPassword': '确认密码',
    'register.info.enterEmail': '请输入您的邮箱',
    'register.info.enterPhone': '请输入您的手机号码',
    'register.info.enterPassword': '请输入您的密码',
    'register.info.confirmPasswordPlaceholder': '请再次输入密码',
    'register.info.sendCode': '发送验证码',
    'register.info.next': '下一步',
    'register.info.back': '返回',
    'register.info.passwordMismatch': '两次输入的密码不一致',
    'register.info.emailExists': '该邮箱已被注册',
    
    // Registration - Email Verification
    'register.verify.title': '邮箱验证',
    'register.verify.description': '验证码已发送至',
    'register.verify.code': '验证码',
    'register.verify.enterCode': '请输入6位数验证码',
    'register.verify.resend': '重新发送验证码',
    'register.verify.countdown': '{seconds}秒后重新发送',
    'register.verify.verify': '验证并继续',
    'register.verify.back': '返回',
    'register.verify.invalidCode': '验证码错误',
    
    // Registration - Business Info
    'register.business.title': '餐厅 / 公司信息',
    'register.business.name': '餐厅 / 公司名称',
    'register.business.ownerName': '负责人姓名',
    'register.business.address': '餐厅地址',
    'register.business.logo': '上传Logo（可选）',
    'register.business.namePlaceholder': '请输入餐厅/公司名称',
    'register.business.ownerPlaceholder': '请输入负责人姓名',
    'register.business.addressPlaceholder': '请输入餐厅地址',
    'register.business.uploadLogo': '点击上传Logo',
    'register.business.next': '下一步',
    'register.business.back': '返回',
    
    // Registration - Terms
    'register.terms.title': '服务协议',
    'register.terms.serviceTitle': '服务协议',
    'register.terms.privacyTitle': '隐私政策',
    'register.terms.agree': '我已阅读并同意服务条款',
    'register.terms.continue': '继续注册',
    'register.terms.back': '返回',
    'register.terms.mustAgree': '您必须同意服务条款才能继续',
    'register.terms.service1': '1. 条款接受：访问和使用 Sympol POS，即表示您接受并同意受本协议条款和条件的约束。',
    'register.terms.service2': '2. 使用许可：授予您临时使用 Sympol POS 用于个人或商业目的的许可。这是许可的授予，而不是所有权的转让。',
    'register.terms.service3': '3. 服务说明：Sympol POS 为餐饮和零售企业提供销售点软件及相关服务。',
    'register.terms.service4': '4. 用户义务：您同意仅出于合法目的并按照本服务条款使用该服务。',
    'register.terms.service5': '5. 付款条款：订阅费用按月或年度提前收取，且不可退款。',
    'register.terms.service6': '6. 责任限制：Sympol POS 不对任何间接、附带、特殊、后果性或惩罚性损害承担责任。',
    'register.terms.privacy1': '1. 信息收集：当您创建账户、使用我们的服务或与我们沟通时，我们会收集您直接提供给我们的信息。',
    'register.terms.privacy2': '2. 信息使用：我们使用收集的信息来提供、维护和改进我们的服务，并与您沟通。',
    'register.terms.privacy3': '3. 数据安全：我们采取合理措施帮助保护您的个人信息免遭丢失、盗窃、误用、未经授权访问、披露、更改和破坏。',
    'register.terms.privacy4': '4. 数据共享：除本隐私政策中所述外，我们不会与第三方共享您的个人信息。',
    'register.terms.privacy5': '5. 您的权利：您有权随时访问、更新或删除您的个人信息。',
    'register.terms.privacy6': '6. Cookie：我们使用 Cookie 和类似的跟踪技术来跟踪我们服务上的活动并保存某些信息。',
    
    // Registration - Trial
    'register.trial.title': '恭喜！您将获得30天免费试用期',
    'register.trial.description': '试用期结束后可随时升级为正式版本',
    'register.trial.start': '开始使用',
    'register.trial.features': '免费试用功能：',
    'register.trial.feature1': '完整的POS系统访问权限',
    'register.trial.feature2': '无限制交易',
    'register.trial.feature3': '基础报表功能',
    'register.trial.feature4': '邮件支持',
    
    // Forgot Password
    'forgot.title': '重置密码',
    'forgot.description': '输入您的邮箱地址，我们将向您发送重置密码的链接',
    'forgot.email': '邮箱地址',
    'forgot.emailPlaceholder': '请输入您的邮箱',
    'forgot.sendLink': '发送重置链接',
    'forgot.backToLogin': '返回登录',
    'forgot.emailSent': '重置链接已发送',
    'forgot.checkEmail': '请检查您的邮箱并点击链接重置密码',
    'forgot.returnToLogin': '返回登录',
    
    // MFA (Multi-Factor Authentication)
    'mfa.title': '双因素认证',
    'mfa.description': '请验证您的身份以继续',
    'mfa.sms': '短信',
    'mfa.email': '邮箱',
    'mfa.totp': '验证器',
    'mfa.smsDescription': '验证码已发送至您的手机尾号 ••••89',
    'mfa.emailDescription': '验证码已发送至您的邮箱',
    'mfa.totpDescription': '请输入验证器应用中的6位数验证码',
    'mfa.verificationCode': '验证码',
    'mfa.enterCode': '请输入6位数验证码',
    'mfa.trustDevice': '信任此设备30天',
    'mfa.cancel': '取消',
    'mfa.verify': '验证',
    
    // Error Messages
    'error.fillAllFields': '请填写所有字段',
    'error.invalidCredentials': '邮箱或密码错误',
    'error.accountLocked': '账户已锁定，由于尝试次数过多。请30分钟后重试。',
    'error.accountLockedTitle': '账户已锁定',
    'error.accountLockedMessage': '您的账户由于多次登录失败已被临时锁定。请30分钟后重试或联系客服。',
    'error.completeCaptcha': '请完成验证码验证',
    'error.enterPhoneNumber': '请输入您的手机号码',
    'error.verificationIncorrect': '验证码错误',
    'error.emailRequired': '请输入邮箱地址',
    'error.emailInvalid': '请输入有效的邮箱地址',
    
    // Success Messages
    'success.codeSent': '验证码已发送',
    'success.loginSuccess': '登录成功',
    'success.registrationComplete': '注册完成',
    'success.passwordReset': '密码重置成功',
    
    // POS System
    'pos.dashboard': 'POS 系统仪表板',
    'pos.welcomeMessage': '欢迎使用 Sympol POS！',
    'pos.backToLogin': '返回登录',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
