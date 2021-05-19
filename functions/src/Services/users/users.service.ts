import firebase from 'firebase';
import config from '../../config';
import IUserModel from "../../Models/IUserModel";
import { admin, database } from '../../utilities/firebase';

export default class UserService {

    public static createUser(user: IUserModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let result: any;
            await database.doc(`/users/${user.identification}`).get().then((doc) => {
                if (doc.exists) {
                    result = {
                        code: 'user/already-exist',
                        message: 'La cedula ingresada ya esta registrada.',
                    };
                    reject(result);
                }
                return firebase.auth().createUserWithEmailAndPassword(user.email, config.defaultPassword);
            }).then(async(userAuth: any) => {
                const userCreated = firebase.auth().currentUser;
                userCreated?.updateProfile({ displayName: `${user.names} ${user.lastNames}` }).then(() => {
                    console.log('user profile updated');
                }).catch((error) => {
                    console.error('has error', error);
                });
                const { password, ...userDb } = user;
                userDb.uid = userAuth.user?.uid;
                await database.doc(`/users/${user.identification}`).set(userDb).then(() => {
                    result = { status: 200, data: 'Usuario creado correctamente.' };
                    resolve(result);
                }).catch((error: any) => {
                    reject(error);
                });
            }).catch((error: any) => {
                reject(error);
            })
        });
    }

    public static async getUsers(userId: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const listAdvisors: IUserModel[] = [];
            await database.collection('users').where('identification', '!=', userId).get().then(async(data) => {
                data.forEach((doc: any) => {
                    const advisor = doc.data();
                    listAdvisors.push({
                        identification: doc.id,
                        uid: advisor.uid,
                        names: advisor.names,
                        lastNames: advisor.lastNames,
                        email: advisor.email,
                        phone: advisor.phone,
                        role: advisor.role,
                        status: advisor.status,
                    } as IUserModel);
                });
                resolve(listAdvisors);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public static deleteUser(user: IUserModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let result: any;
            await database.doc(`/users/${user.identification}`).get().then(async(userDb) => {
                if (!userDb.exists) {
                    result = {
                        code: 'user/not-exist',
                        message: 'El usuario no existe.',
                    };
                    reject(result);
                }
                return userDb.data();
            }).then((data: any) => {
                admin.auth().deleteUser(data.uid).then(async() => {
                    await database.doc(`/users/${data.identification}`).delete().then(() => {
                        result = { status: 200, data: 'Usuario eliminado exitosamente.' };
                        resolve(result);
                    }).catch((error: any) => {
                        reject(error);
                    });
                }).catch((error: any) => {
                    reject(error);
                });
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
    
    public static updateUser(user: IUserModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let result: any;
            const data = {
                names: user.names,
                lastNames: user.lastNames,
                phone: user.phone,
                role: user.role,
                status: user.status,
            };
            console.log(data);
            await database.doc(`/users/${user.identification}`).update(data).then(() => {
                result = { status: 200, data: 'Usuario actualizado correctamente.' };
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
