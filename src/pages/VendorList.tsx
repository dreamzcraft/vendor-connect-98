import { useParams, useNavigate } from "react-router-dom";
import { productCategories, Vendor } from "@/data/vendors";
import { ArrowLeft, MessageCircle, Mail, Send } from "lucide-react";

const formatPhone = (phone: string) => phone.replace(/\s+/g, "");

const openWhatsApp = (vendor: Vendor) => {
  const phone = formatPhone(vendor.phone);
  const indianPhone = phone.startsWith("+") ? phone : `+91${phone}`;
  window.open(`https://wa.me/${indianPhone.replace("+", "")}`, "_blank");
};

const openEmail = (vendor: Vendor) => {
  window.open(`mailto:${vendor.email}`, "_blank");
};

const VendorList = () => {
  const { categoryId, brandName } = useParams<{ categoryId: string; brandName: string }>();
  const navigate = useNavigate();

  const category = productCategories.find((c) => c.id === categoryId);
  const brand = category?.brands.find(
    (b) => b.name === decodeURIComponent(brandName || "")
  );

  if (!category || !brand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground">Not found</h1>
          <button onClick={() => navigate("/")} className="mt-4 text-primary hover:underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const vendorsWithEmail = brand.vendors.filter((v) => v.email);

  const emailAll = () => {
    const emails = vendorsWithEmail.map((v) => v.email).join(",");
    window.open(`mailto:${emails}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate(`/category/${categoryId}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{category.name} — Brands</span>
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
                  {brand.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {brand.vendors.length} vendor{brand.vendors.length !== 1 ? "s" : ""} for{" "}
                  {category.name}
                </p>
              </div>
            </div>
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
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {brand.vendors.map((vendor, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="mb-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-semibold text-card-foreground leading-tight">
                    {vendor.name}
                  </h3>
                  {vendor.type === "company_rep" && (
                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      Company Rep
                    </span>
                  )}
                </div>
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
      </main>
    </div>
  );
};

export default VendorList;
