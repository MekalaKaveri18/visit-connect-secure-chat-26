
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Star, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const FeedbackAnalysis = () => {
  const feedbackData = [
    { category: "Service Quality", rating: 4.8, responses: 142 },
    { category: "Facilities", rating: 4.6, responses: 138 },
    { category: "Staff Friendliness", rating: 4.9, responses: 145 },
    { category: "Check-in Process", rating: 4.5, responses: 140 },
  ];

  const recentFeedback = [
    { 
      rating: 5, 
      comment: "Excellent service and very professional staff. The check-in process was quick and efficient.",
      date: "March 16, 2024",
      visitor: "John D."
    },
    { 
      rating: 4, 
      comment: "Good facilities but could improve the waiting area comfort.",
      date: "March 15, 2024",
      visitor: "Sarah M."
    },
    { 
      rating: 5, 
      comment: "Outstanding experience! Everything was well organized.",
      date: "March 15, 2024",
      visitor: "Robert K."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Chatbot />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Feedback Analysis
          </h1>
          <p className="text-xl text-gray-600">
            Insights from visitor feedback to improve your services
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7</div>
              <p className="text-xs text-muted-foreground">+0.2 from last month</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">565</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">4+ star ratings</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">Visitors who responded</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>Feedback by Category</CardTitle>
            <CardDescription>Average ratings across different service areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{item.category}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">{item.rating}</span>
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(item.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{item.responses} responses</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest comments from visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentFeedback.map((feedback, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < feedback.rating 
                                ? 'text-yellow-500 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium text-gray-900">{feedback.visitor}</span>
                    </div>
                    <span className="text-sm text-gray-500">{feedback.date}</span>
                  </div>
                  <p className="text-gray-700 italic">"{feedback.comment}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackAnalysis;
