import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/Login";
import AuthGuard from "./components/AuthGuard";
import Index from "./pages/Index";
import BrandSelect from "./pages/BrandSelect";
import VendorList from "./pages/VendorList";
import NotFound from "./pages/NotFound";
import CatalogueView from "./pages/CatalogueView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
            <Route path="/category/:categoryId" element={<AuthGuard><BrandSelect /></AuthGuard>} />
            <Route path="/category/:categoryId/brand/:brandName" element={<AuthGuard><VendorList /></AuthGuard>} />
            <Route path="/catalogue/:brandId" element={<AuthGuard><CatalogueView /></AuthGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
