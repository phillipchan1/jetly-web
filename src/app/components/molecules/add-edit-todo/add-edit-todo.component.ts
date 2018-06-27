import { Component, Input, OnInit } from "@angular/core";
import { Todo } from '../../../services/todos/todos.model';
import { TodosService } from '../../../services/todos/todos.service';

@Component({
	selector: "add-edit-todo",
	templateUrl: "./add-edit-todo.component.html",
	styleUrls: ["./add-edit-todo.component.scss"]
})
export class AddEditTodoComponent implements OnInit {
	@Input() todo: Todo = <Todo>{};

	constructor(
		public todoService: TodosService
	) {}

	onFormChange() {
		this.todoService.updateTodo(this.todo.id, this.todo);
	}

	ngOnInit() {}
}
