import { Request, Response, Router } from 'express';
import Authorization from '../middlewares/Authorization';
import IOfficeModel from '../Models/IOfficeModel';
import IResponseModel from '../Models/IResponseModel';
import OfficeService from '../Services/offices/offices.service';

const OfficesController = Router();
const officePath = '/offices';

OfficesController.post(`${officePath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const office: IOfficeModel = {
        name: request.body.name,
        address: request.body.address,
        status: true,
    };
    await OfficeService.createOffice(office).then((data) => {
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

OfficesController.get(`${officePath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    await OfficeService.getOffices().then((data) => {
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

OfficesController.put(`${officePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const officeId = request.params.identification;
    const office: IOfficeModel = {
        name: request.body.name,
        address: request.body.address,
        status: request.body.status,
    };
    await OfficeService.editOffice(office, officeId).then((data) => {
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

OfficesController.delete(`${officePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const departmenId = request.params.identification;
    await OfficeService.deleteOffice(departmenId).then((data) => {
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

export default OfficesController;
