import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post-model';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn({ name: 'file_id' })
  fileId!: number;

  @Column({ name: 'file_name' })
  fileName!: string;

  @Column({ name: 'file_type' })
  fileType!: string;

  @Column({ name: 'file_url' })
  fileUrl!: string;

  @ManyToOne(() => Post, post => post.files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;
}
