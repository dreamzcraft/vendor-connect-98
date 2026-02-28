import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/icons";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, LogOut } from "lucide-react";
import AdminCategoryDialog from "@/components/AdminCategoryDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  icon_name: string;
  sort_order: number;
  brand_count?: number;
}

const Index = () => {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const fetchCategories = async () => {
    const { data: cats } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order");
    
    if (cats) {
      // Get brand counts
      const { data: brands } = await supabase.from("brands").select("category_id");
      const countMap: Record<string, number> = {};
      brands?.forEach((b) => { countMap[b.category_id] = (countMap[b.category_id] || 0) + 1; });
      setCategories(cats.map((c) => ({ ...c, brand_count: countMap[c.id] || 0 })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("categories").delete().eq("id", deleteTarget.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Category deleted" }); fetchCategories(); }
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Dreamzcraft Logo" className="h-12" />
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
                Dreamzcraft Informatics Pvt Ltd
              </h1>
              <p className="text-sm text-muted-foreground">
                Select a product category to find vendors and distributors
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Button size="sm" onClick={() => { setEditCat(null); setDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-1" /> Add Category
              </Button>
            )}
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => { logout(); navigate("/login"); }} title="Sign out">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20 text-muted-foreground">Loading…</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const Icon = getIcon(category.icon_name);
              return (
                <div key={category.id} className="relative group">
                  <button
                    onClick={() => navigate(`/category/${category.id}`)}
                    className="w-full flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Icon className="w-8 h-8 text-primary transition-transform duration-200 group-hover:scale-110" />
                    <span className="font-display text-sm font-semibold text-card-foreground text-center leading-tight">
                      {category.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {category.brand_count} brand{category.brand_count !== 1 ? "s" : ""}
                    </span>
                  </button>
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setEditCat(category); setDialogOpen(true); }}>
                        <Pencil className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={(e) => { e.stopPropagation(); setDeleteTarget(category); }}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <AdminCategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={editCat}
        onSaved={fetchCategories}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Category"
        description={`This will permanently delete "${deleteTarget?.name}" and all its brands and vendors.`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Index;
