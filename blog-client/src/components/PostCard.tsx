import { useState } from "react";
import { Heart, MessageCircle, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PostCardProps } from "@/types/types";



export function PostCard({
  id,
  username,
  content,
  imageUrl,
  likes,
  comments,
  userImage,
  onLike,
  isLiked = false }: PostCardProps) {

    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [liked, setLiked] = useState(isLiked);

    const handleLike = () => {
        setLiked(!liked);
        onLike(id);
    }

    const handleComment = () => {
        // Add comment logic here
        console.log("Comment:", comment);
        setComment("");
        setIsCommentOpen(false);
    }

    return (
        <>
        <div className="border rounded-lg overflow-hidden bg-white">
            <div className="p-4">
            <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                {userImage ? (
                    <img
                    src={userImage}
                    alt={username}
                    className="h-10 w-10 rounded-full object-cover"
                    />
                ) : (
                    <User className="h-6 w-6 text-slate-500" />
                )}
                </div>
                <div className="font-medium">{username}</div>
            </div>
            <p className="mt-3 text-slate-600">{content}</p>
            {imageUrl && (
                <div className="mt-3 -mx-4">
                <img
                    src={imageUrl}
                    alt="Post content"
                    className="w-full object-cover max-h-96"
                />
                </div>
            )}
            <div className="mt-4 flex items-center space-x-4">
                <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
                onClick={handleLike}
                >
                <Heart
                    className={cn(
                    "h-5 w-5",
                    liked ? "fill-red-500 text-red-500" : "text-slate-500"
                    )}
                />
                <span className="text-slate-600">{likes}</span>
                </Button>
                <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => setIsCommentOpen(true)}
                >
                <MessageCircle className="h-5 w-5 text-slate-500" />
                <span className="text-slate-600">{comments}</span>
                </Button>
            </div>
            </div>
        </div>

        <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Add a comment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
                <Textarea
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end">
                <Button onClick={handleComment}>Post Comment</Button>
                </div>
            </div>
            </DialogContent>
        </Dialog>
        </>
    );
}