
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        throw new Error(
            'MONGODB_URI is not defined in environment variables'
        );
    }

    const connection = await mongoose.connect(mongoURI, {
        dbName: 'habitflow',
    });
    console.log(
        `MongoDB connected: ${connection.connection.host}`
    );

    console.log(
        `Database: ${connection.connection.name}`
    );
};

export default connectDB;
