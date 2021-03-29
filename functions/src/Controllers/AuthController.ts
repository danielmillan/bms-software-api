import { Request, Response, Router } from 'express';

const AuthController = Router();
const rootPath = '/auth';

AuthController.post(`${rootPath}/login`, async (request: Request, response: Response) => {
    response.status(200).send('Servicio de autenticación arriba');
});

export default AuthController;
