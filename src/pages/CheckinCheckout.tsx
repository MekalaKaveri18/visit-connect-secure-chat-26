
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, MapPin, LogIn, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const CheckinCheckout = () => {
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkinTime, setCheckinTime] = useState<Date | null>(null);
  const [location, setLocation] = useState("");

  const handleCheckin = () => {
    if (!location.trim()) {
      toast({
        title: "Error",
        description: "Please specify your location.",
        variant: "destructive",
      });
      return;
    }

    const now = new Date();
    setCheckinTime(now);
    setIsCheckedIn(true);
    
    toast({
      title: "Checked In Successfully!",
      description: `Welcome! You've checked in at ${location} at ${now.toLocaleTimeString()}`,
    });
  };

  const handleCheckout = () => {
    const now = new Date();
    const duration = checkinTime ? 
      Math.round((now.getTime() - checkinTime.getTime()) / (1000 * 60)) : 0;

    setIsCheckedIn(false);
    setCheckinTime(null);
    setLocation("");
    
    toast({
      title: "Checked Out Successfully!",
      description: `Thank you for your visit! Duration: ${duration} minutes`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Chatbot />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Status Card */}
          <Card className={`animate-fade-in ${isCheckedIn ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold flex items-center justify-center space-x-2">
                {isCheckedIn ? (
                  <>
                    <LogIn className="h-8 w-8 text-green-600" />
                    <span className="text-green-700">Checked In</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-8 w-8 text-blue-600" />
                    <span className="text-blue-700">Ready to Check In</span>
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-lg">
                {isCheckedIn ? 
                  `You're currently at ${location} since ${checkinTime?.toLocaleTimeString()}` :
                  "Please check in to start your visit"
                }
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Check-in Form */}
          {!isCheckedIn ? (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LogIn className="h-6 w-6 text-blue-600" />
                  <span>Check In</span>
                </CardTitle>
                <CardDescription>
                  Start your visit by checking in at your current location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Current Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Reception, Conference Room A, Building 2"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Check-in Information</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Your check-in time will be recorded</li>
                    <li>• Security will be notified of your arrival</li>
                    <li>• Remember to check out when leaving</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={handleCheckin}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Check In Now
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Check-out Card */
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LogOut className="h-6 w-6 text-red-600" />
                  <span>Check Out</span>
                </CardTitle>
                <CardDescription>
                  Complete your visit by checking out
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Current Visit Details</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p><strong>Location:</strong> {location}</p>
                    <p><strong>Check-in Time:</strong> {checkinTime?.toLocaleString()}</p>
                    <p><strong>Duration:</strong> {
                      checkinTime ? 
                        Math.round((new Date().getTime() - checkinTime.getTime()) / (1000 * 60)) : 0
                    } minutes</p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  variant="destructive"
                  className="w-full py-3 text-lg"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Check Out Now
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="p-4 h-auto flex flex-col space-y-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <span>Visit History</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex flex-col space-y-2">
                  <MapPin className="h-6 w-6 text-green-600" />
                  <span>Building Map</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckinCheckout;
