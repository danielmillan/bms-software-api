import firebase from 'firebase';
import { admin, database } from "../../utilities/firebase"
import IAuthModel from "../../Models/IAuthModel";

export default class AuthService {

    public static async loginUser(data: IAuthModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(async (response: any) => {
                const token = await response.user.getIdToken();
                resolve(token);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static async validateToken(token: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await admin.auth().verifyIdToken(token).then(async (response: any) => {
                resolve('El token ha sido verificado');
            }).catch((error) => {
                reject(error);
            });
        });
    }
    
    public static async getProfileFromUser(identification: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let result: any;
            await database.doc(`/users/${identification}`).get().then(async(userDb) => {
                if (!userDb.exists) {
                    result = {
                        code: 'user/not-exist',
                        message: 'El usuario no existe.',
                    };
                    reject(result);
                } else {
                    resolve(userDb.data(),);
                }
            });
        });
    }

    public static resetPassword(email: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await firebase.auth().sendPasswordResetEmail(email).then(() => {
                resolve('El correo de restablecimiento ha sido enviado correctamente.');
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static getSecurityPermissions(identification: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const security: any = {};
            await database.doc(`/users/${identification}`).get().then(async (docDb: any) => {
                const user = docDb.data();
                await database.collection('roles').where('name', '==', user.role).limit(1).get().then((docBd: any) => {
                    let listPermissions: any = {};
                    docBd.forEach((element: any) => {
                        const role = element.data();
                        listPermissions = {
                            name: role.name,
                            modules: role.modules,
                        };
                    });
                    security[listPermissions.name] = {
                        view: [],
                        create: [],
                        edit: [],
                        remove: [],
                    };
                    Object.keys(listPermissions.modules).forEach(module => {
                        if(listPermissions.modules[module].filter((p: any) => p === 'read').length > 0) {
                            security[listPermissions.name].view.push(module);
                        }
                        if(listPermissions.modules[module].filter((p: any) => p === 'create').length > 0) {
                            security[listPermissions.name].create.push(module);
                        }
                        if(listPermissions.modules[module].filter((p: any) => p === 'update').length > 0) {
                            security[listPermissions.name].edit.push(module);
                        }
                        if(listPermissions.modules[module].filter((p: any) => p === 'delete').length > 0) {
                            security[listPermissions.name].remove.push(module);
                        }
                    });
                    resolve(security);
                }).catch((error) => {
                    reject(error);
                })
           }).catch((error) => {
               reject(error);
           }); 
        });
    }
}
