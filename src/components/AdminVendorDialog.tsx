import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface VendorRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  position: string;
  catalogue_url: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brandId: string;
  vendor?: VendorRow | null;
  onSaved: () => void;
}

const AdminVendorDialog = ({ open, onOpenChange, brandId, vendor, onSaved }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("distributor");
  const [position, setPosition] = useState("");
  const [catalogueUrl, setCatalogueUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isEdit = !!vendor;

  useEffect(() => {
    if (open) {
      setName(vendor?.name || "");
      setEmail(vendor?.email || "");
      setPhone(vendor?.phone || "");
      setType(vendor?.type || "distributor");
      setPosition(vendor?.position || "");
      setCatalogueUrl(vendor?.catalogue_url || "");
    }
  }, [open, vendor]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const filePath = `vendors/${vendor?.id || "new"}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("catalogues").upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from("catalogues").getPublicUrl(filePath);
      setCatalogueUrl(urlData.publicUrl);
      toast({ title: "Catalogue image uploaded" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const data = { name, email, phone, type, position, catalogue_url: catalogueUrl };
      if (isEdit) {
        const { error } = await supabase.from("vendors").update(data).eq("id", vendor.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("vendors").insert({ ...data, brand_id: brandId });
        if (error) throw error;
      }
      toast({ title: isEdit ? "Vendor updated" : "Vendor added" });
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
          <DialogTitle>{isEdit ? "Edit Vendor" : "Add Vendor"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Contact name" />
          </div>
          <div className="space-y-2">
            <Label>Position / Designation</Label>
            <Input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Regional Sales Manager" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" type="email" />
          </div>
          <div className="space-y-2">
            <Label>Phone (WhatsApp)</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9876543210" />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="company_rep">Company Rep</SelectItem>
                <SelectItem value="distributor">Distributor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Catalogue Image</Label>
            <input ref={fileRef} type="file" accept="image/*,.pdf" onChange={handleUpload} className="hidden" />
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading} className="gap-1">
                <Upload className="w-4 h-4" />
                {uploading ? "Uploading…" : catalogueUrl ? "Replace" : "Upload"}
              </Button>
              {catalogueUrl && (
                <Button type="button" variant="outline" size="sm" onClick={() => setCatalogueUrl("")} className="gap-1 text-destructive">
                  <X className="w-4 h-4" /> Remove
                </Button>
              )}
            </div>
            {catalogueUrl && (
              <p className="text-xs text-muted-foreground truncate">✓ Catalogue attached</p>
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

export default AdminVendorDialog;
