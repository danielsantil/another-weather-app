import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WeatherUnit } from './../models/weather';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private unitsSubject = new BehaviorSubject<WeatherUnit>(WeatherUnit.C);
    public currentUnit = this.unitsSubject.asObservable();

    private settingsChangedSubject = new Subject();
    public settingsChanged = this.settingsChangedSubject.asObservable();

    getUnit(): WeatherUnit {
        return this.unitsSubject.value;
    }
    setUnit(unit: WeatherUnit): void {
        this.unitsSubject.next(unit);
    }

    notifySettingsChange(): void {
        this.settingsChangedSubject.next();
    }
}
