'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { RiDashboardLine, RiFileList2Line, RiPriceTag3Line } from 'react-icons/ri';
import { BiCoinStack } from 'react-icons/bi';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-900/50 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-purple-400 hover:text-purple-300 transition-colors">
              Brickonomics
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/materials" 
              className={cn(
                pathname === '/materials'
                  ? 'bg-gray-700/50 text-purple-400'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-purple-400',
                'px-3 py-2 rounded-md transition-all flex items-center gap-2'
              )}
            >
              <RiPriceTag3Line className="text-lg" />
              <span>Materials</span>
            </Link>
            <Link 
              href="/project-input" 
              className={cn(
                pathname === '/project-input'
                  ? 'bg-gray-700/50 text-purple-400'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-purple-400',
                'px-3 py-2 rounded-md transition-all flex items-center gap-2'
              )}
            >
              <RiFileList2Line className="text-lg" />
              <span>Project Input</span>
            </Link>
            <Link 
              href="/dashboard" 
              className={cn(
                pathname === '/dashboard'
                  ? 'bg-gray-700/50 text-purple-400'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-purple-400',
                'px-3 py-2 rounded-md transition-all flex items-center gap-2'
              )}
            >
              <RiDashboardLine className="text-lg" />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/cost-optimization" 
              className={cn(
                pathname === '/cost-optimization'
                  ? 'bg-gray-700/50 text-purple-400'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-purple-400',
                'px-3 py-2 rounded-md transition-all flex items-center gap-2'
              )}
            >
              <BiCoinStack className="text-lg" />
              <span>Cost Optimization</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
