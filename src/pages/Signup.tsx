
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import CameraCapture from "@/components/CameraCapture";
import { validateStrongPassword, validateEmail, validateRequired } from "@/utils/validation";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    const requiredError = validateRequired(formData.firstName, "First Name");
    if (requiredError) newErrors.firstName = requiredError;

    const lastNameError = validateRequired(formData.lastName, "Last Name");
    if (lastNameError) newErrors.lastName = lastNameError;

    const mobileError = validateRequired(formData.mobile, "Mobile Number");
    if (mobileError) newErrors.mobile = mobileError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const userTypeError = validateRequired(formData.userType, "User Type");
    if (userTypeError) newErrors.userType = userTypeError;

    // Validate password strength
    const passwordError = validateStrongPassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Validate profile image
    if (!profileImage) {
      newErrors.profileImage = "Profile photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below and try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Account created successfully. Redirecting to login...",
    });

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Chatbot />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Card className="max-w-2xl mx-auto animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center space-x-2">
              <UserPlus className="h-8 w-8 text-blue-600" />
              <span>Create Account</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Join our visitor management system
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    required
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    required
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  placeholder="Enter your mobile number"
                  required
                  className={errors.mobile ? "border-red-500" : ""}
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a strong password"
                    required
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  <p className="text-xs text-gray-600">
                    At least 8 characters, 1 letter, 1 number, 1 special character
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">User Type *</Label>
                <Select onValueChange={(value) => handleInputChange('userType', value)}>
                  <SelectTrigger className={errors.userType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="visitor">Visitor</SelectItem>
                  </SelectContent>
                </Select>
                {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
              </div>

              <div className="space-y-4">
                <Label>Profile Photo *</Label>
                <CameraCapture 
                  onCapture={setProfileImage}
                  capturedImage={profileImage}
                />
                {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage}</p>}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                Create Account
              </Button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Button variant="link" onClick={() => navigate('/login')} className="p-0 text-blue-600">
                  Sign in here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
