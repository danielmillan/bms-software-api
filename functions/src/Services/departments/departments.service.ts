import IDepartmentModel from "../../Models/IDepartmentModel";
import { database } from '../../utilities/firebase';

export default class DepartmentService {

    public static createDepartment(department: IDepartmentModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.collection('departments').add(department).then(() => {
                resolve(`El departamento ${department.name} ha sido creado correctamente.`);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
    
    public static getDepartments(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const listDepartments: IDepartmentModel[] = [];
            await database.collection('departments').get().then((data) => {
                data.forEach((doc: any) => {
                    const role = doc.data();
                    listDepartments.push({
                        id: doc.id,
                        name: role.name,
                        description: role.description,
                        isRoot: role.isRoot,
                        departments: role.departments,
                    } as IDepartmentModel);
                });
                resolve(listDepartments);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static editDepartment(department: IDepartmentModel, id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/departments/${id}`).update(department).then(() => {
                resolve('El departamento ha sido actualizado correctamente.');
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static deleteDepartment(id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/departments/${id}`).delete().then(() => {
                resolve('El departamento ha sido eliminado correctamente.');
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
}
