import { Request, NextFunction, Response } from 'express';
import IResponseModel from '../Models/IResponseModel';
import { admin, database } from '../utilities/firebase';

export default class Authorization {

    public static validateSession = async (request: Request, response: Response, next: NextFunction)  => {
        let token: any;
        if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
            token = request.headers.authorization.split('Bearer ')[1];
            admin.auth().verifyIdToken(token).then(async(decodedToken) => {
                const user = await database.collection('users').where('uid', '==', decodedToken.uid).limit(1).get();
                response.locals.identification = user.docs[0].data().identification;
                next();
            }).catch((error) => {
                const responseServer: IResponseModel = {
                    status: 403,
                    code: error.code,
                    data: error.message,
                };
                response.status(403).send(responseServer);
            });
        } else {
            const responseServer: IResponseModel = {
                status: 403,
                code: 'auth/forbidden',
                data: 'Token is not present or is not valid',
            };
            response.status(403).send(responseServer);
        }
    };
}
