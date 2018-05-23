import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public afAuth: AngularFireAuth,
		public authService: AuthService
	) {}

	login() {
		this.afAuth.auth
			.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
			.then(user => {
				this.authService.setUser(user.user.uid);
			})
			.then(() => {
				this.router.navigate(['/board']);
			});
	}
	logout() {
		this.afAuth.auth.signOut().then(() => {
			this.router.navigate(['/login']);
		});
	}

	ngOnInit() {
		if (this.authService.loggedIn) {
			this.router.navigate(['/board']);
		}
	}
}
