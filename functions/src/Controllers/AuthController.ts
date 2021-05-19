import { Request, Response, Router } from 'express';
import Authorization from '../middlewares/Authorization';
import IAuthModel from '../Models/IAuthModel';
import IResponseModel from '../Models/IResponseModel';
import AuthService from '../Services/auth/auth.service';
import { manageError } from '../utilities/ManageError';

const AuthController = Router();
const rootPath = '/auth';

AuthController.post(`${rootPath}/login`, async (request: Request, response: Response) => {
    const credentials: IAuthModel = {
        email: request.body.email,
        password: request.body.password,
    };
    try {
        const resultService = await AuthService.loginUser(credentials);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        error.message = 'Las credenciales son incorrectas.';
        manageError(response, error);
    }
});

AuthController.post(`${rootPath}/validate`, async (request: Request, response: Response) => {
    const token = request.body.token;
    try {
        const resultService = await AuthService.validateToken(token);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

AuthController.get(`${rootPath}/account`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const identificationUser = response.locals.identification;
    try {
        const resultService = await AuthService.getProfileFromUser(identificationUser);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

AuthController.get(`${rootPath}/security`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const identification = response.locals.identification;
    try {
        const resultService =  await AuthService.getSecurityPermissions(identification);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

AuthController.post(`${rootPath}/resetpassword`, async (request: Request, response: Response) => {
    const email = request.body.email;
    try {
        const resultService = await AuthService.resetPassword(email);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

export default AuthController;
