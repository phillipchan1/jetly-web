import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ClickOutsideModule } from 'ng4-click-outside';

@Component({
	selector: 'app-root',
	host: { '(window:keydown)': 'hotkeys($event)' },
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	loggedIn: boolean = false;
	public editingTodo: boolean = false;

	constructor(private router: Router, public afAuth: AngularFireAuth) {
		this.afAuth.authState.subscribe(res => {
			if (!res || !res.uid) {
				this.router.navigate(['/login']);
			} else {
				this.loggedIn = true;
			}
		});
	}

	hideEditTodo(event) {
		var editTodo = document.querySelector('#global-add-edit-todo');

		if (event && editTodo.contains(event.target)) {
			this.editingTodo = true;
		} else {
			this.editingTodo = false;
		}
	}

	handleNewTodo() {
		this.editingTodo = true;

		var editTodoName = document.querySelector('#global-add-edit-todo .name');
		console.log(editTodoName);

		setTimeout(function() {
			editTodoName.focus();
		}, 100);
	}

	hotkeys(event) {
		// if (event.key === 'a') {
		// 	this.router.navigate(['/review']);
		// }
		// if (event.key === 's') {
		// 	this.router.navigate(['/board']);
		// }
		// if (event.key === 'd') {
		// 	this.router.navigate(['/plan']);
		// }
		if (event.key === 'c') {
			this.handleNewTodo();
		}

		if (event.key === 'Escape') {
			this.hideEditTodo();
		}
	}
}