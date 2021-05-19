import { Request, Response, Router } from 'express';
import Authorization from '../middlewares/Authorization';
import IOfficeModel from '../Models/IOfficeModel';
import IResponseModel from '../Models/IResponseModel';
import OfficeService from '../Services/offices/offices.service';
import { manageError } from '../utilities/ManageError';

const OfficesController = Router();
const officePath = '/offices';

OfficesController.post(`${officePath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const office: IOfficeModel = {
        name: request.body.name,
        address: request.body.address,
        status: true,
    };
    try {
        const resultService = await OfficeService.createOffice(office);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

OfficesController.get(`${officePath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    try {
        const resultService = await OfficeService.getOffices();
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

OfficesController.put(`${officePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const officeId = request.params.identification;
    const office: IOfficeModel = {
        name: request.body.name,
        address: request.body.address,
        status: request.body.status,
    };
    try {
        const resultService = await OfficeService.editOffice(office, officeId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

OfficesController.delete(`${officePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const officeId = request.params.identification;
    try {
        const resultService =  await OfficeService.deleteOffice(officeId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

export default OfficesController;
