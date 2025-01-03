export interface Post {
    _id: string;
    title: string;
    content: string;
    image: string;
    createdAt: string;
    userId: {
      _id: string;
      username: string;
      email: string;
    },
    comments: [
      {
        _id: string;
        content: string;
        userId: string;
        postId: string;
        createdAt: string;
      }
    ],
    likes: [
      {
        _id: string;
        userId: string;
        createdAt: string;
      }
    ],
}



export interface PostCardProps {
  id: string;
  username: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  userImage?: string;
  onLike: (id: string) => void;
  isLiked?: boolean;
}