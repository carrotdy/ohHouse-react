export namespace JobPostingModel {
    export interface IJobPostingModel {
        id: string;
        uuid: string;
        title: string;
        content: string;
        date: string;
        department: Array<string>;
        isClose: boolean;
    }
}
