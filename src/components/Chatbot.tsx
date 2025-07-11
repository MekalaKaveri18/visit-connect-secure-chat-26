
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('login') || message.includes('sign in')) {
      return "To login, click on the 'Login' button in the navbar and enter your email, password, and select your user type (Admin or Visitor).";
    }
    
    if (message.includes('sign up') || message.includes('register')) {
      return "To create an account, click 'Sign Up' and fill in your details including first name, last name, mobile, email, password, and user type. You can also capture your photo during registration.";
    }
    
    if (message.includes('admin') || message.includes('dashboard')) {
      return "Admin users have access to the dashboard, feedback analysis, blacklist management, and can monitor all visitor activities.";
    }
    
    if (message.includes('visitor') || message.includes('guest')) {
      return "Visitors can register, provide feedback, check-in/check-out, and generate visitor badges. The system provides a complete visitor management experience.";
    }
    
    if (message.includes('feedback')) {
      return "Our feedback system allows visitors to share their experience and helps administrators analyze visitor satisfaction to improve services.";
    }
    
    if (message.includes('check-in') || message.includes('checkout')) {
      return "The check-in/check-out feature allows visitors to digitally sign in when they arrive and sign out when they leave, providing real-time visitor tracking.";
    }
    
    if (message.includes('badge') || message.includes('id')) {
      return "Visitor badges are automatically generated upon registration and can be accessed through the visitor dashboard for identification purposes.";
    }
    
    if (message.includes('blacklist') || message.includes('security')) {
      return "The blacklist feature allows administrators to manage restricted visitors and enhance security by preventing unauthorized access.";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to the Visitor Management System. I can help you with login, registration, features, and navigation. What would you like to know?";
    }
    
    if (message.includes('help') || message.includes('support')) {
      return "I can help you with: Login/Registration, Admin features, Visitor features, Check-in/Check-out, Feedback system, and Security features. What specific topic interests you?";
    }
    
    return "I understand you're asking about our visitor management system. Could you please be more specific? I can help with login, registration, admin features, visitor features, or any other aspect of the system.";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    const botResponse: Message = {
      id: messages.length + 2,
      text: getBotResponse(inputMessage),
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, botResponse]);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        size="lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 h-[500px] shadow-2xl animate-scale-in">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>Virtual Assistant</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[280px] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="bg-blue-600 p-2 rounded-full">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
