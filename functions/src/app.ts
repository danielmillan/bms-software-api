import * as express from 'express';
import AuthController from './Controllers/AuthController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importar todos los controladores
app.use(AuthController);

export default app;
