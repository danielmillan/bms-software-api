import { Request, Response, Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import Authorization from '../middlewares/Authorization';
import IResponseModel from '../Models/IResponseModel';
import AccountService from '../Services/account/account.service';

const AccountController = Router();
const accountPath = '/account';

AccountController.post(`${accountPath}/picture/:uid`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const userUid = request.params.uid;
    const file = request.body;
    const identification = response.locals.identification;
    const pathLoad = path.join(__dirname, `../uploads/${userUid}.png`);
    console.log("@@@@@@@@@@@@", file);
    fs.writeFile(pathLoad, file, async (err) => {
        if (err) {
            response.status(500).send({ status: 500, data: err });
        } else {
            await AccountService.loadProfilePicture(pathLoad, userUid, identification).then((result) => {
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
        }
    });
});

AccountController.get(`${accountPath}/profile`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const user = response.locals.identification;
    await AccountService.getProfile(user).then((result) => {
        response.status(200).send({ status: 200, data: result });
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(500).send(responseServer);
    });
});

AccountController.put(`${accountPath}/profile`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const user = request.body;
    await AccountService.updateProfile(user).then((result) => {
        response.status(200).send({ status: 200, data: result });
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(500).send(responseServer);
    });
});

AccountController.post(`${accountPath}/profile/:uid`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const uid = request.params.uid;
    const password = request.body.password;
    await AccountService.updatePassword(uid, password).then((result) => {
        response.status(200).send({ status: 200, data: result });
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(500).send(responseServer);
    });
});
    
export default AccountController;
