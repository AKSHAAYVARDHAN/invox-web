
import React from 'react';
import { SearchIcon } from '../common/Icons';

const RightPanel: React.FC = () => {
  return (
    <aside className="w-1/5 bg-invox-dark p-6 sticky top-0 h-screen">
        <div className="relative mb-6">
            <input type="text" placeholder="Search Invox" className="w-full bg-invox-gray border border-transparent rounded-full px-4 py-2 text-white placeholder-invox-light-gray focus:outline-none focus:ring-2 focus:ring-invox-red"/>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <SearchIcon />
            </div>
        </div>

        <div className="bg-invox-gray rounded-lg p-4">
            <h3 className="font-bold text-lg mb-4">What's Happening</h3>
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-invox-light-gray">Technology · Trending</p>
                    <p className="font-semibold">#QuantumComputing</p>
                    <p className="text-sm text-invox-light-gray">15.2K Posts</p>
                </div>
                <div>
                    <p className="text-sm text-invox-light-gray">Startups · Trending</p>
                    <p className="font-semibold">#AIforGood</p>
                    <p className="text-sm text-invox-light-gray">9,873 Posts</p>
                </div>
                <div>
                    <p className="text-sm text-invox-light-gray">Science · Trending</p>
                    <p className="font-semibold">#MarsMission</p>
                    <p className="text-sm text-invox-light-gray">7,123 Posts</p>
                </div>
            </div>
        </div>
    </aside>
  );
};

export default RightPanel;
