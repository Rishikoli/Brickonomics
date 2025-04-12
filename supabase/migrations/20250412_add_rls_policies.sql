-- Drop existing policies if they exist
DROP POLICY IF EXISTS "projects_select_policy" ON projects;
DROP POLICY IF EXISTS "projects_insert_policy" ON projects;
DROP POLICY IF EXISTS "projects_update_policy" ON projects;
DROP POLICY IF EXISTS "cost_analysis_select_policy" ON cost_analysis;
DROP POLICY IF EXISTS "cost_analysis_insert_policy" ON cost_analysis;
DROP POLICY IF EXISTS "cost_analysis_update_policy" ON cost_analysis;

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_analysis ENABLE ROW LEVEL SECURITY;

-- Create policies for projects table
CREATE POLICY "projects_select_policy" ON projects
  FOR SELECT USING (true);

CREATE POLICY "projects_insert_policy" ON projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "projects_update_policy" ON projects
  FOR UPDATE USING (true);

-- Create policies for cost_analysis table
CREATE POLICY "cost_analysis_select_policy" ON cost_analysis
  FOR SELECT USING (true);

CREATE POLICY "cost_analysis_insert_policy" ON cost_analysis
  FOR INSERT WITH CHECK (true);

CREATE POLICY "cost_analysis_update_policy" ON cost_analysis
  FOR UPDATE USING (true);
