import * as busBoy from 'busboy';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Request, Response, Router } from 'express';
import Authorization from '../middlewares/Authorization';
import IResponseModel from '../Models/IResponseModel';
import AccountService from '../Services/account/account.service';

const AccountController = Router();
const accountPath = '/account';

AccountController.get(`${accountPath}/picture/:uid`, [Authorization.validateSession], async (request: Request, response: Response) => {
    const bus = new busBoy({ headers: request.headers });
    const userUid = request.params.uid;
    let imageFileName;
	let imageToBeUploaded = {};
    bus.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
            response.status(400).json({ status: 400, data: 'El tipo de archivo no es compatible.' });
		}
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${userUid}.${imageExtension}`;
		const filePath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filePath, mimetype };
		file.pipe(fs.createWriteStream(filePath));
        console.log('########', filename);
    });
    bus.on('finish', async () => {
        console.log(imageToBeUploaded);
        await AccountService.loadProfilePicture(imageToBeUploaded).then((result) => {
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
    request.pipe(bus);
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
