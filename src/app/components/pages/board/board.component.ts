import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../../services/todos/todos.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Todo } from '../../../services/todos/todos.model';
import { AuthService } from '../../../services/auth/auth.service';
import { DragulaService } from 'ng2-dragula';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	todos: Observable<any[]>;
	addingNewTodo: boolean = false;
	editingTodo: boolean = false;
	public editTodoLeft: string;
	public editTodoTop: string;
	JSON;
	todoFilter = { lane: 'todo', complete: false };
	inProgressFilter = { lane: 'in progress', complete: false };
	onHoldFilter = { lane: 'on hold', complete: false };
	completeFilter = { lane: 'complete', complete: true };
	currentlyEditingThisTodo = {};

	constructor(
		public db: AngularFirestore,
		public authService: AuthService,
		public todoService: TodosService,
		private dragulaService: DragulaService
	) {
		dragulaService.drop.subscribe(value => {
			const currentTodo = value[1];
			const currentTodoId = JSON.parse(
				currentTodo.getAttribute('data-todo')
			).id;
			const previousLane = value[3].getAttribute('data-lane');
			const newLane = value[2].getAttribute('data-lane');

			if (newLane === 'complete') {
				this.todoService.completeTodo(currentTodoId);

				this.todoService.updateTodo(currentTodoId, {
					previousLane: previousLane,
					lane: newLane,
				});
			} else {
				this.todoService.updateTodo(currentTodoId, {
					previousLane: previousLane,
					lane: newLane,
					complete: false,
					completedOn: ''
				});
			}
		});
	}

	archiveComplete(event) {
		let todosToArchive = [];
		const todosToArchiveNodes = document.querySelectorAll(
			'.complete.lane .todo-container todo'
		);

		for (let p = 0; p < todosToArchiveNodes.length; p++) {
			todosToArchive.push(
				JSON.parse(todosToArchiveNodes[p].getAttribute('data-todo')).id
			);
		}

		this.todoService.updateTodos(todosToArchive, {
			onBoard: false
		});
	}

	private calculateLeft(el) {
		return `${el.offsetLeft + el.offsetWidth}px`;
	}

	private calculateTop(el) {
		const inTheMiddleHeight = el.offsetTop + el.offsetHeight / 4;

		return `${inTheMiddleHeight}px`;
	}

	private showEditTodo(todo, event) {
		var currentTodo = JSON.parse(event.target.getAttribute('data-todo')) || JSON.parse(event.target.parentNode.getAttribute('data-todo'));
		console.log(currentTodo);

		var readableCreatedOnDateObject = new Date(currentTodo.createdOn);
		currentTodo.displayCreatedOnDate = `${readableCreatedOnDateObject.getMonth() + 1}/${readableCreatedOnDateObject.getDate()}/${readableCreatedOnDateObject.getFullYear()}`;

		this.editTodoLeft = this.calculateLeft(event.target);
		this.editTodoTop = this.calculateTop(event.target);
		this.editingTodo = true;
		this.currentlyEditingThisTodo = currentTodo
	}

	private hideEditTodo(event) {
		var editTodo = document.querySelector('.edit-todo-container');

		if (!editTodo.contains(event.target)) {
			this.editingTodo = false;
		}
	}

	private hideNewTodo(event) {
		this.addingNewTodo = false;
	}

	showNewTodoInput() {
		this.addingNewTodo = true;
	}

	ngOnInit() {
		this.todos = this.db
			.collection('todos', ref =>
				ref
					.where(
						'userId',
						'==',
						this.authService.getUserId() ||
							this.authService.getUser().uid
					)
					.where('onBoard', '==', true)
			)
			.snapshotChanges()
			.map(actions => {
				return actions.map(action => {
					const data = action.payload.doc.data() as Todo;
					const id = action.payload.doc.id;
					return { id, ...data };
				});
			});

		this.JSON = JSON;
	}
}
