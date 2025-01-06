const express = require("express");
const cors = require('cors'); 
const authRoutes = require("./routes/authRoutes");
const postsRoutes = require("./routes/postsRoutes");
const notificationRoutes = require("./routes/notification-route-file");
const contactUsRoutes = require("./routes/contact-us-route-file");
const commentsRoutes = require('./routes/commentsRoutes'); 
const roleRoutes = require("./routes/roleRoutes");
const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  credentials: true, 
}));

app.options('*', cors());

app.use(express.json());  

app.use("/uploads", express.static("uploads"));
app.use('/api/auth', authRoutes);  
app.use('/api/posts', postsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/contact-us", contactUsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/roles', roleRoutes);

module.exports = app;
