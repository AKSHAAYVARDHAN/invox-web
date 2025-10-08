
import React from 'react';
import { Post } from '../../types';
import { HeartIcon, MessageCircleIcon, RepeatIcon, SendIcon, MoreHorizontalIcon, UserIcon } from '../common/Icons';

interface FeedItemProps {
  post: Post;
}

const FeedItem: React.FC<FeedItemProps> = ({ post }) => {
  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((new Date().getTime() - timestamp) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "m";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
  };
  
  return (
    <article className="border-b border-invox-gray p-4 flex space-x-4">
       <div className="w-12 h-12 bg-invox-gray rounded-full flex items-center justify-center flex-shrink-0">
            <UserIcon />
        </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <span className="font-bold">{post.authorEmail.split('@')[0]}</span>
                <span className="text-invox-light-gray">@{post.authorEmail.split('@')[0]}</span>
                <span className="text-invox-light-gray">·</span>
                <span className="text-invox-light-gray">{timeAgo(post.timestamp)}</span>
            </div>
            <button className="text-invox-light-gray hover:text-white">
                <MoreHorizontalIcon />
            </button>
        </div>
        
        <div className="my-2">
            <h3 className="font-semibold text-lg text-invox-red">"{post.oneLiner}"</h3>
            <p className="text-invox-light-gray whitespace-pre-wrap">{post.content}</p>
        </div>

        {post.imageUrl && (
          <div className="mt-3 rounded-lg overflow-hidden border border-invox-gray">
            <img src={post.imageUrl} alt="Post visual" className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="flex justify-between mt-4 text-invox-light-gray">
          <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
            <MessageCircleIcon />
            <span>{post.comments}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-green-500 cursor-pointer">
            <RepeatIcon />
            <span>{post.shares}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
            <HeartIcon />
            <span>{post.likes}</span>
          </div>
          <div className="hover:text-invox-red cursor-pointer">
            <SendIcon />
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedItem;
