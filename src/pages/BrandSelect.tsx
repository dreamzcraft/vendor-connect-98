import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/icons";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import AdminBrandDialog from "@/components/AdminBrandDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import ThemeToggle from "@/components/ThemeToggle";
import { toast } from "@/hooks/use-toast";

interface Brand {
  id: string;
  name: string;
  vendor_count?: number;
}

const BrandSelect = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [category, setCategory] = useState<{ id: string; name: string; icon_name: string } | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBrand, setEditBrand] = useState<Brand | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);

  const fetchData = async () => {
    const { data: cat } = await supabase.from("categories").select("*").eq("id", categoryId!).single();
    setCategory(cat);

    const { data: brandRows } = await supabase.from("brands").select("*").eq("category_id", categoryId!).order("sort_order");
    if (brandRows) {
      const brandIds = brandRows.map((b) => b.id);
      const { data: vendors } = await supabase.from("vendors").select("brand_id").in("brand_id", brandIds.length ? brandIds : ["__none__"]);
      const countMap: Record<string, number> = {};
      vendors?.forEach((v) => { countMap[v.brand_id] = (countMap[v.brand_id] || 0) + 1; });
      setBrands(brandRows.map((b) => ({ ...b, vendor_count: countMap[b.id] || 0 })));
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [categoryId]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("brands").delete().eq("id", deleteTarget.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Brand deleted" }); fetchData(); }
    setDeleteTarget(null);
  };

  if (!loading && !category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Category not found</h1>
          <button onClick={() => navigate("/")} className="mt-4 text-primary hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const Icon = category ? getIcon(category.icon_name) : null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">All Categories</span>
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              {Icon && <Icon className="w-8 h-8 text-primary" />}
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">{category?.name}</h1>
                <p className="text-sm text-muted-foreground">Select a brand to view vendors</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button size="sm" onClick={() => { setEditBrand(null); setDialogOpen(true); }}>
                  <Plus className="w-4 h-4 mr-1" /> Add Brand
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20 text-muted-foreground">Loading…</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div key={brand.id} className="relative group">
                <button
                  onClick={() => navigate(`/category/${categoryId}/brand/${brand.id}`)}
                  className="w-full flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="font-display text-base font-semibold text-card-foreground text-center">{brand.name}</span>
                  <span className="text-xs text-muted-foreground">{brand.vendor_count} vendor{brand.vendor_count !== 1 ? "s" : ""}</span>
                </button>
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditBrand(brand); setDialogOpen(true); }}>
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteTarget(brand)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {categoryId && (
        <AdminBrandDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          categoryId={categoryId}
          brand={editBrand}
          onSaved={fetchData}
        />
      )}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Brand"
        description={`This will permanently delete "${deleteTarget?.name}" and all its vendors.`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default BrandSelect;
