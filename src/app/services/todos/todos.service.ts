import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
	AngularFirestore,
	AngularFirestoreDocument,
	AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Todo } from '../../services/todos/todos.model';
import * as firebase from 'firebase/app';

@Injectable()
export class TodosService {
	constructor(private afs: AngularFirestore) {
		this.todosCollection = this.afs.collection<Todo>('todos');
	}

	private todosCollection: AngularFirestoreCollection<Todo>;

	addTodo(todo: Todo) {
		this.todosCollection = this.afs.collection<Todo>('todos');
		this.todosCollection.add(todo);
	}

	completeTodo(docId):void {
		this.updateTodo(docId, {
			complete: true,
			completedOn: Date.now()
		})
	}

	updateTodo(docId, newData): void {
		this.todosCollection.doc(docId).update(newData);
	}

	updateTodos(docIds, newData): void {
		const batch = firebase.firestore().batch();

		docIds.forEach(function(docId) {
			batch.update(firebase.firestore().doc(`todos/${docId}`), newData);
		});

		batch.commit();
	}
}
