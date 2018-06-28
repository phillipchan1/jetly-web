import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../../services/todos/todos.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Todo } from '../../../services/todos/todos.model';
import { AuthService } from '../../../services/auth/auth.service';
import { PositionUtilsService } from '../../../services/utils/position-utils.service';
import { DragulaService } from 'ng2-dragula';

@Component({
	selector: 'app-board',
	host: { '(window:keydown)': 'hotkeys($event)' },
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
	todos: Observable<any[]>;
	addingNewTodo: boolean = false;
	editingTodo: boolean = false
	public editTodoBottom: string;;
	public editTodoLeft: string;
	public editTodoRight: string;
	public editTodoTop: string;
	JSON;
	todoFilter = { lane: 'todo', complete: false };
	inProgressFilter = { lane: 'in progress', complete: false };
	onHoldFilter = { lane: 'on hold', complete: false };
	completeFilter = { lane: 'complete', complete: true };
	currentlyEditingThisTodo: Todo;

	constructor(
		public db: AngularFirestore,
		public authService: AuthService,
		public positionUtils: PositionUtilsService,
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

		dragulaService.over.subscribe((value) => {
		  	let container = value[2];

		  	container.parentNode.classList.add('todo-hovering-over');
	  	});

		dragulaService.out.subscribe((value) => {
			let container = value[2];

		  	container.parentNode.classList.remove('todo-hovering-over');
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

	private showEditTodo(todo, event) {
		var currentTodo = JSON.parse(event.target.getAttribute('data-todo')) || JSON.parse(event.target.parentNode.getAttribute('data-todo'));

		var element;

		var padding = 10;

		if (event.target.nodeName === "SPAN") {
			element = event.target.parentNode;
		} else {
			element = event.target;
		}

		var elementRect = element.getBoundingClientRect();

		if (this.positionUtils.closerToLeftorRightofScreen(event.target) === 'left') {
			this.editTodoLeft = `${elementRect.left + elementRect.width + padding}px`;
			this.editTodoRight = 'auto';
		} else {
			this.editTodoLeft = 'auto';
			this.editTodoRight = `${window.innerWidth - elementRect.left + padding}px`;
		}

		if (this.positionUtils.closerToToporBottomofScreen(element) === 'top') {
			this.editTodoTop = `${elementRect.top}px`;
			this.editTodoBottom = 'auto';
		} else {
			this.editTodoBottom = `${window.innerHeight - elementRect.top - elementRect.height}px`;
			this.editTodoTop = 'auto';
		}

		this.editingTodo = true;
		this.currentlyEditingThisTodo = currentTodo;
	}

	public hideEditTodo(event) {
		var editTodo = document.querySelector('.edit-todo-container');

		if (!editTodo.contains(event.target)) {
			this.editingTodo = false;
		}
	}

	public onDeleteTodo() {
		this.editingTodo = false;
	}

	private hideNewTodo() {
		this.addingNewTodo = false;
	}

	hotkeys(event) {
	    if (event.key === 'Escape') {
	    	this.editingTodo = false;
	    	this.hideNewTodo();
	    }
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