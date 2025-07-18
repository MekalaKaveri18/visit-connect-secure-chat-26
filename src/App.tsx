
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import VisitorDashboard from "./pages/VisitorDashboard";
import FeedbackAnalysis from "./pages/FeedbackAnalysis";
import Blacklist from "./pages/Blacklist";
import VisitorRegistration from "./pages/VisitorRegistration";
import Feedback from "./pages/Feedback";
import CheckinCheckout from "./pages/CheckinCheckout";
import VisitorBadge from "./pages/VisitorBadge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/visitor-dashboard" element={<VisitorDashboard />} />
          <Route path="/feedback-analysis" element={<FeedbackAnalysis />} />
          <Route path="/blacklist" element={<Blacklist />} />
          <Route path="/visitor-registration" element={<VisitorRegistration />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/checkin-checkout" element={<CheckinCheckout />} />
          <Route path="/visitor-badge" element={<VisitorBadge />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
