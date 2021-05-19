import { Response} from 'express';

export const manageError = (res: Response, error: any) => {
    const parseError = {
        status: error.status || 500,
        code: error.code,
        data: error.message,
    };
    res.status(parseError.status).send(parseError);
}
