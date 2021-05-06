import { Request, Response, Router } from 'express';
import Authorization from '../middlewares/Authorization';
import IAuthModel from '../Models/IAuthModel';
import IResponseModel from '../Models/IResponseModel';
import AuthService from '../Services/auth/auth.service';

const AuthController = Router();
const rootPath = '/auth';

AuthController.post(`${rootPath}/login`, async (request: Request, response: Response) => {
    const credentials: IAuthModel = {
        email: request.body.email,
        password: request.body.password,
    };
    await AuthService.loginUser(credentials).then(async (result) => {
        const responseServer: IResponseModel = {
            status: result.status,
            code: result.code,
            data: result.data,
        };
        response.status(200).send(responseServer);
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: 'Las credenciales son incorrectas.',
        };
        response.status(responseServer.status).send(responseServer);
    });
});

AuthController.post(`${rootPath}/validate`, async (request: Request, response: Response) => {
    const token = request.body.token;
    await AuthService.validateToken(token).then(async (result) => {
        const responseServer: IResponseModel = {
            status: result.status,
            code: result.code,
            data: result.data,
        };
        response.status(200).send(responseServer);
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(responseServer.status).send(responseServer);
    });
});

AuthController.get(`${rootPath}/account`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const identificationUser = response.locals.identification;
    await AuthService.getProfileFromUser(identificationUser).then((data) => {
        response.status(200).send(data);
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(responseServer.status).send(responseServer);
    });
});

AuthController.get(`${rootPath}/security`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const identification = response.locals.identification;
    await AuthService.getSecurityPermissions(identification).then((data) => {
        response.status(200).send(data);
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(responseServer.status).send(responseServer);
    });
});

AuthController.post(`${rootPath}/resetpassword`, async (request: Request, response: Response) => {
    const email = request.body.email;
    await AuthService.resetPassword(email).then((result) => {
        const responseServer: IResponseModel = {
            status: 200,
            data: result,
        };
        response.status(200).send(responseServer);
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(responseServer.status).send(responseServer);
    });
});

export default AuthController;
