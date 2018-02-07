import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  host: { '(window:keydown)': 'hotkeys($event)' },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn: boolean = false;

  constructor(private router: Router, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(res => {
      if (!res || !res.uid) {
        this.router.navigate(['/login']);
      } else {
        this.loggedIn = true;
      }
    });
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
  }
}
