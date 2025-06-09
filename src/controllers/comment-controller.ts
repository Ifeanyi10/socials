import { Request, Response } from 'express';
import { AppDataSource } from '../auth';
import { Comment } from '../models/comment-model';
import { validaPost, validateParentComment, validateUser } from '../utils/controller-validations';

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId, userId, comment } = req.body;

    // 1. confirm all required data is included in the payload
    if (!postId || !userId || !comment) {
      res.status(400).json({ message: 'postId, userId, and comment are required.' });
      return;
    }

    // 2. valid that post and user exist
    const post = await validaPost(postId, res);
    const user = await validateUser(userId, res);

    if (!post || !user) return;

    const commentRepo = AppDataSource.getRepository(Comment);

    // 3. create and save the comment
    const newComment = commentRepo.create({ post, user, comment });
    await commentRepo.save(newComment);

    // 4. Respond to client
    res.status(201).json({ message: 'Comment added', comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const replyToComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId, userId, comment, parentCommentId } = req.body;

    if (!postId || !userId || !comment || !parentCommentId) {
      res.status(400).json({ message: 'postId, userId, comment, and parentCommentId are required.' });
      return;
    }

    const post = await validaPost(postId, res);
    const user = await validateUser(userId, res);
    const parentComment = await validateParentComment(parentCommentId, res);

    if (!post || !user || !parentComment) return;

    const commentRepo = AppDataSource.getRepository(Comment);
    const reply = commentRepo.create({ post, user, comment, parentComment });

    await commentRepo.save(reply);
    res.status(201).json({ message: 'Reply added', reply });

  } catch (error) {
    console.error('Error replying to comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
