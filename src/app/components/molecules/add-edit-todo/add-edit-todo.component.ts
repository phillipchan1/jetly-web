import { Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import { Todo } from '../../../services/todos/todos.model';
import { TodosService } from '../../../services/todos/todos.service';
import { AuthService } from "../../../services/auth/auth.service";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from 'angularfire2/firestore';

@Component({
	selector: "add-edit-todo",
	templateUrl: "./add-edit-todo.component.html",
	host: { '(window:keyup)': 'hotkeys($event)' },
	styleUrls: ["./add-edit-todo.component.scss"]
})
export class AddEditTodoComponent implements OnInit {
	@Input() todo: Todo = <Todo>{};
	@Output() onChange = new EventEmitter<boolean>();
	@Output() onSubmitted = new EventEmitter<boolean>();
	private todosCollection: AngularFirestoreCollection<Todo>;

	constructor(
		public todoService: TodosService,
		public authService: AuthService,
		private afs: AngularFirestore,
		) {}

	deleteTodo(docId) {
		this.todoService.deleteTodo(docId);
		this.onChange.emit(true);
	}

	onFormChange() {
		if (this.todo && this.todo.id) {
			this.todoService.updateTodo(this.todo.id, this.todo);
		}
	}

	addNewTodo() {
		if (this.todo && this.todo.name) {

			const newTodo: Todo = {
				onBoard: true,
				complete: false,
				createdOn: Date.now(),
				name: this.todo.name || '',
				description: this.todo.description || '',
				lane: "todo",
				notes: this.todo.notes || '',
				previousLane: "",
				startOn: Date.now(),
				timeSpentinProgress: 0,
				userId: this.authService.getUser().uid
			};

			this.todosCollection = this.afs.collection<Todo>('todos');
			this.todosCollection.add(newTodo);
			this.onSubmitted.emit(true);
			this.todo = <Todo>{};
		}
	}

	hotkeys(event) {
		if (event.ctrlKey && event.which == 13) {
			this.addNewTodo();
		}
	}

	ngOnInit() {

	}
}
