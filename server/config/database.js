import mongoose from 'mongoose';


export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('Connection to Database Established!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};