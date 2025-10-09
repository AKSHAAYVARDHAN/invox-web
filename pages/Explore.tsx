
import React, { useState } from 'react';
import { FeedCard } from '../components/feed/FeedCard';
import DomainFilter from '../components/ui/DomainFilter';
import type { Post } from '../types';
import { PostType } from '../types';

const mockPosts: Post[] = [
    {
        id: '1',
        author: { name: 'Galaxies', avatarUrl: 'https://picsum.photos/id/1/200/200', isVerified: true },
        aiSummary: "Here Comes The One-Line Of The Content",
        content: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore.",
        mediaUrl: 'https://picsum.photos/seed/galaxy/800/450',
        mediaType: 'image',
        stats: { likes: 87200, views: 42300000, comments: 11200 },
        type: PostType.Feed,
        createdAt: new Date(),
    },
    {
        id: '2',
        author: { name: 'Albert Darwin', avatarUrl: 'https://picsum.photos/id/2/200/200', isVerified: true },
        aiSummary: "Here Comes The One-Line Of The Thread...",
        content: "Thread Description, A Fact About The World's Largest Forest. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore. Kut Labore.",
        mediaUrl: 'https://picsum.photos/seed/forest/800/450',
        mediaType: 'image',
        stats: { likes: 67200, views: 4230000, comments: 11200 },
        type: PostType.Thread,
        createdAt: new Date(),
    },
    {
        id: '3',
        author: { name: 'Wozniak', avatarUrl: 'https://picsum.photos/id/3/200/200', isVerified: true },
        aiSummary: "Here Comes The One-Line Of The Query...",
        content: "Query Description Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore. Lorem Ipsum Dolor Sit Amet.",
        mediaUrl: 'https://picsum.photos/seed/future/800/450',
        mediaType: 'image',
        stats: { likes: 87200, views: 4230000, comments: 11200 },
        type: PostType.Query,
        createdAt: new Date(),
    }
];

const ExplorePage = () => {
    const [activeTab, setActiveTab] = useState('Feeds');
    const [activeSubTab, setActiveSubTab] = useState('All');

    const filteredPosts = mockPosts.filter(post => {
        if (activeTab === 'Feeds') return post.type === PostType.Feed;
        if (activeTab === 'Discover') {
            if (activeSubTab === 'All') return post.type === PostType.Thread || post.type === PostType.Query;
            if (activeSubTab === 'Threads') return post.type === PostType.Thread;
            if (activeSubTab === 'Queries') return post.type === PostType.Query;
        }
        return false;
    });

    return (
        <div className="p-4">
            <DomainFilter />
            <div className="mb-4">
                 <div className="flex space-x-2 border border-gray-700 rounded-lg p-1 bg-invox-dark-accent">
                    <button 
                        onClick={() => setActiveTab('Feeds')} 
                        className={`w-1/2 py-2 rounded-md transition-colors ${activeTab === 'Feeds' ? 'bg-invox-red text-white' : 'text-gray-400'}`}
                    >
                        Feeds
                    </button>
                    <button 
                        onClick={() => setActiveTab('Discover')}
                        className={`w-1/2 py-2 rounded-md transition-colors ${activeTab === 'Discover' ? 'bg-invox-red text-white' : 'text-gray-400'}`}
                    >
                        Discover
                    </button>
                </div>
            </div>

            {activeTab === 'Discover' && (
                <div className="mb-4">
                    <div className="flex space-x-2 border border-gray-700 rounded-lg p-1 bg-invox-dark-accent">
                        <button onClick={() => setActiveSubTab('All')} className={`flex-1 py-2 rounded-md transition-colors ${activeSubTab === 'All' ? 'bg-invox-red text-white' : 'text-gray-400'}`}>All</button>
                        <button onClick={() => setActiveSubTab('Threads')} className={`flex-1 py-2 rounded-md transition-colors ${activeSubTab === 'Threads' ? 'bg-invox-red text-white' : 'text-gray-400'}`}>Threads</button>
                        <button onClick={() => setActiveSubTab('Queries')} className={`flex-1 py-2 rounded-md transition-colors ${activeSubTab === 'Queries' ? 'bg-invox-red text-white' : 'text-gray-400'}`}>Queries</button>
                    </div>
                </div>
            )}
            
            <div>
                {filteredPosts.map(post => (
                    <FeedCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default ExplorePage;
