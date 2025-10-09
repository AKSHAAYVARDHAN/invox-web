import React, { useState } from 'react';
import type { Community, MyCommunity } from '../types';
import DomainFilter from '../components/ui/DomainFilter';
import CommunityCard from '../components/communities/CommunityCard';
import { 
    ChevronDownIcon, 
    FilterIcon, 
    PencilIcon,
    ArrowLeftIcon,
    GlobeAltIcon,
    MagnifyingGlassIcon,
    UsersIcon
} from '../components/ui/Icons';


const mockCommunities: Community[] = [
    // Artificial Intelligence
    { id: 'ai-1', name: 'AI ClubTech', description: 'Here Comes The Description Of The Community Lorem Ipsum Dolor Sit Amet, Consectetur', members: 10000, rating: 4.5, category: 'Artificial Intelligence', isVerified: true },
    { id: 'ai-2', name: 'ML Innovators', description: 'Exploring the frontiers of Machine Learning and deep learning applications.', members: 8500, rating: 4.8, category: 'Artificial Intelligence', isVerified: true },
    { id: 'ai-3', name: 'Data Mavericks', description: 'Deep dive into data science, analytics, and big data technologies.', members: 9200, rating: 4.7, category: 'Artificial Intelligence' },
    { id: 'ai-4', name: 'Neural Nets Hub', description: 'Discussing the latest in neural networks and AI research.', members: 6800, rating: 4.9, category: 'Artificial Intelligence', isVerified: true },
    { id: 'ai-5', name: 'Cognitive Coders', description: 'Where AI meets cognitive science. A place for deep discussions.', members: 4500, rating: 4.6, category: 'Artificial Intelligence' },
    
    // Coding
    { id: 'coding-1', name: 'CodeFrel Start', description: 'A community for beginner and intermediate coders to collaborate and grow.', members: 12000, rating: 4.6, category: 'Coding' },
    { id: 'coding-2', name: 'Algo Wizards', description: 'Tackling complex algorithms and data structures. For the love of problem solving.', members: 7200, rating: 4.9, category: 'Coding', isVerified: true },
    { id: 'coding-3', name: 'JS Junkies', description: 'Everything JavaScript: frameworks, libraries, Node.js, and more.', members: 15000, rating: 4.8, category: 'Coding', isVerified: true },
    { id: 'coding-4', name: 'Pythonic Playground', description: 'From web dev with Django to data science with Pandas.', members: 18000, rating: 4.7, category: 'Coding', isVerified: true },
    { id: 'coding-5', name: 'DevOps Den', description: 'CI/CD, Docker, Kubernetes, and all things DevOps.', members: 9500, rating: 4.6, category: 'Coding' },

    // Startup
    { id: 'startup-1', name: 'Startup Grind', description: 'Connect with founders, investors, and innovators in the startup ecosystem.', members: 25000, rating: 4.7, category: 'Startup', isVerified: true },
    { id: 'startup-2', name: 'Founder Circle', description: 'A private group for founders to share challenges and successes.', members: 3000, rating: 4.9, category: 'Startup', isVerified: true },
    { id: 'startup-3', name: 'Venture Visionaries', description: 'Discussing venture capital, funding rounds, and startup strategy.', members: 6000, rating: 4.5, category: 'Startup' },
    { id: 'startup-4', name: 'Bootstrapper Hub', description: 'For founders building businesses without venture capital.', members: 4200, rating: 4.8, category: 'Startup', isVerified: true },

    // Idea Exchange
    { id: 'idea-1', name: 'Idea Circle', description: 'A brainstorming hub to share, refine, and validate new ideas.', members: 5500, rating: 4.4, category: 'Idea Exchange' },
    { id: 'idea-2', name: 'Innovate & Create', description: 'Where ideas take flight. Join us to build the future.', members: 4800, rating: 4.6, category: 'Idea Exchange', isVerified: true },
    { id: 'idea-3', name: 'Concept Corner', description: 'A space for raw ideas and conceptual thinking.', members: 3200, rating: 4.3, category: 'Idea Exchange' },
    
    // Design
    { id: 'design-1', name: 'UI/UX Guild', description: 'A community for designers to share work, get feedback, and discuss trends.', members: 14000, rating: 4.9, category: 'Design', isVerified: true },
    { id: 'design-2', name: 'Pixel Perfect', description: 'For digital artists, illustrators, and graphic designers.', members: 8000, rating: 4.7, category: 'Design' },
    { id: 'design-3', name: 'Motion Masters', description: 'Animation, motion graphics, and everything that moves.', members: 6500, rating: 4.8, category: 'Design', isVerified: true },
    { id: 'design-4', name: 'Creative Canvas', description: 'A place for all creative designers to share their passion.', members: 11000, rating: 4.6, category: 'Design' },

    // Business
    { id: 'business-1', name: 'Market Movers', description: 'Analyzing market trends, business strategies, and corporate news.', members: 13000, rating: 4.5, category: 'Business', isVerified: true },
    { id: 'business-2', name: 'Sales Superstars', description: 'Sharing tips, techniques, and success stories in sales.', members: 9000, rating: 4.7, category: 'Business' },
    { id: 'business-3', name: 'Growth Hackers Inc.', description: 'Innovative strategies for rapid business growth.', members: 11500, rating: 4.8, category: 'Business', isVerified: true },
];

const mockMyCommunities: MyCommunity[] = Array.from({ length: 8 }).map((_, i) => ({
    id: `my-c-${i}`,
    name: 'AI ClubTech',
    latestMessage: "What's Up Guys...?",
    timestamp: 'Yesterday',
    hasNotification: true,
    avatarUrl: `https://picsum.photos/seed/${i+30}/200/200`
}));

type CommunityView = 'main' | 'search' | 'my-communities' | 'category-detail';

const CommunitiesPage = () => {
    const [view, setView] = useState<CommunityView>('main');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isFabOpen, setIsFabOpen] = useState(false);

    const categories = [...new Set(mockCommunities.map(c => c.category))];

    const navigateTo = (newView: CommunityView, category: string | null = null) => {
        setView(newView);
        if (category) {
            setSelectedCategory(category);
        }
    };

    const renderHeader = (title: string, onBack: () => void) => (
        <div className="p-4 sticky top-0 bg-invox-dark z-10">
            <div className="flex items-center mb-4">
                <button onClick={onBack} className="mr-4 text-white">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-white">{title}</h1>
            </div>
             <input
                type="search"
                placeholder="Search Communities or Domains"
                className="w-full bg-invox-dark-accent border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-invox-red text-white"
            />
            <DomainFilter />
        </div>
    );

    const renderMainView = () => (
        <div className="p-4 space-y-6">
            <div className="space-y-2">
                 <button className="w-full flex justify-between items-center bg-invox-dark-accent p-3 rounded-lg border border-gray-700">
                    <span className="font-semibold">Conference Notify</span>
                    <div className="flex items-center gap-2">
                        <span className="bg-invox-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">1</span>
                        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                    </div>
                </button>
                <button className="w-full flex justify-between items-center bg-invox-dark-accent p-3 rounded-lg border border-gray-700">
                    <span className="font-semibold">EveX Notify</span>
                    <div className="flex items-center gap-2">
                        <span className="bg-invox-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">1</span>
                        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                    </div>
                </button>
            </div>

            <div className="bg-invox-dark-accent rounded-lg p-4 border border-gray-700 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white">Leaderboard</h2>
                    <button className="mt-2 bg-invox-red text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-invox-red-hover">
                        View
                    </button>
                </div>
                <div className="w-24 h-16 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-full opacity-70 blur-md"></div>
            </div>

            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white">For You</h2>
                <FilterIcon className="w-5 h-5 text-gray-400" />
            </div>

            {categories.map(category => (
                <div key={category}>
                    <h3 className="text-md font-semibold text-white mb-3 cursor-pointer hover:text-invox-red" onClick={() => navigateTo('category-detail', category)}>{category}</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {mockCommunities.filter(c => c.category === category).map(community => (
                            <CommunityCard key={community.id} community={community} />
                        ))}
                    </div>
                </div>
            ))}
             <div className="h-24"></div> {/* Spacer for FAB */}
        </div>
    );

    const renderCategoryDetailView = () => (
        <div>
            {renderHeader(selectedCategory || 'Communities', () => navigateTo('main'))}
            <div className="p-4 space-y-4">
                {mockCommunities
                    .filter(c => c.category === selectedCategory)
                    .map(community => (
                        <div key={community.id} className="w-full">
                           <CommunityCard community={community} />
                        </div>
                    ))}
            </div>
        </div>
    );
    
    const renderSearchView = () => (
        <div>
            {renderHeader('Community Search', () => navigateTo('main'))}
             <div className="p-4">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">Suggestions</h2>
                    <FilterIcon className="w-5 h-5 text-gray-400" />
                </div>
                 {['Startup', 'Idea Exchange'].map(category => (
                    <div key={category}>
                        <h3 className="text-md font-semibold text-white mb-3">{category}</h3>
                        <div className="space-y-4">
                            {mockCommunities.filter(c => c.category === category).map(community => (
                                <div key={community.id} className="w-full">
                                   <CommunityCard community={community} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
             </div>
        </div>
    );

    const renderMyCommunitiesView = () => (
        <div>
            {renderHeader('My Communities', () => navigateTo('main'))}
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                     <button className="flex items-center gap-2 bg-invox-dark-accent p-2 rounded-lg border border-gray-700">
                        <span>Sort By Domain</span>
                        <ChevronDownIcon className="w-4 h-4" />
                     </button>
                     <GlobeAltIcon className="w-6 h-6 text-gray-400" />
                </div>
                <div className="space-y-2">
                    {mockMyCommunities.map(c => (
                        <div key={c.id} className="bg-invox-dark-accent p-3 rounded-lg flex items-center justify-between border border-gray-800">
                            <div className="flex items-center gap-3">
                                <img src={c.avatarUrl} alt={c.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold text-white">{c.name}</p>
                                    <p className="text-sm text-gray-400">{c.latestMessage}</p>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <p className="text-xs text-invox-red">{c.timestamp}</p>
                                {c.hasNotification && <span className="bg-invox-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mt-1">!</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (view) {
            case 'main': return renderMainView();
            case 'search': return renderSearchView();
            case 'category-detail': return renderCategoryDetailView();
            case 'my-communities': return renderMyCommunitiesView();
            default: return renderMainView();
        }
    };
    
    return (
        <div className="relative min-h-screen">
            {renderContent()}
            <div className="fixed bottom-24 right-4 z-20 flex flex-col items-center gap-3">
                 {isFabOpen && (
                    <>
                        <button onClick={() => navigateTo('search')} className="bg-invox-dark-accent p-3 rounded-full shadow-lg border border-gray-700">
                            <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                        </button>
                        <button onClick={() => navigateTo('my-communities')} className="bg-invox-dark-accent p-3 rounded-full shadow-lg border border-gray-700">
                            <UsersIcon className="w-6 h-6 text-white" />
                        </button>
                    </>
                 )}
                <button
                    onClick={() => setIsFabOpen(!isFabOpen)}
                    className="bg-invox-red p-4 rounded-full shadow-lg hover:bg-invox-red-hover transform hover:scale-110 transition-all duration-200"
                >
                    <PencilIcon className={`w-8 h-8 text-white transition-transform duration-300 ${isFabOpen ? 'rotate-45' : ''}`} />
                </button>
            </div>
        </div>
    );
};

export default CommunitiesPage;