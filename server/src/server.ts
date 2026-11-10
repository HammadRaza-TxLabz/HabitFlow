
import 'dotenv/config';

import app from './app.js';
import connectDB from './config/db.js';

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start Express server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(
        `HabitFlow API running on port ${PORT}`
      );

      console.log(
        `Health check: http://localhost:${PORT}/api/health`
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);

    process.exit(1);
  }
};

startServer();
