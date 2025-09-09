


import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import errorHandler from './utils/errorHandler';
import ocrRoutes from './routes/ocrRoutes';


const app = express();

connectDB();

app.use(cors({
  origin: [process.env.FRONTEND_URI as string], 
  methods: ["GET", "POST"],
  credentials: true
}));


app.use(express.json());


app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

app.use('/api', ocrRoutes);

app.use(errorHandler);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





