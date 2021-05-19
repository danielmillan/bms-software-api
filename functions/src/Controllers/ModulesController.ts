import { Request, Response, Router } from 'express';
import IResponseModel from '../Models/IResponseModel';
import IModuleModel from "../Models/IModuleModel";
import ModulesService from '../Services/modules/modules.service';
import Authorization from '../middlewares/Authorization';
import { manageError } from '../utilities/ManageError';

const ModulesController = Router();
const modulesPath = '/modules';

ModulesController.get(`${modulesPath}`, async(request: Request, response: Response) => {
    try {
        const resultService = await ModulesService.getModules();
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

ModulesController.get(`${modulesPath}/menu`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const identification = response.locals.identification;
    try {
        const resultService = await ModulesService.getModulesMenu(identification);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

ModulesController.post(`${modulesPath}`, async(request: Request, response: Response) => {
    const module: IModuleModel = {
        name: request.body.name,
        description: request.body.description,
        group: request.body.group,
        link: request.body.link,
    };
    try {
        const resultService = await ModulesService.createModule(module);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

ModulesController.put(`${modulesPath}/:identification`, async(request: Request, response: Response) => {
    const moduleId = request.params.identification;
    const module: IModuleModel = {
        name: request.body.name,
        description: request.body.description,
        group: request.body.group,
        link: request.body.link,
    };
    try {
        const resultService = await ModulesService.editModule(module, moduleId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

export default ModulesController;
