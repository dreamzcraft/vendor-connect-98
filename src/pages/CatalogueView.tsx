import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const CatalogueView = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const [brand, setBrand] = useState<{ name: string; catalogue_url: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("brands")
        .select("name, catalogue_url")
        .eq("id", brandId!)
        .single();
      setBrand(data);
      setLoading(false);
    };
    fetch();
  }, [brandId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!brand || !brand.catalogue_url) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-display font-bold text-foreground">No catalogue available</h1>
          <button onClick={() => navigate(-1)} className="mt-4 text-primary hover:underline text-sm">Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="font-display text-lg font-bold text-foreground">{brand.name} — Catalogue</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="outline" size="icon" onClick={() => setZoom((z) => Math.min(3, z + 0.25))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex justify-center overflow-auto">
        <img
          src={brand.catalogue_url}
          alt={`${brand.name} Catalogue`}
          className="max-w-full rounded-lg shadow-lg border border-border transition-transform duration-200"
          style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
        />
      </main>
    </div>
  );
};

export default CatalogueView;
