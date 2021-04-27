import IChargesModel from "../../Models/IChargesModel";
import { database } from '../../utilities/firebase';

export default class ChargesService {

    public static createCharge(charge: IChargesModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.collection('cargos').add(charge).then(() => {
                const result = { status: 200, data: `El cargo ${charge.name} ha sido creado correctamente.` };
                resolve(result);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static getCharges(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const listCharges: IChargesModel[] = [];
            await database.collection('cargos').get().then((data: any) => {
                data.forEach((doc: any) => {
                    const charge = doc.data();
                    listCharges.push({
                        id: charge.id,
                        name: charge.name,
                        description: charge.description,
                        modules: charge.modules,
                        createdAt: charge.createdAt,
                        createdBy: charge.createdBy,
                        updatedAt: charge.updatedAt,
                        updatedBy: charge.updatedBy,
                    } as IChargesModel);
                });
                resolve(listCharges);
            }).catch((error: any) => {
                reject(error);
            }); 
        });
    }

    public static editCharge(charge: IChargesModel, id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/cargos/${id}`).update(charge).then(() => {
                resolve('El cargo ha sido actualizado correctamente.');
            }).catch((error: any) => {
                reject(error);
            })
        });
    }

    public static deleteCharge(id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/cargos/${id}`).delete().then(() => {
                resolve('El cargo ha sido eliminado correctamente.');
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
}
