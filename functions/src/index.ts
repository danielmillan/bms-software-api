import * as functions from "firebase-functions";
import firebase from 'firebase';
import config from './config';
// Server
import * as express from 'express';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';
import AuthController from './Controllers/AuthController';
import UsersController from './Controllers/UsersController';
import AccountController from './Controllers/AccountController';
import RolesController from './Controllers/RolesController';
import ChargesController from './Controllers/ChargesController';
import CollaboratorsController from './Controllers/CollaboratorsController';
import OfficesController from './Controllers/OfficesController';
import ModulesController from './Controllers/ModulesController';
import DepartmentsController from './Controllers/DepartmentsController';

// Init express and firebase
const firebaseObject = config.firebaseApp;
firebase.initializeApp(firebaseObject);
const app = express();

// Add middlewares
app.use(fileUpload());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

export const api = functions.https.onRequest(app);
