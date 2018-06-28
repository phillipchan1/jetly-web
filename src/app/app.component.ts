import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
	selector: 'app-root',
	host: { '(window:keydown)': 'hotkeys($event)' },
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	loggedIn: boolean = false;
	public editingTodo: boolean = false;
	public modalActive: boolean = false;

	public activateModal() {
		this.modalActive = true;
	}

	public deactivateModal() {
		this.modalActive = false;
	}

	constructor(
		private router: Router,
		public afAuth: AngularFireAuth
	) {
		this.afAuth.authState.subscribe(res => {
			if (!res || !res.uid) {
				this.router.navigate(['/login']);
			} else {
				this.loggedIn = true;
			}
		});
	}

	hideEditTodo(event) {
		this.deactivateModal();

		var editTodo = document.querySelector('#global-add-edit-todo');

		if (event && editTodo.contains(event.target)) {
			this.editingTodo = true;
		} else {
			this.editingTodo = false;
		}
	}

	handleNewTodo() {
		this.editingTodo = true;
		this.activateModal();

		var editTodoName = <HTMLElement>document.querySelector('#global-add-edit-todo textarea.name');

		setTimeout(function() {
			editTodoName.focus();
		}, 100);
	}

	hotkeys(event) {
		var srcElementName = event.srcElement.nodeName;
		var ignoreInputs = ["INPUT", "TEXTAREA"];

		if (!ignoreInputs.includes(srcElementName)) {
			if (event.key === 'c') {
				this.handleNewTodo();
			}
		}

		if (event.key === 'Escape') {
			this.hideEditTodo(null);
		}
	}
}