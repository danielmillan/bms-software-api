export default interface IUserModel {
    uid?: string;
    identification: string;
    names: string;
    lastNames: string;
    email: string;
    password?: string;
    phone: string;
    role: string;
    status?: boolean;
}
