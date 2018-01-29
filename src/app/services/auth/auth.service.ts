import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
	public loggedIn: boolean = true;
	public userID: string;

	constructor(public afAuth: AngularFireAuth) {
		this.afAuth.authState.subscribe(res => {
			if (res && res.uid) {
				this.loggedIn = true;
			} else {
				this.loggedIn = false;
			}
		});
	}

	private userKey = Object.keys(window.localStorage).filter(it =>
		it.startsWith('firebase:authUser')
	)[0];

	getUser() {
		return this.userKey
			? JSON.parse(localStorage.getItem(this.userKey))
			: undefined;
	}

	getUserId() {
		return this.userID;
	}

	setUser(id: string) {
		this.userID = id;
	}
}
