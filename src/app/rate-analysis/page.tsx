'use client';

import { useState } from 'react';
import { BiBuildings, BiRupee } from 'react-icons/bi';
import { MdOutlineCategory, MdEngineering } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { GiSandsOfTime } from 'react-icons/gi';

export default function RateAnalysis() {
  const [activeTab, setActiveTab] = useState('materials');

  const materialCategories = [
    { name: 'Cement (OPC/PPC)', unit: 'per bag', baseRate: '350' },
    { name: 'Steel TMT Bars', unit: 'per kg', baseRate: '65' },
    { name: 'Bricks (Class A)', unit: 'per 1000', baseRate: '6500' },
    { name: 'Sand (River)', unit: 'per cu.m', baseRate: '2200' },
    { name: 'Aggregate 20mm', unit: 'per cu.m', baseRate: '1800' }
  ];

  const labourCategories = [
    { name: 'Mason (Mistri)', unit: 'per day', baseRate: '850' },
    { name: 'Helper', unit: 'per day', baseRate: '550' },
    { name: 'Carpenter', unit: 'per day', baseRate: '800' },
    { name: 'Bar Bender', unit: 'per day', baseRate: '800' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Rate Analysis & Cost Optimization
        </h1>
        <p className="text-gray-300 text-lg">
          Current market rates and analysis based on CPWD standards and local market conditions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <BiBuildings className="text-2xl text-purple-400" />
              <h2 className="text-xl font-semibold text-purple-400">Basic Rates</h2>
            </div>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab('materials')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'materials'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Materials
              </button>
              <button
                onClick={() => setActiveTab('labour')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'labour'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Labour
              </button>
            </div>

            <div className="space-y-4">
              {(activeTab === 'materials' ? materialCategories : labourCategories).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-200">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">₹</span>
                    <input
                      type="number"
                      defaultValue={item.baseRate}
                      className="w-24 px-3 py-1 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500 text-gray-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <MdEngineering className="text-2xl text-blue-400" />
              <h2 className="text-xl font-semibold text-blue-400">Analysis Factors</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h3 className="font-medium text-gray-200 mb-2">Labour Productivity</h3>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500 text-gray-200">
                  <option value="high">High - Metro Cities</option>
                  <option value="medium">Medium - Tier 2 Cities</option>
                  <option value="low">Low - Rural Areas</option>
                </select>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h3 className="font-medium text-gray-200 mb-2">Market Conditions</h3>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500 text-gray-200">
                  <option value="peak">Peak Season</option>
                  <option value="normal">Normal Season</option>
                  <option value="off">Off Season</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-4 mb-6">
              <TbTruckDelivery className="text-2xl text-purple-400" />
              <h2 className="text-xl font-semibold text-purple-400">Transportation</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <h3 className="font-medium text-gray-200 mb-2">Lead Distance</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500 text-gray-200"
                  />
                  <span className="text-gray-400">km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
