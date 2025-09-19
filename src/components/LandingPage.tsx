import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Video, Volume2, Car, TrafficCone, Eye } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <main className="min-h-screen bg-gradient-subtle">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div id="main-content" className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16" aria-labelledby="hero-heading">
          <div className="max-w-4xl mx-auto">
            <h1 id="hero-heading" className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text ">
              AI-Powered Assistive Mobility Tool
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Navigate the world with confidence. Our AI technology detects vehicles, traffic lights, 
              zebra crossings, and obstacles, providing real-time audio guidance for visually impaired users.
            </p>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onGetStarted}
              aria-label="Get started with AI assistive mobility tool"
              className="mb-8"
            >
              Get Started <Eye className="ml-3 h-6 w-6" aria-hidden="true" />
            </Button>
            <p className="text-muted-foreground">
              Free to use • No installation required • Works on any device
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-4xl font-bold text-center mb-12">
            Powerful Features for Enhanced Mobility
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-accessible transition-shadow">
              <CardHeader>
                <Volume2 className="h-12 w-12 text-secondary mb-4" aria-hidden="true" />
                <CardTitle className="text-xl">Real-Time Audio Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Instant voice announcements for detected objects, traffic signals, and navigation hazards 
                  with clear, natural speech synthesis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-accessible transition-shadow">
              <CardHeader>
                <Car className="h-12 w-12 text-secondary mb-4" aria-hidden="true" />
                <CardTitle className="text-xl">Vehicle Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Advanced AI identifies cars, buses, motorcycles, and other vehicles with precise 
                  distance estimation and movement tracking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-accessible transition-shadow">
              <CardHeader>
                <TrafficCone className="h-12 w-12 text-secondary mb-4" aria-hidden="true" />
                <CardTitle className="text-xl">Traffic Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Recognizes traffic lights, zebra crossings, sidewalks, and construction zones 
                  for safer pedestrian navigation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-accessible transition-shadow">
              <CardHeader>
                <Camera className="h-12 w-12 text-secondary mb-4" aria-hidden="true" />
                <CardTitle className="text-xl">Live Camera Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Real-time processing of camera input for continuous environmental awareness 
                  and immediate hazard detection.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-accessible transition-shadow">
              <CardHeader>
                <Upload className="h-12 w-12 text-secondary mb-4" aria-hidden="true" />
                <CardTitle className="text-xl">Image Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Upload photos to analyze environments before visiting, perfect for route planning 
                  and familiarizing with new locations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-accessible transition-shadow">
              <CardHeader>
                <Video className="h-12 w-12 text-secondary mb-4" aria-hidden="true" />
                <CardTitle className="text-xl">Video Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Analyze recorded videos frame by frame to understand complex traffic scenarios 
                  and practice navigation routes safely.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16" aria-labelledby="how-it-works-heading">
          <h2 id="how-it-works-heading" className="text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Capture Your Environment</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Use your device's camera for live detection, upload an existing photo, or record a video 
                  of your surroundings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our advanced computer vision AI processes the visual data to identify vehicles, 
                  traffic infrastructure, and potential hazards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Audio Guidance</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Receive clear, immediate audio descriptions of detected objects and their positions 
                  to make informed navigation decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-card rounded-2xl p-12 shadow-card" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-3xl font-bold mb-4">
            Ready to Navigate with Confidence?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who trust our AI-powered mobility assistance.
          </p>
          <Button 
            variant="accessible" 
            size="lg" 
            onClick={onGetStarted}
            aria-label="Start using the AI assistive mobility tool now"
          >
            Start Now - It's Free
          </Button>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;