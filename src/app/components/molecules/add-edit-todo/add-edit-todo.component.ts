import { Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import { Todo } from '../../../services/todos/todos.model';
import { TodosService } from '../../../services/todos/todos.service';
import { AuthService } from "../../../services/auth/auth.service";
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from 'angularfire2/firestore';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

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
		private _hotkeysService: HotkeysService
		) {
		this._hotkeysService.add(new Hotkey('meta+enter', (event: KeyboardEvent): boolean => {

	        return false; // Prevent bubbling
	    }));
	}

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
		const newTodo = Object.assign({
			onBoard: true,
			complete: false,
			createdOn: Date.now(),
			lane: "todo",
			previousLane: "",
			startOn: Date.now(),
			timeSpentinProgress: 0,
			userId: this.authService.getUser().uid
		}, this.todo);

		this.todosCollection = this.afs.collection<Todo>('todos');
		this.todosCollection.add(newTodo);

		this.onSubmitted.emit(true);

		this.todo = <Todo>{};
	}

	hotkeys(event) {
	}

	ngOnInit() {

	}
}
