require('dotenv').config();  // ✅ Load .env FIRST

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Allow all origins for dev
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ✅ Import Routes
const formRoutes = require('./routes/formRoutes');
const userRoutes = require('./routes/UserRoutes');
const responseRoutes = require('./routes/responseRoutes');
const analyzeRoute = require('./routes/analyzeRoute');

// ✅ Use Routes
app.use('/api/forms', formRoutes);
app.use('/api/users', userRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/analyze', analyzeRoute);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('Feedback Analyser API Running');
});

// ✅ Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));
