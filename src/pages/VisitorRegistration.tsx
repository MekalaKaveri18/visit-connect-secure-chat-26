
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import CameraCapture from "@/components/CameraCapture";
import { validateEmail, validateRequired } from "@/utils/validation";

const VisitorRegistration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    purpose: "",
    host: "",
    expectedDuration: "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // All fields are now mandatory
    const fullNameError = validateRequired(formData.fullName, "Full Name");
    if (fullNameError) newErrors.fullName = fullNameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validateRequired(formData.phone, "Phone Number");
    if (phoneError) newErrors.phone = phoneError;

    const companyError = validateRequired(formData.company, "Company/Organization");
    if (companyError) newErrors.company = companyError;

    const purposeError = validateRequired(formData.purpose, "Purpose of Visit");
    if (purposeError) newErrors.purpose = purposeError;

    const hostError = validateRequired(formData.host, "Host/Contact Person");
    if (hostError) newErrors.host = hostError;

    const durationError = validateRequired(formData.expectedDuration, "Expected Duration");
    if (durationError) newErrors.expectedDuration = durationError;

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
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Visitor registration completed successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Chatbot />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Card className="max-w-2xl mx-auto animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center space-x-2">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <span>Visitor Registration</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Please provide your details for verification and badge generation
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    required
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Enter your company name"
                  required
                  className={errors.company ? "border-red-500" : ""}
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Visit *</Label>
                <Select onValueChange={(value) => handleInputChange('purpose', value)}>
                  <SelectTrigger className={errors.purpose ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select visit purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Business Meeting</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="host">Host/Contact Person *</Label>
                  <Input
                    id="host"
                    value={formData.host}
                    onChange={(e) => handleInputChange('host', e.target.value)}
                    placeholder="Who are you visiting?"
                    required
                    className={errors.host ? "border-red-500" : ""}
                  />
                  {errors.host && <p className="text-red-500 text-sm">{errors.host}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expectedDuration">Expected Duration *</Label>
                  <Select onValueChange={(value) => handleInputChange('expectedDuration', value)}>
                    <SelectTrigger className={errors.expectedDuration ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30min">30 minutes</SelectItem>
                      <SelectItem value="1hour">1 hour</SelectItem>
                      <SelectItem value="2hours">2 hours</SelectItem>
                      <SelectItem value="halfday">Half day</SelectItem>
                      <SelectItem value="fullday">Full day</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.expectedDuration && <p className="text-red-500 text-sm">{errors.expectedDuration}</p>}
                </div>
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
                Complete Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisitorRegistration;
