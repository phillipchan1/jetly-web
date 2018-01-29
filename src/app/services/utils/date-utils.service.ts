import { Injectable } from '@angular/core';

@Injectable()
export class DateUtilsService {
	constructor() {}

	private getTodaysUnixRange() {
		const start = new Date();
		start.setHours(0, 0, 0, 0);

		const end = new Date();
		end.setHours(23, 59, 59, 999);

		return [
			start.getTime() - start.getTimezoneOffset() * 60 * 1000,
			end.getTime() - end.getTimezoneOffset() * 60 * 1000
		];
	}

	private getYesterdaysUnixRange() {
		const start = new Date();
		start.setDate(start.getDate() - 1);
		start.setHours(0, 0, 0, 0);

		const end = new Date();
		end.setDate(start.getDate());
		end.setHours(23, 59, 59, 999);

		return [
			start.getTime() - start.getTimezoneOffset() * 60 * 1000,
			end.getTime() - end.getTimezoneOffset() * 60 * 1000
		];
	}

	public createNowUTC() {
		const now = new Date();

		return new Date(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate(),
			now.getUTCHours(),
			now.getUTCMinutes(),
			now.getUTCSeconds()
		);
	}

	public isToday(timestamp: number) {
		const todayRange = this.getTodaysUnixRange();

		return timestamp > todayRange[0] && timestamp < todayRange[1];
	}

	public isYesterday(timestamp: number) {
		const yesterdayRange = this.getYesterdaysUnixRange();

		return timestamp > yesterdayRange[0] && timestamp < yesterdayRange[1];
	}
}
