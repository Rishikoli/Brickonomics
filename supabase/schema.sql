-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  project_name TEXT NOT NULL,
  project_type TEXT NOT NULL,
  total_area DECIMAL NOT NULL,
  estimated_duration INTEGER NOT NULL,
  location TEXT NOT NULL,
  requirements TEXT,
  status TEXT DEFAULT 'pending'
);

-- Create materials table
CREATE TABLE materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  unit TEXT NOT NULL, -- e.g., bags, kg, cu.m
  base_rate DECIMAL NOT NULL, -- Rate in INR
  category TEXT NOT NULL, -- e.g., cement, steel, bricks
  description TEXT
);

-- Create labor_rates table
CREATE TABLE labor_rates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  role TEXT NOT NULL, -- e.g., mason, helper, carpenter
  daily_rate DECIMAL NOT NULL, -- Rate in INR per day
  location TEXT NOT NULL, -- City/Region
  skill_level TEXT NOT NULL -- e.g., skilled, semi-skilled, unskilled
);

-- Create project_materials table
CREATE TABLE project_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  material_id UUID REFERENCES materials(id) ON DELETE RESTRICT NOT NULL,
  quantity DECIMAL NOT NULL,
  rate DECIMAL NOT NULL -- Actual rate used for this project
);

-- Create project_labor table
CREATE TABLE project_labor (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  labor_id UUID REFERENCES labor_rates(id) ON DELETE RESTRICT NOT NULL,
  num_workers INTEGER NOT NULL,
  num_days INTEGER NOT NULL,
  rate_per_day DECIMAL NOT NULL
);

-- Create cost_analysis table
CREATE TABLE cost_analysis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL UNIQUE,
  material_cost DECIMAL NOT NULL,
  labor_cost DECIMAL NOT NULL,
  transportation_cost DECIMAL NOT NULL,
  overhead_cost DECIMAL NOT NULL,
  total_cost DECIMAL NOT NULL,
  cost_per_sqft DECIMAL NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_project_materials_project_id ON project_materials(project_id);
CREATE INDEX idx_project_materials_material_id ON project_materials(material_id);
CREATE INDEX idx_project_labor_project_id ON project_labor(project_id);
CREATE INDEX idx_project_labor_labor_id ON project_labor(labor_id);
CREATE INDEX idx_cost_analysis_project_id ON cost_analysis(project_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON materials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_labor_rates_updated_at
  BEFORE UPDATE ON labor_rates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_materials_updated_at
  BEFORE UPDATE ON project_materials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_labor_updated_at
  BEFORE UPDATE ON project_labor
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cost_analysis_updated_at
  BEFORE UPDATE ON cost_analysis
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE labor_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_labor ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_analysis ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON projects FOR DELETE USING (auth.role() = 'authenticated');
