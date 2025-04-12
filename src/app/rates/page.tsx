import { MaterialsTable } from '../components/MaterialsTable';
import { LaborRatesTable } from '../components/LaborRatesTable';

export default function RatesPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Construction Rates</h1>
        <p className="text-gray-600 mb-8">
          Current market rates for construction materials and labor across different cities in India.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Materials</h2>
          <MaterialsTable />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Labor Rates</h2>
          <LaborRatesTable />
        </section>
      </div>
    </div>
  );
}
