import { Request, Response, Router } from 'express';
import IUserModel from '../Models/IUserModel';
import Authorization from '../middlewares/Authorization';
import IResponseModel from '../Models/IResponseModel';
import UserService from '../Services/users/users.service';
import { manageError } from '../utilities/ManageError';

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
    try {
        const resultService = await UserService.createUser(user);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

UsersController.get(`${userPath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const userId = response.locals.identification;
    try {
        const resultService = await UserService.getUsers(userId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

UsersController.delete(`${userPath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const user = {
        identification: request.params.identification,
    } as IUserModel;
    try {
        const resultService = await UserService.deleteUser(user);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
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
    try {
        const resultService = await UserService.updateUser(user);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

export default UsersController;
