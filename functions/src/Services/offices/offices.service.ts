import IOfficeModel from "../../Models/IOfficeModel";
import { database } from '../../utilities/firebase';

export default class OfficeService {

    public static createOffice(office: IOfficeModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.collection('offices').add(office).then(() => {
                resolve(`La sucursal ${office.name} ha sido creada correctamente.`);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
    
    public static getOffices(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const listOffices: IOfficeModel[] = [];
            await database.collection('offices').get().then((data) => {
                data.forEach((doc: any) => {
                    const role = doc.data();
                    listOffices.push({
                        id: doc.id,
                        name: role.name,
                        address: role.address,
                        status: role.status,
                    } as IOfficeModel);
                });
                resolve(listOffices);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static editOffice(office: IOfficeModel, id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/offices/${id}`).update(office).then(() => {
                resolve('La sucursal ha sido actualizada correctamente.');
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static deleteOffice(id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/offices/${id}`).delete().then(() => {
                resolve('La sucursal ha sido eliminada correctamente.');
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
}
