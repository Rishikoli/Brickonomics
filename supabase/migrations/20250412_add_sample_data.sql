-- Insert sample materials
INSERT INTO materials (name, unit, base_rate, category, description)
VALUES 
  ('Portland Cement', 'bag', 350, 'cement', '50kg bag of premium quality cement'),
  ('TMT Steel Bars', 'kg', 65, 'steel', 'High-strength TMT reinforcement bars'),
  ('Clay Bricks', 'thousand', 7500, 'bricks', 'Standard size red clay bricks'),
  ('River Sand', 'cu.m', 2200, 'sand', 'Clean river sand for construction'),
  ('Stone Aggregate', 'cu.m', 1800, 'aggregate', '20mm crushed stone aggregate');

-- Insert sample labor rates for different locations
INSERT INTO labor_rates (role, daily_rate, location, skill_level)
VALUES 
  ('Mason', 800, 'Mumbai', 'skilled'),
  ('Helper', 500, 'Mumbai', 'unskilled'),
  ('Mason', 750, 'Delhi', 'skilled'),
  ('Helper', 450, 'Delhi', 'unskilled'),
  ('Mason', 700, 'Bangalore', 'skilled'),
  ('Helper', 400, 'Bangalore', 'unskilled'),
  ('Mason', 650, 'Pune', 'skilled'),
  ('Helper', 350, 'Pune', 'unskilled'),
  ('Mason', 600, 'Nagpur', 'skilled'),
  ('Helper', 300, 'Nagpur', 'unskilled'),
  ('Mason', 700, 'Chennai', 'skilled'),
  ('Helper', 400, 'Chennai', 'unskilled'),
  ('Mason', 750, 'Kolkata', 'skilled'),
  ('Helper', 450, 'Kolkata', 'unskilled'),
  ('Mason', 700, 'Hyderabad', 'skilled'),
  ('Helper', 400, 'Hyderabad', 'unskilled');
