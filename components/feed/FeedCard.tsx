
import React from 'react';
import type { Post } from '../../types';
import { HeartIcon, TrendingUpIcon, ChatIcon, ShareIcon } from '../ui/Icons';

interface FeedCardProps {
    post: Post;
}

const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num;
};

export const FeedCard: React.FC<FeedCardProps> = ({ post }) => {
    return (
        <div className="bg-invox-dark-accent rounded-lg overflow-hidden border border-gray-800 p-4 mb-4">
            <div className="flex items-center mb-3">
                <img src={post.author.avatarUrl} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <div className="flex items-center">
                        <p className="font-bold text-white">{post.author.name}</p>
                        {post.author.isVerified && <span className="ml-1 text-blue-500">✓</span>}
                    </div>
                    <p className="text-xs text-gray-400">{post.createdAt.toLocaleDateString()}</p>
                </div>
            </div>

            <p className="text-lg italic text-invox-light-gray mb-3">"{post.aiSummary}"</p>
            <p className="text-gray-300 mb-4">{post.content}</p>

            {post.mediaUrl && (
                <div className="rounded-lg overflow-hidden mb-4">
                    {post.mediaType === 'image' ? (
                        <img src={post.mediaUrl} alt="Post content" className="w-full h-auto object-cover" />
                    ) : (
                        <div className="w-full aspect-video bg-black flex items-center justify-center">
                             <p>Video content here</p>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-between items-center text-invox-light-gray">
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 hover:text-invox-red">
                        <HeartIcon className="w-5 h-5" />
                        <span>{formatNumber(post.stats.likes)}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                        <TrendingUpIcon className="w-5 h-5" />
                        <span>{formatNumber(post.stats.views)}</span>
                    </div>
                    <button className="flex items-center space-x-1 hover:text-white">
                        <ChatIcon className="w-5 h-5" />
                        <span>{formatNumber(post.stats.comments)}</span>
                    </button>
                </div>
                <button className="hover:text-white">
                    <ShareIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
