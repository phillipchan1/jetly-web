import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'plus-button',
	templateUrl: './plus.component.html',
	styleUrls: ['./plus.component.scss']
})
export class PlusComponent implements OnInit {
	@Output() onClick = new EventEmitter<object>();

	constructor() { }

	handleClick(event) {
		this.onClick.emit(event);
	}

	ngOnInit() {
	}

}
