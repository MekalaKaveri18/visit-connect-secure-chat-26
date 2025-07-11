
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, MessageSquare, Clipboard, Badge, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const VisitorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.userType !== 'visitor') {
      navigate('/admin-dashboard');
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  const quickActions = [
    {
      title: "Visitor Registration",
      description: "Register for your visit and get verified",
      icon: UserCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      path: "/visitor-registration",
    },
    {
      title: "Check-in/Check-out",
      description: "Manage your visit status",
      icon: Clipboard,
      color: "text-green-600",
      bgColor: "bg-green-100",
      path: "/checkin-checkout",
    },
    {
      title: "Share Feedback",
      description: "Help us improve our services",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      path: "/feedback",
    },
    {
      title: "Get Visitor Badge",
      description: "Download your digital visitor badge",
      icon: Badge,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      path: "/visitor-badge",
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Chatbot />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, {user.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Manage your visit and access all visitor services from here.
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-6 w-6" />
              <span>Visit Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm opacity-90">Current Status</p>
                <p className="text-lg font-semibold">Not Checked In</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-90">Last Visit</p>
                <p className="text-lg font-semibold">March 15, 2024</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-90">Total Visits</p>
                <p className="text-lg font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow cursor-pointer animate-fade-in"
              onClick={() => navigate(action.path)}
            >
              <CardHeader className="text-center">
                <div className={`mx-auto p-4 rounded-full ${action.bgColor} w-fit`}>
                  <action.icon className={`h-8 w-8 ${action.color}`} />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription className="text-sm">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="w-full">
                  Access
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Upcoming Visits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-gray-900">Meeting with John Smith</p>
                  <p className="text-sm text-gray-600">Tomorrow at 2:00 PM</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">Conference Room A</p>
                  <p className="text-sm text-gray-600">March 20 at 10:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <span>Recent Feedback</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-gray-900">5 Star Rating</p>
                  <p className="text-sm text-gray-600">Great service and facilities</p>
                  <p className="text-xs text-gray-500">March 15, 2024</p>
                </div>
                <div className="text-center text-gray-500">
                  <Button variant="link" onClick={() => navigate('/feedback')}>
                    Share New Feedback
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VisitorDashboard;
