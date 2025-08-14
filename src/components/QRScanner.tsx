import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, CameraOff } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (result: string) => void;
}

const QRScanner = ({ onScanSuccess }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    return () => {
      if (qrScanner) {
        qrScanner.destroy();
      }
    };
  }, [qrScanner]);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      setError('');
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          onScanSuccess(result.data);
          stopScanning();
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
        }
      );

      await scanner.start();
      setQrScanner(scanner);
      setIsScanning(true);
    } catch (err) {
      setError('Failed to start camera. Please allow camera access.');
      console.error('QR Scanner error:', err);
    }
  };

  const stopScanning = () => {
    if (qrScanner) {
      qrScanner.stop();
      qrScanner.destroy();
      setQrScanner(null);
    }
    setIsScanning(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-elegant">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-mitsubishi-gray">
          <Camera className="w-5 h-5" />
          QR Code Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <video
            ref={videoRef}
            className={`w-full h-64 bg-muted rounded-lg ${!isScanning ? 'hidden' : ''}`}
          />
          {!isScanning && (
            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
              <Camera className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-destructive text-sm text-center">{error}</p>
        )}
        
        <div className="flex gap-2">
          {!isScanning ? (
            <Button 
              onClick={startScanning} 
              className="flex-1"
              variant="default"
            >
              <Camera className="w-4 h-4 mr-2" />
              Start Scanning
            </Button>
          ) : (
            <Button 
              onClick={stopScanning} 
              variant="secondary"
              className="flex-1"
            >
              <CameraOff className="w-4 h-4 mr-2" />
              Stop Scanning
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;