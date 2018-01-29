import { Pipe, PipeTransform } from '@angular/core';
import { DateUtilsService } from '../services/utils/date-utils.service';
import { Todo } from '../services/todos/todos.model';

@Pipe({
	name: 'todoCompletedOn',
	pure: false
})
export class TodoDateFilter implements PipeTransform {
	constructor(public dateUtils: DateUtilsService) {}
	transform(Todos: Todo[], filter: string): any {
		if (!Todos || !filter) {
			return Todos;
		}

		if (filter === 'today') {
			return Todos.filter(item =>
				this.dateUtils.isToday(item.completedOn)
			);
		} else if (filter === 'yesterday') {
			return Todos.filter(item =>
				this.dateUtils.isYesterday(item.completedOn)
			);
		}
	}
}
