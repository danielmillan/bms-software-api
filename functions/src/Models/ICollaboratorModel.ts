export default interface ICollaboratorModel {
    identification?: string;
    names: string;
    lastNames: string;
    birthDate: string;
    address: string;
    email: string;
    phone: string;
    personalInfo: IPersonalInfo;
    jobInfo: IJobInfo;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
}

interface IPersonalInfo {
    maritalStatus: string;
    childrenNumber: string;
    socialsecurity: string;
    eps: string;
    pensionFund: string;
    bankAccountNumber: string;
}

interface IJobInfo {
    dateEntry: string;
    salary: string;
    department: string;
    charge: string;
}