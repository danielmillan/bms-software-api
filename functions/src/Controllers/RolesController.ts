import { Request, Response, Router } from 'express';
import IResponseModel from '../Models/IResponseModel';
import Authorization from '../middlewares/Authorization';
import IRoleModel from '../Models/IRoleModel';
import RoleService from '../Services/roles/roles.service';
import { manageError } from '../utilities/ManageError';

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
    try {
        const resultService = await RoleService.createRole(role);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

RolesController.get(`${rolePath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    try {
        const resultService = await RoleService.getRoles();
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

RolesController.put(`${rolePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const roleId = request.params.identification;
    const role = {
        description: request.body.description,
        modules: request.body.modules,
        updatedAt: new Date().toISOString(),
        updatedBy: response.locals.identification,
    } as IRoleModel;
    try {
        const resultService = await RoleService.editRole(role, roleId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

RolesController.delete(`${rolePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const roleId = request.params.identification;
    try {
        const resultService = await RoleService.deleteRole(roleId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

export default RolesController;
