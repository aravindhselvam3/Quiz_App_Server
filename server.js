import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router/route.js';
import connect from './database/conn.js';

// Load environment variables
dotenv.config();

// App initialization
const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Server is up and running!' });
});

// Start server only if DB connects
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to MongoDB:', error.message);
  });
