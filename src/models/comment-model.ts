import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn
} from 'typeorm';
import { Post } from './post-model';
import { User } from './user-model';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  commentId!: number;

  @Column({ name: 'comment' })
  comment!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Comment, { nullable: true })
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment?: Comment;
}
