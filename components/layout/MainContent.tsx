
import React, { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../../services/firebaseConfig';
import CreatePost from '../feed/CreatePost';
import FeedItem from '../feed/FeedItem';
import { Post } from '../../types';
import Loader from '../common/Loader';

const MainContent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsRef = ref(db, 'posts');
    const listener = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postList = Object.keys(data)
          .map(key => ({
            id: key,
            ...data[key]
          }))
          .sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first
        setPosts(postList);
      } else {
        setPosts([]);
      }
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => {
      off(postsRef, 'value', listener);
    };
  }, []);

  return (
    <main className="w-3/5 border-r border-l border-invox-gray min-h-screen">
      <header className="sticky top-0 bg-invox-dark/80 backdrop-blur-sm border-b border-invox-gray p-4">
        <h2 className="text-2xl font-bold">Explore</h2>
      </header>
      
      <CreatePost />
      
      <div className="feed">
        {loading ? (
          <div className="flex justify-center p-10"><Loader /></div>
        ) : (
          posts.map(post => <FeedItem key={post.id} post={post} />)
        )}
        {posts.length === 0 && !loading && (
            <div className="text-center p-10 text-invox-light-gray">
                <p>No posts yet. Be the first to share an idea!</p>
            </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;
