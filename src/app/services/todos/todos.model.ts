export class Todo {
	complete: boolean;
	completedOn?: number;
	createdOn: number;
	id?: string;
	name: string;
	notes?: string;
	description?: string;
	difficulty?: number;
	lane: string;
	onBoard: boolean;
	previousLane: string;
	scheduledFor: number;
	timeSpentinProgress?: number;
	userId?: string;
}
