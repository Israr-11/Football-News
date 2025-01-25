import express from 'express';
import newsRoutes from './routes/newsRoutes';
import { databaseConnection } from './config/database';
import cors from 'cors';

databaseConnection();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/', newsRoutes);

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
