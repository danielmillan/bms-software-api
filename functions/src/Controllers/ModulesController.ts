import { Request, Response, Router } from 'express';
import IResponseModel from '../Models/IResponseModel';
import IModuleModel from "../Models/IModuleModel";
import ModulesService from '../Services/modules/modules.service';

const ModulesController = Router();
const modulesPath = '/modules';

ModulesController.get(`${modulesPath}`, async(request: Request, response: Response) => {
    await ModulesService.getModules().then((data) => {
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

ModulesController.post(`${modulesPath}`, async(request: Request, response: Response) => {
    const module: IModuleModel = {
        name: request.body.name,
        description: request.body.description,
    };
    await ModulesService.createModule(module).then((data) => {
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

ModulesController.put(`${modulesPath}/:identification`, async(request: Request, response: Response) => {
    const moduleId = request.params.identification;
    const module: IModuleModel = {
        name: request.body.name,
        description: request.body.description,
    };
    await ModulesService.editModule(module, moduleId).then((data) => {
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

export default ModulesController;
