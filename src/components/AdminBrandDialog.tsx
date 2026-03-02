import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Upload, X, Image } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
  brand?: { id: string; name: string; catalogue_url?: string } | null;
  onSaved: () => void;
}

const AdminBrandDialog = ({ open, onOpenChange, categoryId, brand, onSaved }: Props) => {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [catalogueFile, setCatalogueFile] = useState<File | null>(null);
  const [cataloguePreview, setCataloguePreview] = useState<string | null>(null);
  const [removeCatalogue, setRemoveCatalogue] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isEdit = !!brand;

  useEffect(() => {
    if (open) {
      setName(brand?.name || "");
      setCatalogueFile(null);
      setCataloguePreview(brand?.catalogue_url || null);
      setRemoveCatalogue(false);
    }
  }, [open, brand]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCatalogueFile(file);
      setCataloguePreview(URL.createObjectURL(file));
      setRemoveCatalogue(false);
    }
  };

  const handleRemoveCatalogue = () => {
    setCatalogueFile(null);
    setCataloguePreview(null);
    setRemoveCatalogue(true);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      let catalogue_url = brand?.catalogue_url || "";

      // Upload catalogue image if selected
      if (catalogueFile) {
        const ext = catalogueFile.name.split(".").pop();
        const filePath = `${categoryId}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("catalogues")
          .upload(filePath, catalogueFile, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("catalogues").getPublicUrl(filePath);
        catalogue_url = urlData.publicUrl;
      } else if (removeCatalogue) {
        catalogue_url = "";
      }

      if (isEdit) {
        const { error } = await supabase.from("brands").update({ name, catalogue_url }).eq("id", brand.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("brands").insert({ category_id: categoryId, name, catalogue_url });
        if (error) throw error;
      }
      toast({ title: isEdit ? "Brand updated" : "Brand added" });
      onSaved();
      onOpenChange(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Brand" : "Add Brand"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Brand Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. HP" />
          </div>
          <div className="space-y-2">
            <Label>Catalogue Image</Label>
            {cataloguePreview ? (
              <div className="relative rounded-lg border border-border overflow-hidden">
                <img src={cataloguePreview} alt="Catalogue preview" className="w-full max-h-40 object-contain bg-muted" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={handleRemoveCatalogue}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm">Click to upload catalogue image</span>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {cataloguePreview && (
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} className="gap-1">
                <Image className="w-3 h-3" /> Replace Image
              </Button>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminBrandDialog;
