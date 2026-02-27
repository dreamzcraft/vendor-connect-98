import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/icons";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Mail, Send, Plus, Pencil, Trash2 } from "lucide-react";
import AdminVendorDialog from "@/components/AdminVendorDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { toast } from "@/hooks/use-toast";

interface VendorRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  position: string;
}

const formatPhone = (phone: string) => phone.replace(/\s+/g, "");

const openWhatsApp = (vendor: VendorRow) => {
  const phone = formatPhone(vendor.phone);
  const indianPhone = phone.startsWith("+") ? phone : `+91${phone}`;
  window.open(`https://wa.me/${indianPhone.replace("+", "")}`, "_blank");
};

const openEmail = (vendor: VendorRow) => {
  window.open(`mailto:${vendor.email}`, "_blank");
};

const VendorList = () => {
  const { categoryId, brandName: brandId } = useParams<{ categoryId: string; brandName: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [category, setCategory] = useState<{ id: string; name: string; icon_name: string } | null>(null);
  const [brand, setBrand] = useState<{ id: string; name: string } | null>(null);
  const [vendors, setVendors] = useState<VendorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editVendor, setEditVendor] = useState<VendorRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<VendorRow | null>(null);

  const fetchData = async () => {
    const [catRes, brandRes] = await Promise.all([
      supabase.from("categories").select("*").eq("id", categoryId!).single(),
      supabase.from("brands").select("*").eq("id", brandId!).single(),
    ]);
    setCategory(catRes.data);
    setBrand(brandRes.data);

    const { data: vendorRows } = await supabase
      .from("vendors")
      .select("*")
      .eq("brand_id", brandId!)
      .order("sort_order");
    setVendors(vendorRows || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [categoryId, brandId]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("vendors").delete().eq("id", deleteTarget.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Vendor deleted" }); fetchData(); }
    setDeleteTarget(null);
  };

  if (!loading && (!category || !brand)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Not found</h1>
          <button onClick={() => navigate("/")} className="mt-4 text-primary hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const vendorsWithEmail = vendors.filter((v) => v.email);
  const emailAll = () => {
    const emails = vendorsWithEmail.map((v) => v.email).join(",");
    window.open(`mailto:${emails}`, "_blank");
  };

  const Icon = category ? getIcon(category.icon_name) : null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate(`/category/${categoryId}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{category?.name} — Brands</span>
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              {Icon && <Icon className="w-8 h-8 text-primary" />}
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">{brand?.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {vendors.length} vendor{vendors.length !== 1 ? "s" : ""} for {category?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button size="sm" onClick={() => { setEditVendor(null); setDialogOpen(true); }}>
                  <Plus className="w-4 h-4 mr-1" /> Add Vendor
                </Button>
              )}
              {vendorsWithEmail.length > 1 && (
                <button
                  onClick={emailAll}
                  className="flex items-center gap-2 rounded-lg bg-email-all px-4 py-2.5 text-sm font-semibold text-email-all-foreground shadow-sm transition-all hover:opacity-90 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  Email All ({vendorsWithEmail.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20 text-muted-foreground">Loading…</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="rounded-xl border border-border bg-card p-5 shadow-sm relative group">
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditVendor(vendor); setDialogOpen(true); }}>
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteTarget(vendor)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-semibold text-card-foreground leading-tight">{vendor.name}</h3>
                    {vendor.type === "company_rep" && (
                      <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        Company Rep
                      </span>
                    )}
                  </div>
                  {vendor.position && (
                    <p className="mt-1 text-sm text-muted-foreground italic">{vendor.position}</p>
                  )}
                  {vendor.email && (
                    <p className="mt-1 text-sm text-muted-foreground truncate">{vendor.email}</p>
                  )}
                  {vendor.phone && (
                    <p className="text-sm text-muted-foreground">{vendor.phone}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {vendor.phone && (
                    <button
                      onClick={() => openWhatsApp(vendor)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-whatsapp px-3 py-2.5 text-sm font-semibold text-whatsapp-foreground shadow-sm transition-all hover:opacity-90 active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </button>
                  )}
                  {vendor.email && (
                    <button
                      onClick={() => openEmail(vendor)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-email px-3 py-2.5 text-sm font-semibold text-email-foreground shadow-sm transition-all hover:opacity-90 active:scale-95"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {brandId && (
        <AdminVendorDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          brandId={brandId}
          vendor={editVendor}
          onSaved={fetchData}
        />
      )}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        title="Delete Vendor"
        description={`This will permanently delete "${deleteTarget?.name}".`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default VendorList;
