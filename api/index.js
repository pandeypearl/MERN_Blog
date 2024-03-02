const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const salt = bcrypt.genSaltSync(10);
const secret = 'adfjsdfhkadsfaksdfbdfdhf';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

require('dotenv').config();
const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString);

app.post('/register', async (req, res) => {
  const {username, password} = req.body;
  try {
    const userDoc = await User.create({
      username, 
      password:bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  };
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({username,id:userDoc._id}, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('Invalid credentials');
  }
});

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const {title, summary, content} = req.body;
    // const sharableLink = generateSharableLink();
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id,
      viewCount: 0,
      // sharableLink,
    });

    // Generating unique sharable link
    const uniqueId = uuidv4();
    const sharableLink = `http://localhost:3000/post/${postDoc._id}/share/${uniqueId}`;
    
    // Updating post with sharable link
    await postDoc.updateOne({ sharableLink });

    res.json(postDoc);
  });
});

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const {id, title, summary, content, viewCount} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('You do not have permission to edit this post')
    }
    const sharableLink = generateSharableLink();
    await postDoc.updateOne({
      title, 
      summary, 
      content,
      cover: newPath ? newPath : postDoc.cover,
      viewCount: viewCount || postDoc.viewCount,
      sharableLink,
    });

    const updatedPost = await Post.findById(id);

    res.json(updatedPost);
  });
})

app.get('/post', async (req, res) => {
  res.json(await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});


app.post('/post/:id/updateViewCount', async (req, res) => {
  const { id } = req.params;
  const {token} = req.cookies; // Assuming the JWT token is stored in a cookie named 'token'

  try {
    if (!token) {
      return res.status(401).json({ error: 'JWT token is missing' });
    }

    // Verify JWT token
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid JWT token' });
      }

      // Find the post by its ID and update the view count field
      const updatedPost = await Post.findByIdAndUpdate(id, { $inc: { viewCount: 1 } }, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Respond with the updated post
      res.json(updatedPost);
    });
  } catch (error) {
    console.error('Error updating view count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to generate sharable link
function generateSharableLink() {
  const uniqueId = uuidv4();
  return `http:localhost:3000/post/${id}/share/${uniqueId}`;
}

// app.post('/post/:id/share', async (req, res) => {
//   try{
//     const { id } = req.params;
//     // Generating unique sharable link
//     const uniqueId = uuidv4();
//     const sharableLink = `http:localhost:3000/post/${id}/share/${uniqueId}`;

//     // Updating post with sharable link
//     await Post.findByIdAndUpdate(id, { sharableLink });
//     res.status(200).json({ sharableLink });
//   } catch (error) {
//     console.error('Error sharing post:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// Backend route to handle visits to sharable link
app.get('/post/:postId/share/:shareId', async (req, res) => {
  const { postId } = req.params;

  try {
    // Fetch the post associated with the postId
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Render the post page or send the post data to the frontend
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(4000);
