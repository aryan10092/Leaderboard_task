const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://leaderboard-task-khtd.vercel.app/",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leaderboard_db';

app.use(cors());
app.use(express.json());

app.set('io', io);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedInitialUsers();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const userRoutes = require('./routes/users');
const claimRoutes = require('./routes/claims');

app.use('/api/users', userRoutes);
app.use('/api/claims', claimRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const seedInitialUsers = async () => {
  const User = require('./models/User');
  
  const initialUsers = [
    'Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit', 
    'Sneha', 'Vikram', 'Anita', 'Rohit', 'Kavya'
  ];

  try {
    const existingUsers = await User.find();
    if (existingUsers.length === 0) {
      const users = initialUsers.map(name => ({ name, totalPoints: 0 }));
      await User.insertMany(users);
      console.log('Initial users seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
