import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef
} from '@angular/core';

@Component({
	selector: 'input-text',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
	private _textValue: string;
	@Input() textValue: string;
	@Input() clearOnSubmit: boolean;
	@Input() placeholderText: string = 'something random';
	@Output() onEnter = new EventEmitter<string>();
	@Output() onBlur = new EventEmitter<boolean>();
	@ViewChild('todoInput') _inputElement: ElementRef;

	reset() {
		this.textValue = '';
	}

	inputBlur(event) {
		this.onBlur.emit(true);
	}

	valueChange(event) {
		this._textValue = event.target.value;
	}

	submit(event) {
		this.onEnter.emit(this._textValue);

		if (this.clearOnSubmit) {
			this.reset();
		}
	}

	constructor() {}

	ngOnInit() {}

	ngAfterViewInit(): void {
		this._inputElement.nativeElement.focus();
	}
}
