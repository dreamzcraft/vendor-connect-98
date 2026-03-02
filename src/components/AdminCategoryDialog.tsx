import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { iconOptions, getIcon } from "@/lib/icons";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: { id: string; name: string; icon_name: string; sort_order: number } | null;
  onSaved: () => void;
}

const AdminCategoryDialog = ({ open, onOpenChange, category, onSaved }: Props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [iconName, setIconName] = useState("Box");
  const [saving, setSaving] = useState(false);
  const isEdit = !!category;

  useEffect(() => {
    if (open) {
      setId(category?.id || "");
      setName(category?.name || "");
      setIconName(category?.icon_name || "Box");
    }
  }, [open, category]);

  const handleSave = async () => {
    if (!id.trim() || !name.trim()) return;
    setSaving(true);
    try {
      if (isEdit) {
        const { error } = await supabase.from("categories").update({ name, icon_name: iconName }).eq("id", category.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("categories").insert({ id: id.trim().toLowerCase().replace(/\s+/g, "-"), name, icon_name: iconName });
        if (error) throw error;
      }
      toast({ title: isEdit ? "Category updated" : "Category added" });
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
          <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {!isEdit && (
            <div className="space-y-2">
              <Label>ID (slug)</Label>
              <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. laptop" />
            </div>
          )}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Laptop" />
          </div>
          <div className="space-y-2">
            <Label>Icon</Label>
            <Select value={iconName} onValueChange={setIconName}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((ic) => {
                  const Icon = getIcon(ic);
                  return (
                    <SelectItem key={ic} value={ic}>
                      <span className="flex items-center gap-2"><Icon className="w-4 h-4" /> {ic}</span>
                    </SelectItem>
                  );
                })}
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

export default AdminCategoryDialog;
