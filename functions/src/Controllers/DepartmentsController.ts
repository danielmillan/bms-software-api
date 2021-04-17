import { Request, Response, Router } from 'express';
import IDepartmentModel from '../Models/IDepartmentModel';
import IResponseModel from '../Models/IResponseModel';
import DepartmentService from '../Services/departments/departments.service';

const DepartmentsController = Router();
const departmentPath = '/departments';

DepartmentsController.post(`${departmentPath}`, async(request: Request, response: Response) => {
    const department: IDepartmentModel = {
        name: request.body.name,
        description: request.body.description,
        isRoot: request.body.isRoot,
    };
    if (request.body.departments && department.isRoot) {
        department.departments = request.body.departments
    }
    await DepartmentService.createDepartment(department).then((data) => {
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

DepartmentsController.get(`${departmentPath}`, async(request: Request, response: Response) => {
    await DepartmentService.getDepartments().then((data) => {
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

DepartmentsController.put(`${departmentPath}/:identification`, async(request: Request, response: Response) => {
    const departmenId = request.params.identification;
    const department: IDepartmentModel = {
        name: request.body.name,
        description: request.body.description,
        isRoot: request.body.isRoot,
    };
    if (request.body.departments && department.isRoot) {
        department.departments = request.body.departments
    }
    await DepartmentService.editDepartment(department, departmenId).then((data) => {
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

DepartmentsController.delete(`${departmentPath}/:identification`, async(request: Request, response: Response) => {
    const departmenId = request.params.identification;
    await DepartmentService.deleteDepartment(departmenId).then((data) => {
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

export default DepartmentsController;
