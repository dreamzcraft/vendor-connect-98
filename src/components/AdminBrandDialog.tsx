import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
  brand?: { id: string; name: string } | null;
  onSaved: () => void;
}

const AdminBrandDialog = ({ open, onOpenChange, categoryId, brand, onSaved }: Props) => {
  const [name, setName] = useState(brand?.name || "");
  const [saving, setSaving] = useState(false);
  const isEdit = !!brand;

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      if (isEdit) {
        const { error } = await supabase.from("brands").update({ name }).eq("id", brand.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("brands").insert({ category_id: categoryId, name });
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
