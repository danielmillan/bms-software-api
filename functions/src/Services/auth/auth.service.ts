import firebase from 'firebase';
import { admin, database } from "../../utilities/firebase"
import IAuthModel from "../../Models/IAuthModel";

export default class AuthService {

    public static async loginUser(data: IAuthModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let result: any;
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(async (response: any) => {
                const token = await response.user.getIdToken();
                result = { status: 200, data: token };
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public static async validateToken(token: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let result: any;
            await admin.auth().verifyIdToken(token).then(async (response: any) => {
                result = { status: 200, data: 'El token ha sido verificado' };
                resolve(result);
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
                    result = {
                        status: 200,
                        data: userDb.data(),
                    }
                    resolve(result);
                }
            });
        });
    }
}
