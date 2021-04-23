import IModuleModel from "../../Models/IModuleModel";
import { database } from '../../utilities/firebase';

export default class ModulesService {

    public static getModules(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const listModules: IModuleModel [] = [];
            await database.collection('modules').get().then((data) => {
                data.forEach((doc: any) => {
                    const module = doc.data();
                    listModules.push({
                        id: doc.id,
                        name: module.name,
                        description: module.description,
                    } as IModuleModel);
                });
                resolve(listModules);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static createModule(module: IModuleModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.collection('modules').add(module).then(() => {
                resolve('Modulo creado correctamente.');
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static editModule(module: IModuleModel, id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/modules/${id}`).update(module).then(() => {
                resolve('Modulo actualizado correctamente.');
            }).catch((error) => {
                reject(error);
            });
        });
    }
}