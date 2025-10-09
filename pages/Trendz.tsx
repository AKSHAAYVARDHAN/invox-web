
import React, { useState } from 'react';
import type { Trend } from '../types';
import DomainFilter from '../components/ui/DomainFilter';
import TrendzCard from '../components/trendz/TrendzCard';
import TrendzDetail from '../components/trendz/TrendzDetail';
import { ShieldCheckIcon } from '../components/ui/Icons';

const mockTrends: Trend[] = [
    {
        id: '1',
        domain: { name: 'Health Care', icon: ShieldCheckIcon },
        title: "Super Skin Heals Wounds 90% In 4 Hours",
        summary: "Super skin, an advanced wound-healing technology, accelerates recovery by 90% within just 4 hours and fully repairs the tissue in 24, ensuring faster and more effective healing.",
        fullContent: "Super skin, an advanced wound-healing technology, accelerates recovery by 90% within just 4 hours and fully repairs the tissue in 24, ensuring faster and more effective healing. It enhances the natural healing process, repairing wounds up to 90% within just 4 hours. Whether for minor cuts, surgical recovery, or injuries, super skin promotes rapid repair, minimizes scarring, and promotes healthier skin regeneration in record time.",
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
        imageOverlayUrl: 'https://images.unsplash.com/photo-1612536539035-1a8335aa8823?q=80&w=1974&auto=format&fit=crop',
        stats: { likes: 87200, views: 42300000, comments: 11200 },
        details: {
            publishedBy: 'MedTech',
            publishedOn: '11-03-2025',
            link: 'https://x.com/Akshaay_24'
        },
        createdAt: new Date(),
    },
     {
        id: '2',
        domain: { name: 'Health Care', icon: ShieldCheckIcon },
        title: "AI Achieved 99% Accuracy Detecting Cancer",
        summary: "A Global Team Of Scientist Created An AI Model That Can Now Detect Cancer With 99.2% Accuracy Beating Even Doctors And Current Tools. It was trained on thousands of microscope images, covering everything from normal tissue.",
        fullContent: "A Global Team Of Scientist Created An AI Model That Can Now Detect Cancer With 99.2% Accuracy Beating Even Doctors And Current Tools. It was trained on thousands of microscope images, covering everything from normal tissue to malignant cells. This breakthrough promises earlier diagnosis, more effective treatment planning, and a significant step forward in the fight against cancer.",
        imageUrl: 'https://images.unsplash.com/photo-1532187643623-dbf263539446?q=80&w=2070&auto=format&fit=crop',
        imageOverlayUrl: 'https://images.unsplash.com/photo-1526253752538-345100688942?q=80&w=2070&auto=format&fit=crop',
        stats: { likes: 95600, views: 51200000, comments: 15800 },
        details: {
            publishedBy: 'AI Forward',
            publishedOn: '10-03-2025',
            link: 'https://x.com/Invox'
        },
        createdAt: new Date(),
    }
];

const categoryFilters = ['All', 'Technology', 'Health Care', 'Trading', 'Stock Market'];

const TrendzPage = () => {
    const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const handleSelectTrend = (trend: Trend) => {
        setSelectedTrend(trend);
    };

    const handleBack = () => {
        setSelectedTrend(null);
    };

    if (selectedTrend) {
        const similarTrends = mockTrends.filter(t => t.id !== selectedTrend.id);
        return (
            <div>
                <TrendzDetail trend={selectedTrend} onBack={handleBack} />
                <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-4">Similar Trendz</h3>
                    {similarTrends.map(trend => (
                         <TrendzCard key={trend.id} trend={trend} onClick={() => handleSelectTrend(trend)} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="p-4">
            <input
                type="search"
                placeholder="Search Trends or Domains"
                className="w-full bg-invox-dark-accent border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-invox-red text-white"
            />
            <DomainFilter />
            <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-4">
                {categoryFilters.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                            activeCategory === category
                                ? 'bg-invox-red text-white'
                                : 'bg-invox-dark-accent text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div>
                {mockTrends.map(trend => (
                    <TrendzCard key={trend.id} trend={trend} onClick={() => handleSelectTrend(trend)} />
                ))}
            </div>
        </div>
    );
};

export default TrendzPage;
