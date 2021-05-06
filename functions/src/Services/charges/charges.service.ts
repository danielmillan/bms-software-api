import IChargeModel from '../../Models/IChargeModel';
import { database } from '../../utilities/firebase';

export default class ChargeService {

    public static getCharges(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const listCharges: IChargeModel[] = [];
            await database.collection('charges').get().then((data: any) => {
                data.forEach((doc: any) => {
                    const charge = doc.data();
                    listCharges.push({
                        id: doc.id,
                        name: charge.name,
                        description: charge.description,
                        createdAt: charge.createdAt,
                        createdBy: charge.createdBy,
                        updatedAt: charge.updatedAt,
                        updatedBy: charge.updatedBy,
                    } as IChargeModel);
                });
                resolve(listCharges);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static createCharge(charge: IChargeModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.collection('charges').add(charge).then(() => {
                const result = { status: 200, data: `El cargo ${charge.name} ha sido creado correctamente.` };
                resolve(result);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static editCharge(charge: IChargeModel, id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/charges/${id}`).update(charge).then(() => {
                resolve('El cargo ha sido actualizado correctamente.');
            }).catch((error: any) => {
                reject(error);
            })
        });
    }

    public static deleteCharge(id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/charges/${id}`).delete().then(() => {
                resolve('El cargo ha sido eliminado correctamente.');
            }).catch((error: any) => {
                reject(error);
            })
        });
    }
}