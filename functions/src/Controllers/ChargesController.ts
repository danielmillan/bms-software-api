import { Request, Response, Router } from 'express';
import IResponseModel from '../Models/IResponseModel';
import Authorization from '../middlewares/Authorization';
import IChargeModel from '../Models/IChargeModel';
import ChargeService from '../Services/charges/charges.service';

const ChargesController = Router();
const chargePath = '/charges';

ChargesController.post(`${chargePath}`, [Authorization.validateSession] , async(request: Request, response: Response) => {
    const charge: IChargeModel = {
        name: request.body.name,
        description: request.body.description,
        createdAt: new Date().toISOString(),
        createdBy: response.locals.identification,
        updatedAt: new Date().toISOString(),
        updatedBy: response.locals.identification,
    };
    await ChargeService.createCharge(charge).then((result) => {
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

ChargesController.get(`${chargePath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    await ChargeService.getCharges().then((data) => {
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

ChargesController.put(`${chargePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const chargeId = request.params.identification;
    const charge = {
        name: request.body.name,
        description: request.body.description,
        updatedAt: new Date().toISOString(),
        updatedBy: response.locals.identification,
    } as IChargeModel;
    await ChargeService.editCharge(charge, chargeId).then((data) => {
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

ChargesController.delete(`${chargePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const chargeId = request.params.identification;
    await ChargeService.deleteCharge(chargeId).then((data) => {
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

export default ChargesController;
