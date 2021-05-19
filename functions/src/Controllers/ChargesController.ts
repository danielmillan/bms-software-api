import { Request, Response, Router } from 'express';
import IResponseModel from '../Models/IResponseModel';
import Authorization from '../middlewares/Authorization';
import IChargeModel from '../Models/IChargeModel';
import ChargeService from '../Services/charges/charges.service';
import { manageError } from '../utilities/ManageError';

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
    try {
        const resultService = await ChargeService.createCharge(charge);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

ChargesController.get(`${chargePath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    try {
        const resultService = await ChargeService.getCharges();
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

ChargesController.put(`${chargePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const chargeId = request.params.identification;
    const charge = {
        name: request.body.name,
        description: request.body.description,
        updatedAt: new Date().toISOString(),
        updatedBy: response.locals.identification,
    } as IChargeModel;
    try {
        const resultService = await ChargeService.editCharge(charge, chargeId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

ChargesController.delete(`${chargePath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const chargeId = request.params.identification;
    try {
        const resultService = await ChargeService.deleteCharge(chargeId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

export default ChargesController;
