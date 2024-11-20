import mongoose from 'mongoose';

const connectionString = 'mongodb://127.0.0.1:27017/beksploreDB';

mongoose.connect(connectionString);

export default mongoose.connection;