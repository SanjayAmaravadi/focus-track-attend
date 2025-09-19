import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Smart Attendance Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            GPS + Wi-Fi verified attendance with focus mode for distraction-free learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">For Students</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Join classes with unique codes</li>
                <li>• GPS + Wi-Fi location verification</li>
                <li>• Focus mode prevents distractions</li>
                <li>• Real-time attendance tracking</li>
              </ul>
              <Link to="/signup" className="block">
                <Button className="w-full">Get Started as Student</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">For Faculty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Generate unique session codes</li>
                <li>• Set geofence radius and duration</li>
                <li>• Real-time student monitoring</li>
                <li>• Export attendance reports</li>
              </ul>
              <Link to="/signup" className="block">
                <Button className="w-full">Get Started as Faculty</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Already have an account?
          </p>
          <Link to="/login">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
