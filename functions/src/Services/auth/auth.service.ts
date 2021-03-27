import firebase from 'firebase';
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
                    message: 'Las credenciales son incorrectas, intente de nuevo.',
                };
                reject(err);
            });
        });
    }
}
