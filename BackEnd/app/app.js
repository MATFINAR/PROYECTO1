import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
const app = express();

// Middleware para habilitar CORS con configuración específica

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", routes);
export default app;
