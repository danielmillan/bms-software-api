import { Request, Response, Router } from 'express';
import Authorization from '../middlewares/Authorization';
import IResponseModel from '../Models/IResponseModel';
import AccountService from '../Services/account/account.service';
import { manageError } from '../utilities/ManageError';

const AccountController = Router();
const accountPath = '/account';

AccountController.get(`${accountPath}/profile`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const user = response.locals.identification;
    try {
        const resultService = await AccountService.getProfile(user);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

AccountController.put(`${accountPath}/profile`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const user = request.body;
    try {
        const resultService = await AccountService.updateProfile(user);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

AccountController.post(`${accountPath}/profile/:uid`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const uid = request.params.uid;
    const password = request.body.password;
    try {
        const resultService = await AccountService.updatePassword(uid, password);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});
    
export default AccountController;
