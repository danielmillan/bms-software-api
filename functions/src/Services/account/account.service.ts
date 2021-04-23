import IUserModel from '../../Models/IUserModel';
import { admin, database } from '../../utilities/firebase';

export default class AccountService {

    public static loadProfilePicture(file: any): Promise<any> {
        return new Promise(async(resolve, reject) => {
            
            await admin.storage().bucket().upload(file.filePath, {
                resumable: false,
				metadata: {
					metadata: {
						contentType: file.mimetype,
					},
				},
            }).then(() => {
                resolve('Imagen de perfil actualizada correctamente');
            }).catch((error) => {
                reject(error);
            })
        });
    }

    public static getProfile(identification: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
           await database.doc(`/users/${identification}`).get().then((result) => {
               const user = result.data();
               resolve(user);
           }).catch((error) => {
            reject(error);
        });
        });
    }

    public static updateProfile(user: IUserModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await database.doc(`/users/${user.identification}`).update(user).then(() => {
                resolve('Se ha actualizado correctamente tu perfil.')
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static updatePassword(uid: string, password: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            await admin.auth().updateUser(uid, { password }).then(() => {
                resolve('Se ha cambiado la contraseña correctamente.');
            }).catch((error) => {
                reject(error);
            });
        });
    }

}