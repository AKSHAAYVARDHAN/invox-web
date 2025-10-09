
import React, { useState } from 'react';
import type { Project } from '../types';
import { HeartIcon, TrendingUpIcon, ChatIcon, ShareIcon } from '../components/ui/Icons';
import DomainFilter from '../components/ui/DomainFilter';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-invox-dark-accent rounded-lg overflow-hidden border border-gray-800 p-4 mb-4">
        <div className="flex items-center mb-3">
            <img src={project.author.avatarUrl} alt={project.author.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
                <div className="flex items-center">
                    <p className="font-bold text-white">{project.author.name}</p>
                    {project.author.isVerified && <span className="ml-1 text-blue-500">✓</span>}
                </div>
                <p className="text-xs text-gray-400">{project.createdAt.toLocaleDateString()}</p>
            </div>
        </div>
        <p className="text-lg italic text-invox-light-gray mb-3">"{project.aiSummary}"</p>
        <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
        {project.imageUrl && (
            <div className="rounded-lg overflow-hidden mb-4">
                <img src={project.imageUrl} alt="Project visual" className="w-full h-auto object-cover" />
            </div>
        )}
        <div className="flex justify-between items-center text-invox-light-gray">
            <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 hover:text-invox-red"><HeartIcon className="w-5 h-5" /><span>{project.stats.likes}</span></button>
                <div className="flex items-center space-x-1"><TrendingUpIcon className="w-5 h-5" /><span>{project.stats.views}</span></div>
                <button className="flex items-center space-x-1 hover:text-white"><ChatIcon className="w-5 h-5" /><span>{project.stats.comments}</span></button>
            </div>
            <button className="hover:text-white"><ShareIcon className="w-5 h-5" /></button>
        </div>
    </div>
);

const mockProject: Project = {
    id: 'proj1',
    author: { name: 'Crash Adams', avatarUrl: 'https://picsum.photos/id/10/200/200', isVerified: true },
    aiSummary: 'Here Comes The One-Line Of The Project..',
    description: 'Project Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl: 'https://picsum.photos/seed/code/800/450',
    stats: { likes: 87200, views: 42300000, comments: 11200 },
    createdAt: new Date(),
};

const Showcase = () => <div><ProjectCard project={mockProject} /></div>;

const Collabs = () => (
    <div className="text-white">
        <h3 className="text-xl font-bold mb-4">Quick Collabs</h3>
        <div className="bg-invox-dark-accent p-4 rounded-lg border border-gray-800 flex items-center mb-6">
            <img src="https://picsum.photos/id/22/200/200" className="w-12 h-12 rounded-full mr-4"/>
            <div>
                <p className="font-bold">Roe Johnson</p>
                <p className="text-sm text-gray-400">Here comes the description of the project that requires collaboration</p>
                <button className="text-sm text-invox-red mt-1">View</button>
            </div>
        </div>
        <h3 className="text-xl font-bold mb-4">For You</h3>
        {/* Placeholder for more collabs */}
        <ProjectCard project={{...mockProject, id: 'collab1', author: {name: 'Mc Joe Benny', avatarUrl: 'https://picsum.photos/id/25/200/200', isVerified: true}}} />
    </div>
);

const Pings = () => (
    <div className="text-white">
        <h3 className="text-xl font-bold mb-4">Offers</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-invox-dark-accent p-4 rounded-lg border border-gray-800 text-center">Full-Time</div>
            <div className="bg-invox-dark-accent p-4 rounded-lg border border-gray-800 text-center">Invites</div>
            <div className="bg-invox-dark-accent p-4 rounded-lg border border-gray-800 text-center">Gigs</div>
            <div className="bg-invox-dark-accent p-4 rounded-lg border border-gray-800 text-center">Others</div>
        </div>
        <h3 className="text-xl font-bold mb-4">Actives</h3>
        <input type="search" placeholder="Search Projects" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-invox-red" />
        {['Apple Company', 'Mia Morris', 'Joe Root'].map(name => (
            <div key={name} className="bg-invox-dark-accent p-3 rounded-lg border border-gray-800 flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <img src={`https://picsum.photos/seed/${name}/200/200`} className="w-10 h-10 rounded-full mr-3"/>
                    <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm text-gray-400">Hello,</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-invox-red">Yesterday</p>
                    <span className="bg-invox-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mt-1">1</span>
                </div>
            </div>
        ))}
    </div>
);

const SpotlightPage = () => {
    const [activeTab, setActiveTab] = useState('Showcase');

    const renderContent = () => {
        switch (activeTab) {
            case 'Showcase': return <Showcase />;
            case 'Collabs': return <Collabs />;
            case 'Pings': return <Pings />;
            default: return <Showcase />;
        }
    };
    
    return (
        <div className="p-4">
            <DomainFilter />
            <div className="flex space-x-2 border border-gray-700 rounded-lg p-1 bg-invox-dark-accent mb-4">
                {['Showcase', 'Collabs', 'Pings'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 rounded-md transition-colors ${activeTab === tab ? 'bg-invox-red text-white' : 'text-gray-400'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            {renderContent()}
        </div>
    );
};

export default SpotlightPage;
