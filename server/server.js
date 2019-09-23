const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors');
const users = require('./routes/api/users');
const articles = require('./routes/api/articles');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const projects = require('./routes/api/projects');
const comments = require('./routes/api/comments');

const app = express();
app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/articles', articles);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);
app.use('/api/projects', projects);
//app.use('/api/articlecomments', comments);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
