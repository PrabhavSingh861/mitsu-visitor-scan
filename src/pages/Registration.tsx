import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import VisitorForm from "@/components/VisitorForm";
import QRScanner from "@/components/QRScanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MitsubishiLogo from "@/components/MitsubishiLogo";
import { QrCode } from "lucide-react";

type VisitorData = {
  name: string;
  email: string;
  phone: string;
  employeeId: string;
};

const Registration = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if coming from QR code
  const fromQr = searchParams.get("qr") === "true";

  const handleQRScanSuccess = (result: string) => {
    // In a real app, you might parse the QR code data
    console.log("QR Scan Result:", result);
    setShowForm(true);
    setShowScanner(false);
  };

  const handleFormSubmit = (data: VisitorData) => {
    // Store visitor data (in real app, send to API)
    localStorage.setItem("visitorData", JSON.stringify(data));
    navigate("/thank-you");
  };

  // If coming from QR code, show form directly
  if (fromQr || showForm) {
    navigate("/register-form");
    // return <VisitorForm
    //   // onSubmit={handleFormSubmit}
    //   />;
  }

  // Show scanner if requested
  if (showScanner) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center">
            <MitsubishiLogo className="justify-center mb-4" />
            <h1 className="text-2xl font-bold text-mitsubishi-gray mb-2">
              Scan QR Code
            </h1>
            <p className="text-muted-foreground">
              Point your camera at the QR code to begin registration
            </p>
          </div>

          <QRScanner onScanSuccess={handleQRScanSuccess} />

          <Button
            variant="secondary"
            onClick={() => setShowScanner(false)}
            className="w-full"
          >
            Back to Options
          </Button>
        </div>
      </div>
    );
  }

  // Main registration options page
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center space-y-4">
          <MitsubishiLogo className="justify-center" />
          <CardTitle className="text-2xl font-bold text-mitsubishi-gray">
            Visitor Registration
          </CardTitle>
          <p className="text-muted-foreground">
            Welcome to Mitsubishi Motors. Please choose how you'd like to
            register.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => setShowScanner(true)}
            variant="mitsubishi"
            className="w-full"
            size="lg"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Scan QR Code
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={() => setShowForm(true)}
            className="w-full"
            size="lg"
          >
            Register Manually
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
