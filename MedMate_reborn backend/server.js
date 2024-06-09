const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const { authenticateUser } = require('./service/auth');
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());
app.use(cors());

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define upload destination
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  }
});

const upload = multer({ storage: storage });

// Import ticket routes
const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', upload.array('files'), ticketRoutes); // Apply multer to handle file uploads for ticket routes

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: API for user authentication
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Auth]
 *     summary: User Login
 *     description: Authenticate user and return token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Authentication error
 *       500:
 *         description: Internal server error
 */
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Received authentication request for user: ${username}`);

  try {
    const authResult = await authenticateUser(username, password);

    if (authResult.success) {
      console.log(`Successful authentication for user: ${username}`);
      res.status(200).json({ token: authResult.token });
    } else {
      console.log(`Authentication error for user: ${username}`);
      res.status(401).json({ message: authResult.message });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb://localhost:27017/medmate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Successfully connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

module.exports = app;
