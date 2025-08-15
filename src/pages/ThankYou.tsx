import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MitsubishiLogo from "@/components/MitsubishiLogo";
import { CheckCircle, Clock, MapPin } from "lucide-react";
import moment from "moment";

const ThankYou = () => {
  const navigate = useNavigate();
  const [visitorData, setVisitorData] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Get stored visitor data
    const storedData = localStorage.getItem("visitorData");
    if (storedData) {
      setVisitorData(JSON.parse(storedData));
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNewRegistration = () => {
    localStorage.removeItem("visitorData");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center space-y-4">
          <MitsubishiLogo className="justify-center" />
          <div className="space-y-2">
            <CheckCircle className="w-16 h-16 text-primary mx-auto animate-pulse-slow" />
            <CardTitle className="text-2xl font-bold text-mitsubishi-gray">
              Registration Complete!
            </CardTitle>
            <p className="text-muted-foreground">
              Welcome to Mitsubishi Motors
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {visitorData && (
            <div className="bg-mitsubishi-red-light/10 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-mitsubishi-gray">
                Registration Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{visitorData.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{visitorData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employee ID:</span>
                  <span className="font-medium">{visitorData.employee_id}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-card rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-mitsubishi-gray flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Visit Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time:</span>
                <span className="font-medium">
                  {/* {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()} */}
                  {moment(visitorData?.created_at).format(
                    "DD MMM YYYY, HH:mm:ss"
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-primary">Registered</span>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-mitsubishi-red mt-0.5" />
              <div>
                <h4 className="font-medium text-mitsubishi-gray">Next Steps</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Please proceed to the reception desk. Our staff will assist
                  you shortly.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleNewRegistration}
            variant="secondary"
            className="w-full"
            size="lg"
          >
            Register Another Visitor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;