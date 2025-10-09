import React from 'react';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export enum PostType {
  Feed = 'Feed',
  Thread = 'Thread',
  Query = 'Query',
  Poll = 'Poll',
}

export interface Post {
  id: string;
  author: {
    name:string;
    avatarUrl: string;
    isVerified?: boolean;
  };
  aiSummary: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  stats: {
    likes: number;
    views: number;
    comments: number;
  };
  type: PostType;
  createdAt: Date;
}

export interface Project {
    id: string;
    author: {
        name: string;
        avatarUrl: string;
        isVerified?: boolean;
    };
    aiSummary: string;
    description: string;
    imageUrl?: string;
    stats: {
        likes: number;
        views: number;
        comments: number;
    };
    createdAt: Date;
}

export interface Trend {
  id: string;
  domain: {
    name: string;
    icon: React.FC<{ className?: string }>;
  };
  title: string;
  summary: string;
  fullContent: string;
  imageUrl: string;
  imageOverlayUrl: string;
  stats: {
    likes: number;
    views: number;
    comments: number;
  };
  details: {
    publishedBy: string;
    publishedOn: string;
    link: string;
  };
  createdAt: Date;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  rating: number;
  category: string;
  isVerified?: boolean;
}

export interface MyCommunity {
  id: string;
  name: string;
  latestMessage: string;
  timestamp: string;
  hasNotification: boolean;
  avatarUrl: string;
}