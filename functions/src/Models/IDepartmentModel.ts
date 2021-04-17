export default interface IDepartmentModel {
    name: string;
    description: string;
    isRoot: boolean;
    departments?: [IDepartmentModel]
}
