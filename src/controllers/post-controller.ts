import { Request, Response } from 'express';
import { AppDataSource } from '../auth';
import { Post } from '../models/post-model';
import { File } from '../models/file-model';
import { Hashtag } from '../models/hashtag-model';
import { User } from '../models/user-model'; 

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, body, hashtags } = req.body;
    const uploadedFile = req.file;
    const userId = 1; // TODO: Replace with actual user (from auth or request context)

    // 1. Validate title
    if (!title) {
      res.status(400).json({ message: 'Post title is required.' });
      return;
    }

    // 2. Validate and fetch user
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ userId });
    if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
    }

    // 3. If a file was uploaded, validate type
    if (uploadedFile) {
      const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

      if (!allowedMimeTypes.includes(uploadedFile.mimetype)) {
        res.status(400).json({ message: 'Unsupported file type. Only PDF, JPG, and PNG are allowed.'});
        return;
      }

      // Stub for malware scanning
      // --------------------------------------------------------
      // const isMalicious = await scanFileForMalware(uploadedFile.path);
      // if (isMalicious) {
      //     res.status(400).json({ message: 'File failed malware scan.' });
      //     return;
      // }
      // --------------------------------------------------------
    }

    // 4. Create the post
    const postRepo = AppDataSource.getRepository(Post);
    const fileRepo = AppDataSource.getRepository(File);
    const hashtagRepo = AppDataSource.getRepository(Hashtag);

    const post = postRepo.create({ title, body, user });

    // 5. Handle hashtags
    if (hashtags) {
      const tagList = hashtags.split(' ').map((t: string) => t.trim().toLowerCase());
      const tagEntities: Hashtag[] = [];

      for (const tag of tagList) {
        let existing = await hashtagRepo.findOneBy({ tagText: tag });
        if (!existing) {
          existing = hashtagRepo.create({ tagText: tag });
          await hashtagRepo.save(existing);
        }
        tagEntities.push(existing);
      }

      post.hashtags = tagEntities;
    }

    // 6. Save post first (to get post_id for file relation)
    const savedPost = await postRepo.save(post);

    if (!savedPost.postId) {
        res.status(501).json({message: 'Unable to save post'});
        return;
    }

    // 7. Save file metadata if uploaded
    if (uploadedFile) {
      const file = fileRepo.create({
        fileName: uploadedFile.originalname,
        fileType: uploadedFile.mimetype,
        fileUrl: `/files/${uploadedFile.filename}`,
        post: post
      });
      await fileRepo.save(file);
    }

    // 8. Respond to client
    res.status(201).json({ message: 'Post created', post });

  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
