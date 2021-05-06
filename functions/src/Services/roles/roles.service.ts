import IRoleModel from "../../Models/IRoleModel";
import { database } from '../../utilities/firebase';

export default class RoleService {

    public static createRole(role: IRoleModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.collection('roles').add(role).then(() => {
                const result = { status: 200, data: `El rol ${role.name} ha sido creado correctamente.` };
                resolve(result);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static getRoles(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const listRoles: IRoleModel[] = [];
            await database.collection('roles').get().then((data: any) => {
                data.forEach((doc: any) => {
                    const role = doc.data();
                    listRoles.push({
                        id: doc.id,
                        name: role.name,
                        description: role.description,
                        modules: role.modules,
                        createdAt: role.createdAt,
                        createdBy: role.createdBy,
                        updatedAt: role.updatedAt,
                        updatedBy: role.updatedBy,
                    } as IRoleModel);
                });
                resolve(listRoles);
            }).catch((error: any) => {
                reject(error);
            }); 
        });
    }

    public static editRole(role: IRoleModel, id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/roles/${id}`).update(role).then(() => {
                resolve('El rol ha sido actualizado correctamente.');
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static deleteRole(id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/roles/${id}`).delete().then(() => {
                resolve('El rol ha sido eliminado correctamente.');
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
}
