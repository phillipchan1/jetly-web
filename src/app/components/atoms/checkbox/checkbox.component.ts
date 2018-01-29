import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
	private _status: boolean;
	@Input() status: boolean;
	@Output() onStatusChange = new EventEmitter<boolean>();

	constructor() {}

	updateStatus(event) {
		if (event.target.checked) {
			this._status = true;
		} else {
			this._status = false;
		}

		this.onStatusChange.emit(this._status);
	}
}
