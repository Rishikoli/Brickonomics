-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name VARCHAR(255) NOT NULL,
  project_type VARCHAR(50) NOT NULL,
  total_area DECIMAL(10, 2) NOT NULL,
  estimated_duration INTEGER NOT NULL,
  location VARCHAR(100) NOT NULL,
  requirements TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cost_analysis table
CREATE TABLE IF NOT EXISTS cost_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  material_cost DECIMAL(12, 2) NOT NULL DEFAULT 0,
  labor_cost DECIMAL(12, 2) NOT NULL DEFAULT 0,
  transportation_cost DECIMAL(12, 2) NOT NULL DEFAULT 0,
  overhead_cost DECIMAL(12, 2) NOT NULL DEFAULT 0,
  total_cost DECIMAL(12, 2) NOT NULL DEFAULT 0,
  cost_per_sqft DECIMAL(12, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cost_analysis_updated_at
  BEFORE UPDATE ON cost_analysis
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
