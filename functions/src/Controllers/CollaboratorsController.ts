import { Request, Response, Router } from 'express';
import IResponseModel from '../Models/IResponseModel';
import Authorization from '../middlewares/Authorization';
import ICollaboratorModel from '../Models/ICollaboratorModel';
import CollaboratorService from '../Services/collaborators/collaborators.service';

const CollaboratorsController = Router();
const collaboratorPath = '/collaborators';

CollaboratorsController.post(`${collaboratorPath}`, [Authorization.validateSession] , async(request: Request, response: Response) => {
    const collaborator: ICollaboratorModel = {
        identification: request.body.identification,
        names: request.body.names,
        lastNames: request.body.lastNames,
        email: request.body.email,
        phone: request.body.phone,
        charge: request.body.charge,
        createdAt: new Date().toISOString(),
        createdBy: response.locals.identification,
        updatedAt: new Date().toISOString(),
        updatedBy: response.locals.identification,
    };
    await CollaboratorService.createCollaborator(collaborator).then((result) => {
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

CollaboratorsController.get(`${collaboratorPath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    await CollaboratorService.getCollaborators().then((data) => {
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

CollaboratorsController.put(`${collaboratorPath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const collaborator = {
        identification: request.params.identification,
        names: request.body.names,
        lastNames: request.body.lastNames,
        email: request.body.email,
        phone: request.body.phone,
        charge: request.body.charge,
        updatedAt: new Date().toISOString(),
        updatedBy: response.locals.identification,
    } as ICollaboratorModel;
    await CollaboratorService.editCollaborator(collaborator).then((data) => {
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

CollaboratorsController.delete(`${collaboratorPath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const collaboratorId = request.params.identification;
    await CollaboratorService.deleteCollaborator(collaboratorId).then((data) => {
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

export default CollaboratorsController;
