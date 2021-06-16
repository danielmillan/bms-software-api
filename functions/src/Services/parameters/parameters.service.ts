import IParametricListModel from "../../Models/IParametricListModel";
import { database } from '../../utilities/firebase';

export default class ParameterService {

    public static createParametricList(parametricList: IParametricListModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.collection('parameters_list').where('group_id', '==', parametricList.group_id).get().then(async (data: any) => {
                const docs = Object(data)._size;
                if (docs > 0) {
                    reject({ message: `La lista con el orden ${parametricList.group_id} ya esta en uso` });
                } else {
                    await database.collection('parameters_list').add(parametricList).then(() => {
                        resolve(`Se ha creado la lista con el orden de agrupación ${parametricList.group_id}.`);
                    }).catch((error: any) => {
                        reject(error);
                    });
                }
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
    
    public static getListByGroup(group_id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let parametricList: IParametricListModel;
            await database.collection('parameters_list').where('group_id', '==', group_id).get().then((data) => {
                data.forEach((doc: any) => {
                    const list = doc.data();
                    parametricList = {
                        id: doc.id,
                        group_id: list.group_id,
                        description: list.description,
                        values: list.values,
                    };
                });
                resolve(parametricList);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static editParametricList(parametricList: IParametricListModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/parameters_list/${parametricList.id}`).update(parametricList).then(() => {
                resolve(`La lista con orden ${parametricList.group_id} ha sido actualizada correctamente.`);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static deleteParametricList(parametricList: IParametricListModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/departments/${parametricList.id}`).delete().then(() => {
                resolve(`La lista con orden ${parametricList.group_id} ha sido eliminada correctamente.`);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
}
