
export interface Post {
  id: string;
  authorId: string;
  authorEmail: string;
  oneLiner: string;
  content: string;
  imageUrl: string;
  timestamp: number;
  likes: number;
  comments: number;
  shares: number;
}
