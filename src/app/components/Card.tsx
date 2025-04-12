'use client';

interface CardProps {
  title: string;
  amount: number;
  icon: string;
  color: string;
  children?: React.ReactNode;
}

export default function Card({ title, amount, icon, color, children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-900">
        ₹{amount.toLocaleString('en-IN')}
      </p>
      {children}
    </div>
  );
}
