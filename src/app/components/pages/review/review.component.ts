import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../../services/todos/todos.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Todo } from '../../../services/todos/todos.model';
import { AuthService } from '../../../services/auth/auth.service';
import { DateUtilsService } from '../../../services/utils/date-utils.service';

@Component({
	selector: 'app-review',
	templateUrl: './review.component.html',
	styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
	todos: Observable<any[]>;

	constructor(
		public db: AngularFirestore,
		public authService: AuthService,
		public dateUtils: DateUtilsService,
		public todoService: TodosService
	) {
		this.todos = db
			.collection('todos', ref =>
				ref
					.where('userId', '==', authService.getUser().uid)
					.where('complete', '==', true)
			)
			.snapshotChanges()
			.map(actions => {
				return actions.map(action => {
					const data = action.payload.doc.data() as Todo;
					const id = action.payload.doc.id;
					return { id, ...data };
				});
			});
	}

	ngOnInit() {}
}
