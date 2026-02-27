import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface VendorRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  position: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brandId: string;
  vendor?: VendorRow | null;
  onSaved: () => void;
}

const AdminVendorDialog = ({ open, onOpenChange, brandId, vendor, onSaved }: Props) => {
  const [name, setName] = useState(vendor?.name || "");
  const [email, setEmail] = useState(vendor?.email || "");
  const [phone, setPhone] = useState(vendor?.phone || "");
  const [type, setType] = useState(vendor?.type || "distributor");
  const [position, setPosition] = useState(vendor?.position || "");
  const [saving, setSaving] = useState(false);
  const isEdit = !!vendor;

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const data = { name, email, phone, type, position };
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
