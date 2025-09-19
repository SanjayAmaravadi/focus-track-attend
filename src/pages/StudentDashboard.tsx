import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const StudentDashboard = () => {
  const { currentUser, userRole, logout } = useAuth();
  const [classCode, setClassCode] = useState('');
  const [activeSession, setActiveSession] = useState<any>(null);
  const [focusMode, setFocusMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!currentUser || userRole !== 'student') {
      navigate('/login');
    }
  }, [currentUser, userRole, navigate]);

  const handleJoinClass = async () => {
    if (!classCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a class code",
        variant: "destructive"
      });
      return;
    }

    // Simulate joining class - in real implementation, this would verify the code with Firebase
    setActiveSession({
      code: classCode,
      facultyName: "Dr. Smith",
      subject: "Computer Science",
      startTime: new Date(),
      duration: 60 // minutes
    });
    setFocusMode(true);
    setClassCode('');
    
    toast({
      title: "Success",
      description: "Joined class successfully! Focus mode activated."
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive"
      });
    }
  };

  if (focusMode && activeSession) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <Card className="border-green-500">
            <CardHeader className="text-center">
              <CardTitle className="text-green-600">Focus Mode Active</CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Class in Session
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">{activeSession.subject}</h3>
                <p className="text-muted-foreground">Faculty: {activeSession.facultyName}</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">45:30</div>
                <p className="text-sm text-muted-foreground">Time Remaining</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>GPS Status:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Wi-Fi Status:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Connected
                  </Badge>
                </div>
              </div>

              <Button 
                onClick={() => {
                  setFocusMode(false);
                  setActiveSession(null);
                }}
                variant="outline"
                className="w-full"
              >
                Exit Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Join Class Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="classCode">Class Code</Label>
                <Input
                  id="classCode"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-digit class code"
                  maxLength={6}
                />
              </div>
              <Button onClick={handleJoinClass} className="w-full">
                Join Class
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                No active sessions. Enter a class code to join.
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Computer Science - CS101</p>
                    <p className="text-sm text-muted-foreground">March 15, 2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Present</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Mathematics - MATH201</p>
                    <p className="text-sm text-muted-foreground">March 14, 2024</p>
                  </div>
                  <Badge variant="secondary">Absent</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;