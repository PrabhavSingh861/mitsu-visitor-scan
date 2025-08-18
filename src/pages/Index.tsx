import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MitsubishiLogo from '@/components/MitsubishiLogo';
import { QrCode, Users, Building2, Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleStartRegistration = () => {
    navigate('/register-form');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background border-b shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <MitsubishiLogo />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-mitsubishi-gray">
              Welcome to{" "}
              <span className="text-primary">
                Mitsubishi Electric Annual Dealer Meet 2025
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Secure and efficient visitor registration system. Register your
              visit with our QR code scanner or manual form entry.
            </p>
          </div>

          {/* Registration Card */}
          <Card className="max-w-md mx-auto shadow-mitsubishi bg-gradient-to-br from-background to-mitsubishi-red-light/5">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-mitsubishi-gray">
                Visitor Registration
              </CardTitle>
              <p className="text-muted-foreground">
                Quick and secure registration process
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleStartRegistration}
                variant="mitsubishi"
                size="lg"
                className="w-full"
              >
                Start Registration
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-mitsubishi-gray">
                QR Code Scanner
              </h3>
              <p className="text-muted-foreground">
                Fast registration using your mobile device camera
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-mitsubishi-gray">
                Secure Process
              </h3>
              <p className="text-muted-foreground">
                Your information is protected with enterprise-grade security
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-mitsubishi-gray">
                Professional Experience
              </h3>
              <p className="text-muted-foreground">
                Streamlined process for a professional visitor experience
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-mitsubishi-gray text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm opacity-90">
              © 2024 Mitsubishi Motors. All rights reserved.
            </p>
            <p className="text-xs opacity-75">Drive your Ambition</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
