
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const Feedback = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [categories, setCategories] = useState({
    serviceQuality: 0,
    facilities: 0,
    staff: 0,
    checkinProcess: 0,
  });

  const handleCategoryRating = (category: string, value: number) => {
    setCategories(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please provide an overall rating.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you!",
      description: "Your feedback has been submitted successfully.",
    });

    // Reset form
    setRating(0);
    setFeedback("");
    setCategories({
      serviceQuality: 0,
      facilities: 0,
      staff: 0,
      checkinProcess: 0,
    });
  };

  const StarRating = ({ 
    value, 
    onChange, 
    onHover, 
    size = "h-6 w-6" 
  }: { 
    value: number; 
    onChange: (value: number) => void; 
    onHover?: (value: number) => void;
    size?: string;
  }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} cursor-pointer transition-colors ${
            star <= (onHover ? hoveredRating : value)
              ? 'text-yellow-500 fill-current'
              : 'text-gray-300 hover:text-yellow-400'
          }`}
          onClick={() => onChange(star)}
          onMouseEnter={() => onHover && setHoveredRating(star)}
          onMouseLeave={() => onHover && setHoveredRating(0)}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Chatbot />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Card className="max-w-2xl mx-auto animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span>Share Your Feedback</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Help us improve our services by sharing your experience
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Overall Rating */}
              <div className="text-center space-y-4">
                <Label className="text-lg font-semibold">Overall Experience</Label>
                <div className="flex justify-center">
                  <StarRating
                    value={rating}
                    onChange={setRating}
                    onHover={setHoveredRating}
                    size="h-8 w-8"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {rating === 0 && "Click to rate your overall experience"}
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              </div>

              {/* Category Ratings */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Rate specific aspects:</h3>
                
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Service Quality</Label>
                    <StarRating
                      value={categories.serviceQuality}
                      onChange={(value) => handleCategoryRating('serviceQuality', value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Facilities</Label>
                    <StarRating
                      value={categories.facilities}
                      onChange={(value) => handleCategoryRating('facilities', value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Staff Friendliness</Label>
                    <StarRating
                      value={categories.staff}
                      onChange={(value) => handleCategoryRating('staff', value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Check-in Process</Label>
                    <StarRating
                      value={categories.checkinProcess}
                      onChange={(value) => handleCategoryRating('checkinProcess', value)}
                    />
                  </div>
                </div>
              </div>

              {/* Written Feedback */}
              <div className="space-y-2">
                <Label htmlFor="feedback" className="text-base font-semibold">
                  Additional Comments
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Please share any specific feedback, suggestions, or comments about your visit..."
                  rows={5}
                  className="resize-none"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                <Send className="h-5 w-5 mr-2" />
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;
