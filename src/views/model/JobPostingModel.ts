export namespace JobPostingModel {
	export interface IJobPostingModel {
		uuid: string;
		title: string;
		content: string;
		date: string;
		department: Array<string>;
		isClose: boolean;
		fileNames: Array<string>
	}
}
