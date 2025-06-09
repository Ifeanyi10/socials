import { Response } from 'express';
import { AppDataSource } from '../auth';
import { User } from '../models/user-model';
import { Post } from '../models/post-model';
import { Comment } from '../models/comment-model';

export async function validateUser(userId: number, res: Response): Promise<User | null> {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ userId });
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return null;
  }
  return user;
}

export async function validaPost(postId: number, res: Response): Promise<Post | null> {
  const postRepo = AppDataSource.getRepository(Post);
  const post = await postRepo.findOneBy({ postId });
  if (!post) {
    res.status(404).json({ message: 'Post not found.' });
    return null;
  }
  return post;
}

export async function validateParentComment(commentId: number, res: Response): Promise<Comment | null> {
  const commentRepo = AppDataSource.getRepository(Comment);
  const comment = await commentRepo.findOneBy({ commentId });
  if (!comment) {
    res.status(404).json({ message: 'Parent comment not found.' });
    return null;
  }
  return comment;
}
