import { Request, Response, Router } from 'express';
import IAuthModel from '../Models/IAuthModel';
import AuthService from '../Services/auth/auth.service';

const AuthController = Router();
const rootPath = '/auth';

AuthController.post(`${rootPath}/login`, async (request: Request, response: Response) => {
    const credentials: IAuthModel = {
        email: request.body.email,
        password: request.body.password,
    };
    await AuthService.loginUser(credentials).then((result) => {
        response.status(200).send({ status: 'success', data: result.data });
    }).catch((error) => {
        response.status(error.status || 500).send({ status: 'failed', data: error.message });
    });
});

AuthController.post(`${rootPath}/validate`, async (request: Request, response: Response) => {
    const token = request.body.token;
    await AuthService.validateToken(token).then((result) => {
        response.status(200).send({ status: 'success', data: result.data });
    }).catch((error) => {
        response.status(error.status).send({ status: 'failed', data: error.message });
    });
});

export default AuthController;
