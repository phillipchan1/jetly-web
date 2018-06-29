import { Injectable } from '@angular/core';

@Injectable()
export class KeyboardUtilsService {

	constructor() { }

	private ignoreInputs = ["INPUT", "TEXTAREA"];

	public shouldIgnore(srcElementName):boolean {
		return this.ignoreInputs.includes(srcElementName);
	}

}
