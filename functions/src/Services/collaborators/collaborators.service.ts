import ICollaboratorModel from '../../Models/ICollaboratorModel';
import { database } from '../../utilities/firebase';

export default class CollaboratorService {

    public static getCollaborators(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const listCollaborators: ICollaboratorModel[] = [];
            await database.collection('collaborators').get().then((data: any) => {
                data.forEach((doc: any) => {
                    const collaborator = doc.data();
                    listCollaborators.push({
                        identification: doc.id,
                        names: collaborator.names,
                        lastNames: collaborator.lastNames,
                        email: collaborator.email,
                        phone: collaborator.phone,
                        charge: collaborator.charge,
                        createdAt: collaborator.createdAt,
                        createdBy: collaborator.createdBy,
                        updatedAt: collaborator.updatedAt,
                        updatedBy: collaborator.updatedBy,
                    } as ICollaboratorModel);
                });
                resolve(listCollaborators);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static createCollaborator(collaborator: ICollaboratorModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let result: any;
            await database.doc(`collaborators/${collaborator.identification}`).get().then(async (doc) => {
                if (doc.exists) {
                    result = {
                        code: 'collaborator/already-exist',
                        message: 'La cedula ingresada del colaborador ya esta registrada.',
                    };
                    reject(result);
                }
                await database.doc(`collaborators/${collaborator.identification}`).set(collaborator).then(() => {
                    result = { status: 200, data: `El colaborador con la identificación ${collaborator.identification} ha sido creado correctamente.` };
                    resolve(result);
                }).catch((error: any) => {
                    reject(error);
                });
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static editCollaborator(collaborator: ICollaboratorModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/collaborators/${collaborator.identification}`).update(collaborator).then(() => {
                resolve('El colaborador ha sido actualizado correctamente.');
            }).catch((error: any) => {
                reject(error);
            })
        });
    }

    public static deleteCollaborator(id: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/collaborators/${id}`).delete().then(() => {
                resolve('El colaborador ha sido eliminado correctamente.');
            }).catch((error: any) => {
                reject(error);
            })
        });
    }
}