import { Request, Response, Router } from 'express';
import IResponseModel from '../Models/IResponseModel';
import Authorization from '../middlewares/Authorization';
import ICollaboratorModel from '../Models/ICollaboratorModel';
import CollaboratorService from '../Services/collaborators/collaborators.service';
import { manageError } from '../utilities/ManageError';

const CollaboratorsController = Router();
const collaboratorPath = '/collaborators';

CollaboratorsController.post(`${collaboratorPath}`, [Authorization.validateSession] , async(request: Request, response: Response) => {
    const collaborator: ICollaboratorModel = {
        identification: request.body.identification,
        names: request.body.names,
        lastNames: request.body.lastNames,
        birthDate: request.body.birthDate,
        address: request.body.address,
        email: request.body.email,
        phone: request.body.phone,
        personalInfo: request.body.personalInfo,
        jobInfo: request.body.jobInfo,
        createdAt: new Date().toISOString(),
        createdBy: response.locals.identification,
        updatedAt: new Date().toISOString(),
        updatedBy: response.locals.identification,
    };
    try {
        const resultService = await CollaboratorService.createCollaborator(collaborator);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

CollaboratorsController.get(`${collaboratorPath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    try {
        const resultService = await CollaboratorService.getCollaborators();
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

CollaboratorsController.put(`${collaboratorPath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const collaborator = {
        identification: request.params.identification,
        names: request.body.names,
        lastNames: request.body.lastNames,
        birthDate: request.body.birthDate,
        address: request.body.address,
        email: request.body.email,
        phone: request.body.phone,
        personalInfo: request.body.personalInfo,
        jobInfo: request.body.jobInfo,
        updatedAt: new Date().toISOString(),
        updatedBy: response.locals.identification,
    } as ICollaboratorModel;
    try {
        const resultService = await CollaboratorService.editCollaborator(collaborator);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);   
    }
});

CollaboratorsController.delete(`${collaboratorPath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const collaboratorId = request.params.identification;
    try {
        const resultService = await CollaboratorService.deleteCollaborator(collaboratorId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

export default CollaboratorsController;
