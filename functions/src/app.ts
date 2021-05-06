import * as express from 'express';
import AuthController from './Controllers/AuthController';
import UsersController from './Controllers/UsersController';
import AccountController from './Controllers/AccountController';
import RolesController from './Controllers/RolesController';
import ChargesController from './Controllers/ChargesController';
import CollaboratorsController from './Controllers/CollaboratorsController';
import OfficesController from './Controllers/OfficesController';
import ModulesController from './Controllers/ModulesController';
import DepartmentsController from './Controllers/DepartmentsController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Importar todos los controladores
app.use(AuthController);
app.use(UsersController);
app.use(AccountController);
app.use(RolesController);
app.use(ChargesController);
app.use(CollaboratorsController);
app.use(OfficesController);
app.use(ModulesController);
app.use(DepartmentsController);

export default app;
