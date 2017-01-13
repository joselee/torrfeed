import { Injectable } from '@angular/core';

@Injectable()
export class DateHelperService {
    constructor() { }

    getStartOfDate(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    isToday(date: Date) {
        let startOfToday = this.getStartOfDate(new Date());
        return date >= startOfToday;
    }

    isYesterday(date: Date) {
        let startOfToday = this.getStartOfDate(new Date());
        let startOfYesterday = this.getStartOfDate(new Date());
        startOfYesterday.setDate(startOfYesterday.getDate() - 1);
        return date >= startOfYesterday && date <= startOfToday;
    }
}