export default interface IChargesModel {
    
    id?: string;
    name: string;
    description: string;
    modules: [string];
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}
