import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface Material {
  id?: string;
  name: string;
  unit: string;
  baseRate: number;
  category: string;
  description: string | null;
}

interface LaborRate {
  id?: string;
  name: string;
  unit: string;
  baseRate: number;
  category: string;
  description: string | null;
}

interface Project {
  id?: string;
  projectName: string;
  projectType: string;
  totalArea: number;
  estimatedDuration: number;
  location: string;
  requirements: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface CostAnalysis {
  id?: string;
  projectId: string;
  materialCost: number;
  laborCost: number;
  transportationCost: number;
  overheadCost: number;
  totalCost: number;
  costPerSqft: number;
  createdAt: string;
  updatedAt: string;
}

interface BrickonomicsDB extends DBSchema {
  materials: {
    key: string;
    value: Material;
    indexes: { 'by-category': string };
  };
  laborRates: {
    key: string;
    value: LaborRate;
    indexes: { 'by-category': string };
  };
  projects: {
    key: string;
    value: Project;
    indexes: { 'by-status': string };
  };
  costAnalysis: {
    key: string;
    value: CostAnalysis;
    indexes: { 'by-project': string };
  };
}

let db: IDBPDatabase<BrickonomicsDB>;

export async function initDB() {
  db = await openDB<BrickonomicsDB>('brickonomics', 1, {
    upgrade(db) {
      // Create materials store
      const materialsStore = db.createObjectStore('materials', {
        keyPath: 'id',
        autoIncrement: true
      });
      materialsStore.createIndex('by-category', 'category');

      // Create labor rates store
      const laborRatesStore = db.createObjectStore('laborRates', {
        keyPath: 'id',
        autoIncrement: true
      });
      laborRatesStore.createIndex('by-category', 'category');

      // Create projects store
      const projectsStore = db.createObjectStore('projects', {
        keyPath: 'id',
        autoIncrement: true
      });
      projectsStore.createIndex('by-status', 'status');

      // Create cost analysis store
      const costAnalysisStore = db.createObjectStore('costAnalysis', {
        keyPath: 'id',
        autoIncrement: true
      });
      costAnalysisStore.createIndex('by-project', 'projectId');
    }
  });
}

// Materials
export async function getMaterials(category?: string) {
  await initDB();
  if (category) {
    return await db.getAllFromIndex('materials', 'by-category', category);
  }
  return await db.getAll('materials');
}

export async function addMaterial(material: Omit<Material, 'id'>) {
  await initDB();
  return await db.add('materials', material as Material);
}

export async function updateMaterial(id: string, material: Omit<Material, 'id'>) {
  await initDB();
  return await db.put('materials', { ...material, id });
}

// Labor Rates
export async function getLaborRates(category?: string) {
  await initDB();
  if (category) {
    return await db.getAllFromIndex('laborRates', 'by-category', category);
  }
  return await db.getAll('laborRates');
}

export async function addLaborRate(rate: Omit<LaborRate, 'id'>) {
  await initDB();
  return await db.add('laborRates', rate as LaborRate);
}

export async function updateLaborRate(id: string, rate: Omit<LaborRate, 'id'>) {
  await initDB();
  return await db.put('laborRates', { ...rate, id });
}

// Projects
export async function getProjects(status?: string) {
  await initDB();
  if (status) {
    return await db.getAllFromIndex('projects', 'by-status', status);
  }
  return await db.getAll('projects');
}

export async function addProject(project: Omit<Project, 'id'>) {
  await initDB();
  return await db.add('projects', {
    ...project,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  } as Project);
}

// Cost Analysis
export async function getCostAnalysis(projectId: string) {
  await initDB();
  return await db.getAllFromIndex('costAnalysis', 'by-project', projectId);
}

export async function addCostAnalysis(analysis: Omit<CostAnalysis, 'id'>) {
  await initDB();
  return await db.add('costAnalysis', {
    ...analysis,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  } as CostAnalysis);
}
