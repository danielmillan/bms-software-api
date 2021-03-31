import firebase from 'firebase';
import { admin } from "../../utilities/firebase"
import IAuthModel from "../../Models/IAuthModel";

export default class AuthService {

    public static loginUser(data: IAuthModel): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let result: any;
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(async (response: any) => {
                const token = await response.user.getIdToken();
                result = { status: 200, data: token };
                resolve(result);
            }).catch((error) => {
                const err = {
                    code: error.code,
                    status: 401,
                    message: 'Las credenciales son incorrectas, intente de nuevo.',
                };
                reject(err);
            });
        });
    }

    public static validateToken(token: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let result: any;
            await admin.auth().verifyIdToken(token).then(async (response: any) => {
                result = { status: 200, data: 'El token ha sido verificado' };
                resolve(result);
            }).catch((error) => {
                const err = {
                    code: error.code,
                    status: 500,
                    message: error.message,
                };
                reject(err);
            });
        });
    }
}
