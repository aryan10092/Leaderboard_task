# 🏆 Leaderboard System

A real-time leaderboard system where users can claim random points and see live rankings. Built with Node.js backend and React.js frontend.

## 🌟 Features

- **User Selection**: Choose from existing users or add new ones
- **Random Points**: Claim 1-10 random points per click
- **Live Rankings**: Real-time leaderboard updates using Socket.IO
- **Claim History**: Track all point claims with timestamps
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Database Storage**: MongoDB for persistent data storage

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Socket.IO** - Real-time communication
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Socket.IO Client** - Real-time updates
- **Axios** - HTTP client
- **Modern CSS** - Responsive styling with gradients and animations

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher) installed
- **MongoDB** installed and running on your system
- **npm** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Leaderboard_task
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (backend + frontend)
npm run install-all
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/leaderboard_db
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows
mongod

# On macOS/Linux
sudo service mongod start
```

### 5. Run the Application
```bash
# Run both backend and frontend simultaneously
npm run dev

# Or run separately:
# Backend only
npm run server

# Frontend only
npm run client
```

## 🎯 Usage

1. **Access the Application**: Open your browser and go to `http://localhost:3000`

2. **View Initial Users**: The system comes pre-loaded with 10 users:
   - Rahul, Kamal, Sanak, Priya, Amit, Sneha, Vikram, Anita, Rohit, Kavya

3. **Claim Points**:
   - Select a user from the dropdown
   - Click "🎲 Claim Random Points"
   - Watch the leaderboard update in real-time

4. **Add New Users**:
   - Enter a name in the "Add New User" section
   - Click "Add User"
   - The new user appears in the system immediately

5. **View History**:
   - Click "Show Claim History" to see recent point claims
   - Refresh the history as needed

## 🔧 API Endpoints

### Users
- `GET /api/users` - Get all users with rankings
- `POST /api/users` - Add a new user
- `GET /api/users/:id` - Get user by ID

### Claims
- `POST /api/claims` - Claim points for a user
- `GET /api/claims/history` - Get claim history
- `GET /api/claims/stats` - Get claiming statistics

### Health Check
- `GET /api/health` - Server health check

## 📁 Project Structure

```
Leaderboard_task/
├── backend/
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── ClaimHistory.js   # Claim history schema
│   ├── routes/
│   │   ├── users.js          # User routes
│   │   └── claims.js         # Claim routes
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserSelector.js      # User selection dropdown
│   │   │   ├── ClaimButton.js       # Points claiming button
│   │   │   ├── Leaderboard.js       # Rankings display
│   │   │   ├── Leaderboard.css      # Leaderboard styles
│   │   │   ├── AddUser.js           # Add user form
│   │   │   ├── ClaimHistory.js      # Claim history display
│   │   │   └── ClaimHistory.css     # History styles
│   │   ├── App.js            # Main app component
│   │   ├── App.css           # Main app styles
│   │   └── index.js          # React entry point
│   └── package.json          # Frontend dependencies
├── package.json              # Root package.json
└── README.md                 # This file
```

## 🎨 Features in Detail

### Real-Time Updates
- Live leaderboard updates when anyone claims points
- Instant notifications for successful point claims
- Auto-refresh of rankings across all connected clients

### User Management
- Add unlimited users dynamically
- Duplicate user name prevention
- Automatic ranking calculation

### Point System
- Random points between 1-10 per claim
- Cumulative point tracking
- Complete claim history with timestamps

### Beautiful UI
- Modern gradient design
- Responsive layout for all devices
- Smooth animations and transitions
- Gold/Silver/Bronze styling for top 3 ranks

## 🔍 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (unique),
  totalPoints: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### ClaimHistory Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  userName: String,
  pointsAwarded: Number (1-10),
  claimDate: Date (default: now),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - Verify database permissions

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill existing processes using the port

3. **Socket.IO Connection Issues**
   - Check if both frontend and backend are running
   - Verify CORS configuration
   - Check firewall settings

4. **Dependencies Issues**
   - Delete `node_modules` and run `npm install` again
   - Clear npm cache: `npm cache clean --force`

## 📝 Development

### Adding New Features
1. Backend changes go in the `backend/` directory
2. Frontend changes go in the `frontend/src/` directory
3. Update this README for any major changes

### Available Scripts
- `npm run dev` - Run both backend and frontend
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm run install-all` - Install all dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Enjoy the Leaderboard!

Start claiming points and watch the rankings change in real-time! 🚀 