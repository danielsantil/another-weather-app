import { Unit } from './../models/weather';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private unitsSubject = new BehaviorSubject<Unit>(Unit.K);
    public currentUnit = this.unitsSubject.asObservable();

    setUnit(unit: Unit): void {
        this.unitsSubject.next(unit);
    }
}
