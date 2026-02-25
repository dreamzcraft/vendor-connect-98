import { useNavigate } from "react-router-dom";
import { productCategories } from "@/data/vendors";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
            Vendor Directory
          </h1>
          <p className="mt-1 text-muted-foreground">
            Select a product category to find vendors and distributors
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {productCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/category/${category.id}`)}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="text-4xl transition-transform duration-200 group-hover:scale-110">
                {category.icon}
              </span>
              <span className="font-display text-sm font-semibold text-card-foreground text-center leading-tight">
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {category.brands.length} brand{category.brands.length !== 1 ? "s" : ""}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
