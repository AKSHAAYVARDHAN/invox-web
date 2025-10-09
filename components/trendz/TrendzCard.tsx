
import React from 'react';
import type { Trend } from '../../types';
import {
    InformationCircleIcon,
    PencilSwooshIcon,
    EllipsisVerticalIcon,
    ChatBubbleBottomCenterTextIcon,
    ArrowUpIcon,
    TrendingUpIcon,
    ChatIcon,
    ArrowUturnLeftIcon,
    ShareIcon,
    BookmarkIcon
} from '../ui/Icons';

interface TrendzCardProps {
    trend: Trend;
    onClick: () => void;
}

const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num;
};

const TrendzCard: React.FC<TrendzCardProps> = ({ trend, onClick }) => {
    return (
        <div className="bg-invox-dark-accent rounded-lg overflow-hidden border border-gray-800 p-4 mb-4">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-3 text-invox-light-gray">
                <div className="flex items-center gap-2">
                    <trend.domain.icon className="w-5 h-5" />
                    <span className="font-semibold text-sm">{trend.domain.name}</span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="hover:text-white"><InformationCircleIcon className="w-5 h-5" /></button>
                    <button className="hover:text-white"><PencilSwooshIcon className="w-5 h-5" /></button>
                    <button className="hover:text-white"><EllipsisVerticalIcon className="w-5 h-5" /></button>
                </div>
            </div>

            {/* Content */}
            <div className="cursor-pointer" onClick={onClick}>
                <h2 className="text-xl font-bold text-white mb-2">
                    <span className="italic">"{trend.title}"</span>
                </h2>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {trend.summary}
                    <span className="text-invox-red font-semibold ml-1 cursor-pointer">Show more</span>
                </p>

                {/* Media */}
                <div className="relative rounded-lg overflow-hidden mb-4 group">
                    <img src={trend.imageUrl} alt={trend.title} className="w-full h-auto object-cover" />
                    <img src={trend.imageOverlayUrl} alt="Overlay" className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-white/50 bg-black/30 backdrop-blur-sm" />
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                        <button className="bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-invox-red transition-colors">
                            <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                        </button>
                        <button className="bg-invox-red rounded-full p-3 text-white hover:bg-invox-red-hover transition-colors">
                            <PencilSwooshIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Footer */}
            <div className="flex justify-between items-center text-invox-light-gray text-sm">
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
                <button className="hover:text-white"><ArrowUturnLeftIcon className="w-5 h-5" /></button>
                <button className="hover:text-white"><ShareIcon className="w-5 h-5" /></button>
                <button className="hover:text-white"><BookmarkIcon className="w-5 h-5" /></button>
            </div>
        </div>
    );
};

export default TrendzCard;
