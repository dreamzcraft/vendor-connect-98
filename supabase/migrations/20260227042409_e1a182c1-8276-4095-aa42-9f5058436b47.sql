-- Create categories table
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Box',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create brands table
CREATE TABLE public.brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create vendors table with position field
CREATE TABLE public.vendors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'distributor' CHECK (type IN ('company_rep', 'distributor')),
  position TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- Everyone can read (app handles its own auth)
CREATE POLICY "Anyone can read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can read brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Anyone can read vendors" ON public.vendors FOR SELECT USING (true);

-- Allow anon insert/update/delete (admin check is app-level)
CREATE POLICY "Allow insert categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update categories" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Allow delete categories" ON public.categories FOR DELETE USING (true);

CREATE POLICY "Allow insert brands" ON public.brands FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update brands" ON public.brands FOR UPDATE USING (true);
CREATE POLICY "Allow delete brands" ON public.brands FOR DELETE USING (true);

CREATE POLICY "Allow insert vendors" ON public.vendors FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update vendors" ON public.vendors FOR UPDATE USING (true);
CREATE POLICY "Allow delete vendors" ON public.vendors FOR DELETE USING (true);

-- Indexes
CREATE INDEX idx_brands_category ON public.brands(category_id);
CREATE INDEX idx_vendors_brand ON public.vendors(brand_id);