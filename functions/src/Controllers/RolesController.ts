import { Request, Response, Router } from 'express';
import IResponseModel from '../Models/IResponseModel';
import Authorization from '../middlewares/Authorization';
import IRoleModel from '../Models/IRoleModel';
import RoleService from '../Services/roles/roles.service';

const RolesController = Router();
const rolePath = '/roles';

RolesController.post(`${rolePath}`, [Authorization.validateSession] , async(request: Request, response: Response) => {
    const role: IRoleModel = {
        name: request.body.name,
        description: request.body.description,
        modules: request.body.modules,
        createdAt: new Date().toISOString(),
        createdBy: response.locals.identification,
        updatedAt: new Date().toISOString(),
        updatedBy: response.locals.identification,
    };
    await RoleService.createRole(role).then((result) => {
        response.status(200).send(result);
    }).catch((error) => {
        const responseServer: IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(500).send(responseServer);
    });
});

RolesController.get(`${rolePath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    await RoleService.getRoles().then((data) => {
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

RolesController.put(`${rolePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const roleId = request.params.identification;
    const role = {
        description: request.body.description,
        modules: request.body.modules,
        updatedAt: new Date().toISOString(),
        updatedBy: response.locals.identification,
    } as IRoleModel;
    await RoleService.editRole(role, roleId).then((data) => {
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

RolesController.delete(`${rolePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const roleId = request.params.identification;
    await RoleService.deleteRole(roleId).then((data) => {
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

export default RolesController;
