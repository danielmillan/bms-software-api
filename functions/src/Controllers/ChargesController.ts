import { Request, Response, Router } from 'express';
import IResponseModel from '../Models/IResponseModel';
import IChargesModel from "../Models/IChargesModel";
import ChargesService from '../Services/charges/charges.service';

const ChargesController = Router();
const chargePath = '/cargos';

ChargesController.post(`${chargePath }`, async(request: Request, response: Response) => {
    const charge: IChargesModel = {

        name: request.body.name,
        description: request.body.description,
        modules: request.body.modules,
        createdAt: new Date().toISOString(),
        createdBy: request.body.createdBy,
        updatedAt: new Date().toISOString(),
        updatedBy: request.body.updatedBy,
    };
    await ChargesService.createCharge(charge).then((result) => {
        response.status(200).send(result);
    }).catch((error) => {
        const responseServer:  IResponseModel = {
            status: 500,
            code: error.code,
            data: error.message,
        };
        response.status(500).send(responseServer);
    });
});

ChargesController.get(`${chargePath}`, async(request: Request, response: Response) => {
    await ChargesService.getCharges().then((data) => {
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



ChargesController.put(`${chargePath}/:identification`, async(request: Request, response: Response) => {
    const chargeId = request.params.identification;
    const charge = {
        description: request.body.description,
        modules: request.body.modules,
        updatedAt: new Date().toISOString(),
        updatedBy: request.body.updatedBy,
    } as IChargesModel;
    await ChargesService.editCharge(charge, chargeId).then((data) => {
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
