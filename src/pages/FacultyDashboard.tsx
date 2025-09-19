import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const FacultyDashboard = () => {
  const { currentUser, userRole, logout } = useAuth();
  const [sessionData, setSessionData] = useState({
    class: '',
    thresholdTime: '15',
    radius: '50'
  });
  const [activeSession, setActiveSession] = useState<any>(null);
  const [sessionCode, setSessionCode] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!currentUser || userRole !== 'faculty') {
      navigate('/login');
    }
  }, [currentUser, userRole, navigate]);

  const generateSessionCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const startSession = () => {
    if (!sessionData.class) {
      toast({
        title: "Error",
        description: "Please select a class",
        variant: "destructive"
      });
      return;
    }

    const code = generateSessionCode();
    setSessionCode(code);
    setActiveSession({
      ...sessionData,
      code,
      startTime: new Date(),
      students: []
    });

    toast({
      title: "Session Started",
      description: `Class code: ${code}`
    });
  };

  const stopSession = () => {
    setActiveSession(null);
    setSessionCode('');
    toast({
      title: "Session Ended",
      description: "Attendance session has been stopped"
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

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Session Controls */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeSession ? 'Active Session' : 'Start New Session'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!activeSession ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="class">Select Class</Label>
                      <Select 
                        value={sessionData.class} 
                        onValueChange={(value) => 
                          setSessionData({...sessionData, class: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CS101">Computer Science - CS101</SelectItem>
                          <SelectItem value="MATH201">Mathematics - MATH201</SelectItem>
                          <SelectItem value="PHY301">Physics - PHY301</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="threshold">Threshold Time (minutes)</Label>
                        <Input
                          id="threshold"
                          type="number"
                          value={sessionData.thresholdTime}
                          onChange={(e) => 
                            setSessionData({...sessionData, thresholdTime: e.target.value})
                          }
                          min="1"
                          max="180"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="radius">Geofence Radius (meters)</Label>
                        <Input
                          id="radius"
                          type="number"
                          value={sessionData.radius}
                          onChange={(e) => 
                            setSessionData({...sessionData, radius: e.target.value})
                          }
                          min="10"
                          max="500"
                        />
                      </div>
                    </div>

                    <Button onClick={startSession} className="w-full">
                      Start Session
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="text-center space-y-2">
                      <div className="text-4xl font-bold text-primary">{sessionCode}</div>
                      <p className="text-muted-foreground">Share this code with students</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">45:30</div>
                        <p className="text-sm text-muted-foreground">Time Elapsed</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-sm text-muted-foreground">Students Joined</p>
                      </div>
                    </div>

                    <Button onClick={stopSession} variant="destructive" className="w-full">
                      Stop Session
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Live Attendance */}
            {activeSession && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Live Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "John Doe", rollNo: "CS2021001", status: "Present", distance: "15m" },
                      { name: "Jane Smith", rollNo: "CS2021002", status: "Present", distance: "8m" },
                      { name: "Bob Johnson", rollNo: "CS2021003", status: "Absent", distance: "-" },
                    ].map((student, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm">{student.distance}</span>
                          <Badge 
                            variant={student.status === "Present" ? "default" : "secondary"}
                            className={student.status === "Present" ? "bg-green-100 text-green-800" : ""}
                          >
                            {student.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Session Info & Recent Sessions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Info</CardTitle>
              </CardHeader>
              <CardContent>
                {activeSession ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Class:</span>
                      <span className="font-medium">{activeSession.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Threshold:</span>
                      <span className="font-medium">{activeSession.thresholdTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Radius:</span>
                      <span className="font-medium">{activeSession.radius}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No active session
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium">CS101 - March 15</p>
                    <p className="text-sm text-muted-foreground">18/20 present</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium">MATH201 - March 14</p>
                    <p className="text-sm text-muted-foreground">22/25 present</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;