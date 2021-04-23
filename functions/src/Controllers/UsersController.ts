import { Request, Response, Router } from 'express';
import IUserModel from '../Models/IUserModel';
import Authorization from '../middlewares/Authorization';
import IResponseModel from '../Models/IResponseModel';
import UserService from '../Services/users/users.service';

const UsersController = Router();
const userPath = '/users';

UsersController.post(`${userPath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const user: IUserModel = {
        identification: request.body.identification,
        names: request.body.names,
        lastNames: request.body.lastNames,
        email: request.body.email,
        phone: request.body.phone,
        role: request.body.role,
        status: true,
    };
    await UserService.createUser(user).then(async (responseUser) => {
        const responseServer: IResponseModel = {
            status: responseUser.status,
            code: responseUser.code,
            data: responseUser.data,
        };
        response.status(200).send(responseServer);
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(500).send(responseServer);
    });
});

UsersController.get(`${userPath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    await UserService.getUsers().then(async(data) => {
        const responseServer: IResponseModel = {
            status: 200,
            data,
        };
        response.status(200).send(responseServer);
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(500).send(responseServer);
    });
});

UsersController.delete(`${userPath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const user = {
        identification: request.params.identification,
    } as IUserModel;
    await UserService.deleteUser(user).then(async (responseUser) => {
        const responseServer: IResponseModel = {
            status: responseUser.status,
            code: responseUser.code,
            data: responseUser.data,
        };
        response.status(200).send(responseServer);
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(500).send(responseServer);
    });
});

UsersController.put(`${userPath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const user = {
        identification: request.params.identification,
        names: request.body.names,
        lastNames: request.body.lastNames,
        phone: request.body.phone,
        role: request.body.role,
        status: request.body.status,
    } as IUserModel;
    await UserService.updateUser(user).then(async (responseUser) => {
        const responseServer: IResponseModel = {
            status: responseUser.status,
            code: responseUser.code,
            data: responseUser.data,
        };
        response.status(200).send(responseServer);
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(500).send(responseServer);
    });
});

export default UsersController;
