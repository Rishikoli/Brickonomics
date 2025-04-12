import Link from 'next/link';
import { RiFileList2Line, RiDashboardLine } from 'react-icons/ri';
import { BiCoinStack } from 'react-icons/bi';
import { TbReportAnalytics } from 'react-icons/tb';
import DecryptTextWrapper from './components/DecryptTextWrapper';

export default function Home() {
  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          <DecryptTextWrapper text="Smart Construction Cost Estimation" />
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Optimize your construction projects with accurate cost estimates based on Indian market rates and standards
        </p>
        <Link
          href="/project-input"
          className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
        >
          <span className="text-xl">₹</span>
          Start New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <RiFileList2Line className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-purple-400">BOQ Input</h2>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <RiDashboardLine className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-blue-400">Project Overview</h2>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <BiCoinStack className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-purple-400">Rate Analysis</h2>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <TbReportAnalytics className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-blue-400">Tender Reports</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
