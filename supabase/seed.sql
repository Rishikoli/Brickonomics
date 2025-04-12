-- Insert initial materials
INSERT INTO materials (name, unit, base_rate, category, description) VALUES
  ('OPC Cement 43 Grade', 'bag', 350.00, 'cement', '50 kg bag of OPC cement'),
  ('PPC Cement', 'bag', 330.00, 'cement', '50 kg bag of PPC cement'),
  ('TMT Steel Bars 8mm', 'kg', 65.00, 'steel', 'Fe500 grade TMT reinforcement bars'),
  ('TMT Steel Bars 10mm', 'kg', 65.00, 'steel', 'Fe500 grade TMT reinforcement bars'),
  ('TMT Steel Bars 12mm', 'kg', 65.00, 'steel', 'Fe500 grade TMT reinforcement bars'),
  ('Red Clay Bricks', 'thousand', 6500.00, 'bricks', 'Standard size red clay bricks'),
  ('Fly Ash Bricks', 'thousand', 5800.00, 'bricks', 'Standard size fly ash bricks'),
  ('River Sand', 'cu.m', 2200.00, 'sand', 'Fine river sand for construction'),
  ('M Sand', 'cu.m', 1800.00, 'sand', 'Manufactured sand'),
  ('20mm Aggregate', 'cu.m', 1800.00, 'aggregate', '20mm sized crushed stone aggregate'),
  ('12mm Aggregate', 'cu.m', 1900.00, 'aggregate', '12mm sized crushed stone aggregate'),
  ('6mm Aggregate', 'cu.m', 2000.00, 'aggregate', '6mm sized crushed stone aggregate');

-- Insert initial labor rates for different cities
INSERT INTO labor_rates (role, daily_rate, location, skill_level) VALUES
  ('Mason (Mistri)', 850.00, 'Mumbai', 'skilled'),
  ('Helper', 550.00, 'Mumbai', 'unskilled'),
  ('Carpenter', 800.00, 'Mumbai', 'skilled'),
  ('Bar Bender', 800.00, 'Mumbai', 'skilled'),
  ('Mason (Mistri)', 750.00, 'Pune', 'skilled'),
  ('Helper', 500.00, 'Pune', 'unskilled'),
  ('Carpenter', 700.00, 'Pune', 'skilled'),
  ('Bar Bender', 700.00, 'Pune', 'skilled'),
  ('Mason (Mistri)', 700.00, 'Nagpur', 'skilled'),
  ('Helper', 450.00, 'Nagpur', 'unskilled'),
  ('Carpenter', 650.00, 'Nagpur', 'skilled'),
  ('Bar Bender', 650.00, 'Nagpur', 'skilled'),
  ('Mason (Mistri)', 900.00, 'Delhi', 'skilled'),
  ('Helper', 600.00, 'Delhi', 'unskilled'),
  ('Carpenter', 850.00, 'Delhi', 'skilled'),
  ('Bar Bender', 850.00, 'Delhi', 'skilled'),
  ('Mason (Mistri)', 800.00, 'Bangalore', 'skilled'),
  ('Helper', 550.00, 'Bangalore', 'unskilled'),
  ('Carpenter', 750.00, 'Bangalore', 'skilled'),
  ('Bar Bender', 750.00, 'Bangalore', 'skilled');
