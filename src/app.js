import express from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cors from 'cors'

config();
const app = express();

//middlewares

app.use(express.json());

app.use(cors({
   // origin: process.env.ORIGIN_URL,
    credentials: true,
  }));
//Eliminar en produccion
app.use(morgan("dev"))
app.use('/api', appRouter)

export default app