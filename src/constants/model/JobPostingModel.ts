export namespace JobPostingModel {
	export interface IJobPostingModel {
		userUid: string;
		postId: string;
		title: string;
		content: string;
		date: string;
		department: Array<string>;
		isClose: boolean;
		fileNames: Array<string>
	}
}
