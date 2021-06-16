import { Request, Response, Router } from 'express';
import Authorization from '../middlewares/Authorization';
import IDepartmentModel from '../Models/IDepartmentModel';
import IResponseModel from '../Models/IResponseModel';
import DepartmentService from '../Services/departments/departments.service';
import { manageError } from '../utilities/ManageError';

const DepartmentsController = Router();
const departmentPath = '/departments';

DepartmentsController.post(`${departmentPath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const department: IDepartmentModel = {
        name: request.body.name,
        description: request.body.description,
        isRoot: request.body.isRoot,
        departmentRoot: request.body.departmentRoot,
    };
    try {
        const resultService = await DepartmentService.createDepartment(department);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

DepartmentsController.get(`${departmentPath}`, [Authorization.validateSession], async(request: Request, response: Response) => {
    try {
        const resultService = await DepartmentService.getDepartments();
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

DepartmentsController.put(`${departmentPath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const departmenId = request.params.identification;
    const department: IDepartmentModel = {
        name: request.body.name,
        description: request.body.description,
        isRoot: request.body.isRoot,
        departmentRoot: request.body.departmentRoot,
    };
    try {
        const resultService = await DepartmentService.editDepartment(department, departmenId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

DepartmentsController.delete(`${departmentPath}/:identification`, [Authorization.validateSession], async(request: Request, response: Response) => {
    const departmenId = request.params.identification;
    try {
        const resultService = await DepartmentService.deleteDepartment(departmenId);
        const responseServer: IResponseModel = {
            status: 200,
            data: resultService,
        };
        response.status(200).send(responseServer);
    } catch (error) {
        manageError(response, error);
    }
});

export default DepartmentsController;
