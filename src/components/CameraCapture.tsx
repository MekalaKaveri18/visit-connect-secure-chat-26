
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, RotateCcw } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  capturedImage?: string | null;
}

const CameraCapture = ({ onCapture, capturedImage }: CameraCaptureProps) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        onCapture(imageData);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsStreaming(false);
    }
  };

  const retakePhoto = () => {
    onCapture('');
    startCamera();
  };

  return (
    <div className="space-y-4">
      {!capturedImage && !isStreaming && (
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
          <Camera className="h-12 w-12 text-gray-400" />
        </div>
      )}
      
      {isStreaming && (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-32 h-32 rounded-full object-cover mx-auto"
          />
        </div>
      )}
      
      {capturedImage && (
        <div className="relative">
          <img
            src={capturedImage}
            alt="Captured"
            className="w-32 h-32 rounded-full object-cover mx-auto"
          />
        </div>
      )}
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <div className="flex justify-center space-x-2">
        {!isStreaming && !capturedImage && (
          <Button onClick={startCamera} className="bg-blue-600 hover:bg-blue-700">
            <Camera className="h-4 w-4 mr-2" />
            Start Camera
          </Button>
        )}
        
        {isStreaming && (
          <Button onClick={capturePhoto} className="bg-green-600 hover:bg-green-700">
            Capture Photo
          </Button>
        )}
        
        {capturedImage && (
          <Button onClick={retakePhoto} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake
          </Button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
