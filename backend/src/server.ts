

// // import 'dotenv/config';
// // import express from 'express';
// // import cors from 'cors';
// // import connectDB from './config/db';
// // import ocrRoutes from './routes/ocrRoutes';
// // import errorHandler from './utils/errorHandler';

// // const app = express();

// // connectDB();
// // app.use(cors());
// // app.use(express.json());
// // app.use('/api', ocrRoutes);
// // app.use(errorHandler);

// // const PORT = process.env.PORT || 7000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import connectDB from './config/db';
// import errorHandler from './utils/errorHandler';
// import { getOcrRoutes } from './routes/ocrRoutes';
// import { OcrService } from './services/ocrService';
// import { OcrRepository } from './repositories/ocrRepository';
// import { OcrController } from './controllers/ocrController';

// class App {
//   private app: express.Application;

//   constructor() {
//     this.app = express();
//     this.configure();
//     this.setupRoutes();
//     this.handleErrors();
//   }

//   private configure(): void {
//     connectDB();
//     this.app.use(cors());
//     this.app.use(express.json());
//   }

//   private setupRoutes(): void {
//     const ocrRepository = new OcrRepository();
//     const ocrService = new OcrService();
//     const ocrController = new OcrController(ocrService, ocrRepository);
//     const ocrRoutes = getOcrRoutes(ocrController);
//     this.app.use('/api', ocrRoutes);
//   }

//   private handleErrors(): void {
//     this.app.use(errorHandler);
//   }

//   public start(port: number): void {
//     this.app.listen(port, () => console.log(`Server running on port ${port}`));
//   }
// }

// const server = new App();
// const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 7000;
// server.start(PORT);











import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import errorHandler from './utils/errorHandler';
import ocrRoutes from './routes/ocrRoutes';


const app = express();

connectDB();
app.use(cors());
app.use(express.json());


app.use('/api', ocrRoutes);

app.use(errorHandler);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));