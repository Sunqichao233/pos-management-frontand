import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Smartphone, Mail } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface MFAPopupProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function MFAPopup({ onSuccess, onCancel }: MFAPopupProps) {
  const { t } = useLanguage();
  const [mfaMethod, setMfaMethod] = useState<'sms' | 'email'>('sms');
  const [code, setCode] = useState('');
  const [trustDevice, setTrustDevice] = useState(false);

  const handleVerify = () => {
    if (code.length === 6) {
      onSuccess();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('mfa.title')}</DialogTitle>
          <DialogDescription>{t('mfa.description')}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Tabs value={mfaMethod} onValueChange={(value) => setMfaMethod(value as 'sms' | 'email')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sms" className="flex items-center gap-1">
                <Smartphone className="h-3 w-3" />
                {t('mfa.sms')}
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {t('mfa.email')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sms" className="space-y-4 mt-6">
              <p className="text-sm text-muted-foreground">
                {t('mfa.smsDescription')}
              </p>
            </TabsContent>
            
            <TabsContent value="email" className="space-y-4 mt-6">
              <p className="text-sm text-muted-foreground">
                {t('mfa.emailDescription')}
              </p>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="mfa-code">{t('mfa.verificationCode')}</Label>
            <Input 
              id="mfa-code"
              type="text" 
              placeholder={t('mfa.enterCode')}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="trust-device" 
              checked={trustDevice}
              onCheckedChange={(checked) => setTrustDevice(checked === true)}
            />
            <Label htmlFor="trust-device" className="text-sm">
              {t('mfa.trustDevice')}
            </Label>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              {t('mfa.cancel')}
            </Button>
            <Button 
              onClick={handleVerify} 
              className="flex-1 bg-primary text-primary-foreground hover:opacity-90"
              disabled={code.length !== 6}
            >
              {t('mfa.verify')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}