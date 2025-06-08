INSERT INTO users (username, email)
VALUES 
  ('john_doe', 'john@paulsoft.com'),
  ('jane_smith', 'jane@twitter.com'),
  ('harry_ben', 'hary@example.com');

INSERT INTO posts (user_id, title, body)
VALUES 
  (1, 'First Post', 'This is the body of the first post'),
  (2, 'Another Summer', 'Here is another summer. Let us celebrate!'),
  (1, 'New Session', 'New session starts in September');

-- Top-level comments
INSERT INTO comments (post_id, user_id, comment)
VALUES 
  (1, 2, 'Nice first post, keep it up!'),
  (2, 2, 'Great post, thanks for sharing!'),
  (3, 3, 'Interesting read.');

-- Nested comment (reply to comment 1)
INSERT INTO comments (post_id, user_id, parent_comment_id, comment)
VALUES 
  (1, 1, 1, 'Thanks for the feedback!');

INSERT INTO files (post_id, file_name, file_type, file_url)
VALUES 
  (1, 'sample-file.pdf', 'application/pdf', '/files/sample-file.pdf'),
  (2, 'image1.png', 'image/png', '/files/image1.png');

INSERT INTO hashtags (tag_text)
VALUES 
  ('#nodejs'),
  ('#typescript'),
  ('#backend'),
  ('#labc');

-- Linking post 1 to hashtags
INSERT INTO post_hashtag (post_id, hashtag_id)
VALUES 
  (1, 1),  -- #nodejs
  (1, 2);  -- #typescript

-- Linking post 2 to #backend and #typescript
INSERT INTO post_hashtag (post_id, hashtag_id)
VALUES 
  (2, 3),
  (2, 2);

-- Linking post 3 to #labc and #typescript
INSERT INTO post_hashtag (post_id, hashtag_id)
VALUES 
  (3, 4);
