import * as express from 'express';
import AuthController from './Controllers/AuthController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Importar todos los controladores
app.use(AuthController);

export default app;
