
import express, {
    type Request,
    type Response,
} from 'express';

import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get(
    '/api/health',
    (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'HabitFlow API is running',
            timestamp: new Date().toISOString(),
        });
    }
);

export default app;
