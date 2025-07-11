
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut, Home, BarChart3, MessageSquare, Shield, UserCheck, Clipboard, Badge } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; userType: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const getNavItems = () => {
    if (!user) {
      return [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Login', path: '/login', icon: User },
        { name: 'Sign Up', path: '/signup', icon: UserCheck },
      ];
    }

    if (user.userType === 'admin') {
      return [
        { name: 'Home', path: '/admin-dashboard', icon: Home },
        { name: 'Dashboard', path: '/admin-dashboard', icon: BarChart3 },
        { name: 'Feedback Analysis', path: '/feedback-analysis', icon: MessageSquare },
        { name: 'Blacklist', path: '/blacklist', icon: Shield },
      ];
    } else {
      return [
        { name: 'Home', path: '/visitor-dashboard', icon: Home },
        { name: 'Visitor Registration', path: '/visitor-registration', icon: UserCheck },
        { name: 'Feedback', path: '/feedback', icon: MessageSquare },
        { name: 'Check-in/Check-out', path: '/checkin-checkout', icon: Clipboard },
        { name: 'Visitor Badge', path: '/visitor-badge', icon: Badge },
      ];
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <UserCheck className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">VisitorMS</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {getNavItems().map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{user.name}</span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
