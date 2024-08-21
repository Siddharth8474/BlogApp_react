const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');



// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(cors());


// setup multer
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'uploads') // save file to upload foldr
  },

  filename:(req,file,cb)=>{
    cb(null, Date.now() + path.extname(file.originalname)) // append timestamp to filename
  }
});


const upload = multer({ storage:storage })


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogplatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


// Define User and Post schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);


// Register user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  
  newUser.save()
    .then(() => res.status(201).json({ message: 'User registered successfully' }))
    .catch(err => res.status(500).json({ message: 'Registration failed', error: err }));
});


// Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  User.findOne({ username, password })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Login failed' });
      }
      res.status(200).json({ message: 'Login successful', userId: user._id });
    })
    .catch(err => res.status(500).json({ message: 'Login failed', error: err }));
});


// Create post

// app.post('/posts', (req, res) => {
//   console.log("receved data", req.body)
//   const { content, image, userId } = req.body;
  
app.post('/posts',upload.single('imageFile'),(req,res)=>{
console.log('data receved',req.body)

const {content,userId}=req.body
const image = req.body.image || (req.file ? `/uploads/${req.file.filename}` : null)

  const newPost = new Post({ content, image, userId });
  
  newPost.save()
    .then(() => res.status(201).json({ message: 'Post created successfully' }))
    .catch(err => res.status(500).json({ message: 'Failed to create post', error: err }));
});



// Get posts
app.get('/posts', (req, res) => {
  Post.find().populate('userId','username')
    .then(posts => res.status(200).json(posts))
    
    .catch(err => res.status(500).json({ message: 'Failed to retrieve posts', error: err }));
});

//serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
