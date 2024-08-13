const express = require('express');
const mongoose = require ('mongoose');
const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes')
const cors = require('cors');
const app = express();
const {auth} = require('./middleware/auth')
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended : false}));

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', auth, reviewRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`))
