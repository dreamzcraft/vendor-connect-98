import { useParams, useNavigate } from "react-router-dom";
import { productCategories } from "@/data/vendors";
import { ArrowLeft } from "lucide-react";

const BrandSelect = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const category = productCategories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Category not found</h1>
          <button onClick={() => navigate("/")} className="mt-4 text-primary hover:underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">All Categories</span>
          </button>
          <div className="flex items-center gap-3">
            <category.icon className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
                {category.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                Select a brand to view vendors
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {category.brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() =>
                navigate(`/category/${categoryId}/brand/${encodeURIComponent(brand.name)}`)
              }
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="font-display text-base font-semibold text-card-foreground text-center">
                {brand.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {brand.vendors.length} vendor{brand.vendors.length !== 1 ? "s" : ""}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BrandSelect;
