import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherUnit } from './../../models/weather';
import { DataService } from './../../services/data.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
    $currentUnit: Subscription;
    currentUnit: WeatherUnit;
    units = WeatherUnit;

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
        this.$currentUnit = this.dataService.currentUnit.subscribe(unit => {
            this.currentUnit = unit;
        });
    }

    changeUnit(newUnit: WeatherUnit): void {
        this.dataService.setUnit(newUnit);
        this.dataService.notifySettingsChange();
    }

    ngOnDestroy(): void {
        this.$currentUnit.unsubscribe();
    }
}
