import { Request, Response, Router } from 'express';

const AuthController = Router();
const rootPath = '/auth';

AuthController.get(`${rootPath}/saludo`, async (request: Request, response: Response) => {
    //const name = request.params.name;
    response.status(404).send('No encontrado');
});

export default AuthController;
