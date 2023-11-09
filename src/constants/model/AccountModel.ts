export namespace AccountModel {
    export interface IUserModel {
        uuid: string;
        department: string;
        email: string;
        isDeleted: boolean;
        phone: string;
        userName: string;
    }
}