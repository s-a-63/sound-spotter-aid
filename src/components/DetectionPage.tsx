import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, Video, Play, Square, Volume2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DetectionPageProps {
  onBack: () => void;
}

const DetectionPage = ({ onBack }: DetectionPageProps) => {
  const [activeMode, setActiveMode] = useState<'upload' | 'camera' | 'video' | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [detectionResults, setDetectionResults] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate detection results
      const mockResults = [
        "Vehicle detected: Car at 15 meters ahead",
        "Traffic light detected: Red light at intersection",
        "Zebra crossing detected: 8 meters to the right"
      ];
      setDetectionResults(mockResults);
      announceResults(mockResults);
      toast({
        title: "Image Analyzed",
        description: "Detection results are now available."
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate video processing
      const mockResults = [
        "Video analysis complete",
        "Multiple vehicles detected throughout video",
        "Traffic signals identified at 3 intersections",
        "Pedestrian pathway clear for 80% of route"
      ];
      setDetectionResults(mockResults);
      announceResults(mockResults);
      toast({
        title: "Video Processed",
        description: "Analysis complete. Results are ready."
      });
    }
  };

  const startCamera = () => {
    setActiveMode('camera');
    // Simulate camera detection
    const mockResults = [
      "Live camera active",
      "Scanning environment...",
      "Clear path ahead",
      "No immediate obstacles detected"
    ];
    setDetectionResults(mockResults);
    announceResults(mockResults);
    toast({
      title: "Camera Activated",
      description: "Live detection is now running."
    });
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
      announceResults(mockResults);
      toast({
        title: "Recording Complete",
        description: "Analysis results are ready."
      });
    }
  };

  const announceResults = (results: string[]) => {
    // Simulate text-to-speech
    const announcement = results.join(". ");
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(announcement);
      utterance.rate = 0.8;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearResults = () => {
    setDetectionResults([]);
    setActiveMode(null);
    setIsRecording(false);
  };

  return (
    <main className="min-h-screen bg-gradient-subtle p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">AI Detection Tool</h1>
          <Button variant="outline" onClick={onBack} aria-label="Return to main page">
            Back to Home
          </Button>
        </div>

        {/* Detection Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                aria-label="Select image file to analyze"
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
                className="w-full"
                onClick={startCamera}
                aria-label="Start live camera detection"
              >
                Start Camera
              </Button>
            </CardContent>
          </Card>

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
                aria-label="Select video file to analyze"
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
              <div className="space-y-3" role="region" aria-label="Detection results list">
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

              <div className="mt-6 flex gap-4">
                <Button 
                  variant="secondary"
                  onClick={() => announceResults(detectionResults)}
                  aria-label="Repeat audio announcements of detection results"
                >
                  <Volume2 className="h-4 w-4 mr-2" aria-hidden="true" />
                  Repeat Audio
                </Button>
                
                {activeMode === 'camera' && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      // Simulate refresh detection
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
                  <li>• Audio announcements are automatic</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Keyboard Shortcuts:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Space: Repeat last announcement</li>
                  <li>• R: Refresh detection</li>
                  <li>• C: Clear results</li>
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