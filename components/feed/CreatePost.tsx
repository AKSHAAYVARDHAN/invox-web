
import React, { useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { ref, push, set } from 'firebase/database';
import { generatePostFromIdea, generateImageForPost } from '../../services/geminiService';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { UserIcon } from '../common/Icons';

const CreatePost: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateAndPost = async () => {
    if (!idea.trim() || !auth.currentUser) return;
    setIsGenerating(true);
    setError('');

    try {
      // 1. Generate post content from idea
      const generatedPost = await generatePostFromIdea(idea);
      if (!generatedPost) {
        throw new Error("AI failed to generate post content.");
      }
      
      // 2. Generate an image for the post
      const imageUrl = await generateImageForPost(generatedPost.content);

      // 3. Save to Firebase
      const postsRef = ref(db, 'posts');
      const newPostRef = push(postsRef);
      await set(newPostRef, {
        authorId: auth.currentUser.uid,
        authorEmail: auth.currentUser.email,
        oneLiner: generatedPost.oneLiner,
        content: generatedPost.content,
        imageUrl: imageUrl,
        timestamp: Date.now(),
        likes: 0,
        comments: 0,
        shares: 0,
      });

      setIdea(''); // Clear input on success
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 border-b border-invox-gray">
      <div className="flex space-x-4">
        <div className="w-12 h-12 bg-invox-gray rounded-full flex items-center justify-center flex-shrink-0 mt-2">
            <UserIcon />
        </div>
        <div className="w-full">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Drop an idea, and let AI turn it into a polished feed..."
            className="w-full bg-transparent text-lg placeholder-invox-light-gray focus:outline-none resize-none"
            rows={3}
          />
          <div className="flex justify-end items-center mt-2">
             {error && <p className="text-red-500 text-sm mr-4">{error}</p>}
            <div className="w-48">
              <Button onClick={handleGenerateAndPost} disabled={!idea.trim() || isGenerating}>
                {isGenerating ? <Loader /> : 'Generate & Post'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
