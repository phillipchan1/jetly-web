import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public afAuth: AngularFireAuth
	) {}

	logout() {
		this.afAuth.auth.signOut().then(() => {
			location.reload();
		});
	}

	ngOnInit() {}
}
