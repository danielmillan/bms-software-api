import { Request, Response, Router } from 'express';
import IResponseModel from '../Models/IResponseModel';
import Authorization from '../middlewares/Authorization';
import IParametricListModel from '../Models/IParametricListModel';
import ParameterService from '../Services/parameters/parameters.service';
import { manageError } from '../utilities/ManageError';

const ParametersController = Router();
const parameterPath = '/parameters';

ParametersController.post(`${parameterPath}/list`, [Authorization.validateSession] , async(request: Request, response: Response) => {
    const list: IParametricListModel = {
        description: request.body.description,
        group_id: request.body.group_id,
        values: request.body.values,
    };
    try {
        const resultService = await ParameterService.createParametricList(list);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

ParametersController.get(`${parameterPath}/list`, [Authorization.validateSession] , async(request: Request, response: Response) => {
    const group_id = String(request.query.group_id) || '0';
    try {
        const resultService = await ParameterService.getListByGroup(group_id);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

ParametersController.put(`${parameterPath}/list/:id`, [Authorization.validateSession] , async(request: Request, response: Response) => {
    const list: IParametricListModel = {
        id: request.params.id,
        description: request.body.description,
        group_id: request.body.group_id,
        values: request.body.values,
    };
    try {
        const resultService = await ParameterService.editParametricList(list);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

ParametersController.delete(`${parameterPath}/list/:id`, [Authorization.validateSession] , async(request: Request, response: Response) => {
    const list: IParametricListModel = {
        id: request.params.id,
        description: request.body.description,
        group_id: request.body.group_id,
        values: request.body.values,
    };
    try {
        const resultService = await ParameterService.deleteParametricList(list);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

export default ParametersController;
