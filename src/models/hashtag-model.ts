import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Post } from './post-model';

@Entity({ name: 'hashtags' })
export class Hashtag {
  @PrimaryGeneratedColumn({ name: 'hashtag_id' })
  hashtagId!: number;

  @Column({ name: 'tag_text', unique: true })
  tagText!: string;

  @ManyToMany(() => Post, post => post.hashtags)
  posts!: Post[];
}
