
import React from 'react';
import type { Trend } from '../../types';
import { ArrowLeftIcon, PlayIcon, ShareIcon, BookmarkIcon, ArrowUpIcon, TrendingUpIcon, ChatIcon } from '../ui/Icons';

interface TrendzDetailProps {
    trend: Trend;
    onBack: () => void;
}

const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num;
};

const TrendzDetail: React.FC<TrendzDetailProps> = ({ trend, onBack }) => {
    return (
        <div className="p-4">
            <button onClick={onBack} className="flex items-center gap-2 mb-4 text-invox-light-gray hover:text-white">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            
            <div className="rounded-lg overflow-hidden mb-4">
                <img src={trend.imageUrl} alt={trend.title} className="w-full h-auto object-cover" />
                <img src={trend.imageOverlayUrl} alt="Overlay" className="relative -mt-16 ml-4 w-20 h-20 rounded-full border-4 border-invox-dark bg-black/30 backdrop-blur-sm" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-3">{trend.title}</h1>
            <p className="text-gray-300 mb-6 leading-relaxed">{trend.fullContent}</p>

            <div className="flex justify-between items-center text-invox-light-gray border-y border-gray-800 py-3 mb-6">
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 hover:text-invox-red">
                        <ArrowUpIcon className="w-5 h-5" />
                        <span>{formatNumber(trend.stats.likes)}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                        <TrendingUpIcon className="w-5 h-5" />
                        <span>{formatNumber(trend.stats.views)}</span>
                    </div>
                    <button className="flex items-center space-x-1 hover:text-white">
                        <ChatIcon className="w-5 h-5" />
                        <span>{formatNumber(trend.stats.comments)}</span>
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                     <button className="hover:text-white"><ShareIcon className="w-5 h-5" /></button>
                     <button className="hover:text-white"><BookmarkIcon className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="bg-invox-dark-accent p-4 rounded-lg border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4">DETAILS</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                        <PlayIcon className="w-4 h-4 text-invox-light-gray" />
                        <span className="text-gray-400">Published by :</span>
                        <span className="text-white font-semibold">{trend.details.publishedBy}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <PlayIcon className="w-4 h-4 text-invox-light-gray" />
                        <span className="text-gray-400">Published on :</span>
                        <span className="text-white font-semibold">{trend.details.publishedOn}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <PlayIcon className="w-4 h-4 text-invox-light-gray" />
                        <span className="text-gray-400">Links :</span>
                        <a href={trend.details.link} target="_blank" rel="noopener noreferrer" className="text-invox-red hover:underline truncate">{trend.details.link}</a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TrendzDetail;
