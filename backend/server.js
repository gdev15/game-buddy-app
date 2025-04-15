const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const profileRoutes = require('./routes/profile');
const lfgRoutes = require('./routes/lfgRoutes'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/profile', profileRoutes);
app.use('/api/lfg', lfgRoutes);

// const messages = require('./routes/messages');
// app.use('/api/messages', messages);
const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
