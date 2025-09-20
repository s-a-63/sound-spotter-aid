import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, Video, Play, Square, Volume2, AlertCircle } from "lucide-react";

interface DetectionPageProps {
  onBack: () => void;
}

const DetectionPage = ({ onBack }: DetectionPageProps) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'camera' | 'video' | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [detectionResults, setDetectionResults] = useState<string[]>([]);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Clean up uploaded video URL when component unmounts or uploadedVideo changes
  useEffect(() => {
    return () => {
      if (uploadedVideo) {
        URL.revokeObjectURL(uploadedVideo);
      }
    };
  }, [uploadedVideo]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Clear uploaded video if any
      if (uploadedVideo) {
        URL.revokeObjectURL(uploadedVideo);
        setUploadedVideo(null);
      }

      const mockResults = [
        "Vehicle detected: Car at 15 meters ahead",
        "Traffic light detected: Red light at intersection",
        "Zebra crossing detected: 8 meters to the right"
      ];
      setDetectionResults(mockResults);
      setActiveMode('upload');
      toast({
        title: "Image Analyzed",
        description: "Detection results are now available."
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous video URL if exists
      if (uploadedVideo) {
        URL.revokeObjectURL(uploadedVideo);
      }
      const videoUrl = URL.createObjectURL(file);
      setUploadedVideo(videoUrl);
      setActiveMode("video");
      setDetectionResults([
        "Video analysis complete",
        "Multiple vehicles detected throughout video",
        "Traffic signals identified at 3 intersections",
        "Pedestrian pathway clear for 80% of route"
      ]);
      toast({
        title: "Video Processed",
        description: "Analysis complete. Results are ready."
      });
    }
  };

  const startCamera = async () => {
    setActiveMode('camera');
    setDetectionResults([
      "Live camera active",
      "Scanning environment...",
      "Clear path ahead",
      "No immediate obstacles detected"
    ]);
    toast({
      title: "Camera Activated",
      description: "Live detection is now running."
    });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Camera access error:", error);
      toast({
        title: "Camera Access Failed",
        description: "Unable to access your device camera.",
        variant: "destructive"
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording Started",
        description: "Live video recording and analysis active."
      });
    } else {
      const mockResults = [
        "Recording stopped and analyzed",
        "Journey summary: 2 vehicles encountered",
        "1 traffic light (green) at main intersection",
        "Safe pedestrian crossing available"
      ];
      setDetectionResults(mockResults);
      toast({
        title: "Recording Complete",
        description: "Analysis results are ready."
      });
    }
  };

  const announceResults = (results: string[]) => {
    const announcement = results.join(". ");
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(announcement);
      utterance.rate = 0.8;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const clearResults = () => {
    setDetectionResults([]);
    setActiveMode(null);
    setIsRecording(false);

    // Stop camera stream if active
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    // Revoke and clear uploaded video URL
    if (uploadedVideo) {
      URL.revokeObjectURL(uploadedVideo);
      setUploadedVideo(null);
    }

    // Clear video input value so same file can be re-uploaded if needed
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-subtle p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">AI Detection Tool</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={onBack} aria-label="Return to main page">
              Back to Home
            </Button>
            <Button variant="destructive" onClick={() => window.location.href = "/"} aria-label="Logout and return to landing page">
              Logout
            </Button>
          </div>
        </div>


        {/* Detection Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Upload Image */}
          <Card className="shadow-card hover:shadow-accessible transition-shadow">
            <CardHeader>
              <Upload className="h-8 w-8 text-secondary mb-2" aria-hidden="true" />
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Analyze a photo to detect vehicles, traffic signs, and obstacles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button 
                variant="accessible" 
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Choose image file for analysis"
              >
                Choose Image
              </Button>
            </CardContent>
          </Card>

          {/* Live Camera */}
          <Card className="shadow-card hover:shadow-accessible transition-shadow">
            <CardHeader>
              <Camera className="h-8 w-8 text-secondary mb-2" aria-hidden="true" />
              <CardTitle>Live Camera</CardTitle>
              <CardDescription>
                Real-time detection using your device's camera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="accessible" 
                className="w-full mt-5"
                onClick={startCamera}
                aria-label="Start live camera detection"
              >
                Start Camera
              </Button>
            </CardContent>
          </Card>

          {/* Video Analysis */}
          <Card className="shadow-card hover:shadow-accessible transition-shadow">
            <CardHeader>
              <Video className="h-8 w-8 text-secondary mb-2" aria-hidden="true" />
              <CardTitle>Video Analysis</CardTitle>
              <CardDescription>
                Upload or record video for detailed route analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => videoInputRef.current?.click()}
                aria-label="Upload video file for analysis"
              >
                Upload Video
              </Button>
              <Button 
                variant={isRecording ? "destructive" : "accessible"}
                className="w-full"
                onClick={toggleRecording}
                aria-label={isRecording ? "Stop recording video" : "Start recording video"}
              >
                {isRecording ? (
                  <>
                    <Square className="h-4 w-4 mr-2" aria-hidden="true" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" aria-hidden="true" />
                    Record Video
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detection Results */}
        {detectionResults.length > 0 && (
          <Card className="shadow-accessible bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-6 w-6 text-secondary" aria-hidden="true" />
                  Detection Results
                </CardTitle>
                <CardDescription>
                  Audio announcements and visual analysis of your environment
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={clearResults}
                aria-label="Clear all detection results"
              >
                Clear Results
              </Button>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Video Preview */}
                <div className="md:w-1/2 w-full">
                  {activeMode === "camera" && (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full rounded-lg shadow-md"
                      aria-label="Live camera feed"
                    />
                  )}

                  {activeMode === "video" && uploadedVideo && (
                    <video
                      src={uploadedVideo}
                      controls
                      className="w-full rounded-lg shadow-md"
                      aria-label="Uploaded video preview"
                    />
                  )}
                </div>

                {/* Detection Result List */}
                <div className="md:w-1/2 w-full space-y-3" role="region" aria-label="Detection results list">
                  {detectionResults.map((result, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-4 bg-muted rounded-lg"
                      role="listitem"
                    >
                      <AlertCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <p className="text-base font-medium">{result}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4 flex-wrap">
                <Button 
                  variant="secondary"
                  onClick={() => announceResults(detectionResults)}
                  aria-label="Play audio announcements of detection results"
                >
                  <Volume2 className="h-4 w-4 mr-2" aria-hidden="true" />
                  Listen to Audio
                </Button>
                <Button 
                  variant="outline"
                  onClick={stopAudio}
                  aria-label="Stop audio announcements"
                >
                  Stop Audio
                </Button>

                {activeMode === 'camera' && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const newResults = [
                        "Environment rescanned",
                        "Updated: Vehicle approaching from left",
                        "Traffic light changed to green",
                        "Safe to proceed"
                      ];
                      setDetectionResults(newResults);
                      announceResults(newResults);
                    }}
                    aria-label="Refresh camera detection"
                  >
                    Refresh Detection
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Quick Tips:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Hold device steady for best results</li>
                  <li>• Ensure good lighting conditions</li>
                  <li>• Audio announcements play only when requested</li>
                </ul>
              </div>
              
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DetectionPage;
