
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, Download, QrCode, User, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const VisitorBadge = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [badgeData, setBadgeData] = useState({
    visitorId: "VIS-2024-001",
    issueDate: new Date().toLocaleDateString(),
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(),
    location: "Main Building",
    host: "John Smith",
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleDownloadBadge = () => {
    toast({
      title: "Badge Downloaded",
      description: "Your visitor badge has been downloaded successfully.",
    });
  };

  const handlePrintBadge = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "Please use your browser's print function to print the badge.",
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Chatbot />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Visitor Badge
            </h1>
            <p className="text-xl text-gray-600">
              Display this badge during your visit for identification
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Digital Badge */}
            <Card className="animate-fade-in print:shadow-none">
              <CardHeader className="text-center bg-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">VISITOR BADGE</CardTitle>
                <CardDescription className="text-blue-100">
                  Digital Identification Card
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8 text-center">
                <div className="space-y-6">
                  {/* Profile Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  {/* Badge Details */}
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium text-gray-700">Visitor ID:</span>
                      <span className="text-gray-900">{badgeData.visitorId}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium text-gray-700">Issue Date:</span>
                      <span className="text-gray-900">{badgeData.issueDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium text-gray-700">Valid Until:</span>
                      <span className="text-gray-900">{badgeData.validUntil}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium text-gray-700">Location:</span>
                      <span className="text-gray-900">{badgeData.location}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium text-gray-700">Host:</span>
                      <span className="text-gray-900">{badgeData.host}</span>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center">
                    <div className="w-32 h-32 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-400" />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Scan QR code for quick verification
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Badge Actions and Info */}
            <div className="space-y-6">
              
              {/* Actions Card */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Badge className="h-6 w-6 text-blue-600" />
                    <span>Badge Actions</span>
                  </CardTitle>
                  <CardDescription>
                    Download or print your visitor badge
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleDownloadBadge}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Badge (PDF)
                  </Button>
                  
                  <Button 
                    onClick={handlePrintBadge}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Print Badge
                  </Button>
                </CardContent>
              </Card>

              {/* Instructions Card */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Badge Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Badge className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Display Visibly:</strong> Keep your badge visible at all times during your visit
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <QrCode className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>QR Code:</strong> Present the QR code for quick scanning at checkpoints
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-orange-600" />
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Validity:</strong> Badge is valid only for the specified date and location
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Clock className="h-4 w-4 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Return:</strong> Digital badges automatically expire after your visit
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="border-yellow-200 bg-yellow-50 animate-fade-in">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-yellow-200 p-2 rounded-full">
                      <Badge className="h-4 w-4 text-yellow-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">Security Notice</h4>
                      <p className="text-sm text-yellow-700">
                        This badge contains secure identification information. Do not share or duplicate. 
                        Report any issues to security immediately.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorBadge;
