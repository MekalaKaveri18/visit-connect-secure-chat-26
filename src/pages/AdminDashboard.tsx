
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, MessageSquare, Shield, TrendingUp, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.userType !== 'admin') {
      navigate('/visitor-dashboard');
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  const stats = [
    {
      title: "Total Visitors Today",
      value: "142",
      description: "+12% from yesterday",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Check-ins",
      value: "28",
      description: "Currently on premises",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Feedback Score",
      value: "4.8",
      description: "Average rating this week",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Security Alerts",
      value: "3",
      description: "Requiring attention",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-100",
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
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Here's what's happening with your visitor management system today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer animate-fade-in" onClick={() => navigate('/feedback-analysis')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Feedback Analysis</span>
              </CardTitle>
              <CardDescription>
                Review and analyze visitor feedback to improve services
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer animate-fade-in" onClick={() => navigate('/blacklist')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>Security Management</span>
              </CardTitle>
              <CardDescription>
                Manage blacklisted visitors and security settings
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Reports & Analytics</span>
              </CardTitle>
              <CardDescription>
                Generate detailed reports on visitor patterns
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest visitor check-ins and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "10 minutes ago", event: "John Doe checked in at Reception", type: "checkin" },
                { time: "25 minutes ago", event: "New feedback received - 5 stars", type: "feedback" },
                { time: "1 hour ago", event: "Security alert resolved", type: "security" },
                { time: "2 hours ago", event: "Sarah Johnson checked out", type: "checkout" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'checkin' ? 'bg-green-500' :
                    activity.type === 'feedback' ? 'bg-blue-500' :
                    activity.type === 'security' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
