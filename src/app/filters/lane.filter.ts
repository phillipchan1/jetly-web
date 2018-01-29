import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../services/todos/todos.model';

@Pipe({
	name: 'laneFilter',
	pure: false
})
export class LaneFilter implements PipeTransform {
	transform(items: any[], filter: Todo): any {
		if (!items || !filter) {
			return items;
		}

		return items
			.filter(item => item.lane.indexOf(filter.lane) !== -1)
			.filter(item => item.complete === filter.complete);
	}
}
