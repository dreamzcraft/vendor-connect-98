
-- Add catalogue_url column to brands table
ALTER TABLE public.brands ADD COLUMN catalogue_url text NOT NULL DEFAULT '';

-- Create storage bucket for catalogues
INSERT INTO storage.buckets (id, name, public) VALUES ('catalogues', 'catalogues', true);

-- Allow anyone to read catalogue files
CREATE POLICY "Anyone can read catalogues" ON storage.objects FOR SELECT USING (bucket_id = 'catalogues');

-- Allow anyone to upload catalogues (admin check done in app)
CREATE POLICY "Allow upload catalogues" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'catalogues');

-- Allow anyone to update catalogues
CREATE POLICY "Allow update catalogues" ON storage.objects FOR UPDATE USING (bucket_id = 'catalogues');

-- Allow anyone to delete catalogues
CREATE POLICY "Allow delete catalogues" ON storage.objects FOR DELETE USING (bucket_id = 'catalogues');
