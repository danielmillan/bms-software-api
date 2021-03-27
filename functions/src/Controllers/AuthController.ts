import { Request, Response, Router } from 'express';

const AuthController = Router();
const rootPath = '/auth';

AuthController.get(`${rootPath}/login`, async (request: Request, response: Response) => {
    //const name = request.params.name;
    response.status(200).send('Servicio de autenticación arriba');
});

export default AuthController;
