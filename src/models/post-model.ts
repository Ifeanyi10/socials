import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, ManyToMany, JoinTable,
  JoinColumn
} from 'typeorm';
import { User } from './user-model';
import { File } from './file-model';
import { Hashtag } from './hashtag-model';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn({ name: 'post_id' })
  postId!: number;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'body', nullable: true })
  body!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => File, file => file.post)
  files!: File[];

  @ManyToMany(() => Hashtag, { cascade: true })
  @JoinTable({
    name: 'post_hashtag',
    joinColumn: { name: 'post_id', referencedColumnName: 'postId' },
    inverseJoinColumn: { name: 'hashtag_id', referencedColumnName: 'hashtagId' }
  })
  hashtags!: Hashtag[];
}
