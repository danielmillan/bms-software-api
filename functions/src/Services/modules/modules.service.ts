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
                        group: module.group,
                        link: module.link,
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

    public static getModulesMenu(identification: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let modulesByRole: any;
            const listModules: any [] = [];
            await database.doc(`/users/${identification}`).get().then(async (userDb: any) => {
                const user = userDb.data();
                await database.collection('roles').where('name', '==', user.role).limit(1).get().then(async (roleDb: any) => {
                    roleDb.forEach((element: any) => {
                        const role = element.data();
                        modulesByRole = role;
                    });
                    const arrayModules = Object.keys(modulesByRole.modules);
                    await database.collection('modules').where('name', 'in', arrayModules).orderBy('group').get().then((modulesDb: any) => {
                        modulesDb.forEach((element: any) => {
                            const module = element.data();
                            listModules.push({
                                name: module.name,
                                group: module.group,
                                link: module.link,
                            });
                        });
                        const menuList = this.parseMenu(listModules);
                        resolve(menuList);
                    }).catch((error) => {
                        reject(error);
                    });
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    private static parseMenu(menuList: any[]): Promise<any> {
        return new Promise((resolve) => {
            const menu: any = {};
            menuList.forEach((m: any) => {
                if (menu[m.group]) {
                    menu[m.group].children.push({
                        title: m.name,
                        link: m.link,
                    });
                } else {
                    menu[m.group] = {};
                    menu[m.group].children = [];
                    menu[m.group].children.push({
                        title: m.name,
                        link: m.link,
                    });
                }
            });
            resolve(menu);
        });
    }
}