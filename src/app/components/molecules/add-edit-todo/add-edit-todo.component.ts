import { Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import { Todo } from '../../../services/todos/todos.model';
import { TodosService } from '../../../services/todos/todos.service';

@Component({
	selector: "add-edit-todo",
	templateUrl: "./add-edit-todo.component.html",
	styleUrls: ["./add-edit-todo.component.scss"]
})
export class AddEditTodoComponent implements OnInit {
	@Input() todo: Todo = <Todo>{};
	@Output() onChange = new EventEmitter<boolean>();

	constructor(
		public todoService: TodosService
	) {}

	deleteTodo(docId) {
		this.todoService.deleteTodo(docId);
		this.onChange.emit(true);
	}

	onFormChange() {
		this.todoService.updateTodo(this.todo.id, this.todo);
	}

	ngOnInit() {}
}
