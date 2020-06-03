import { DataService } from './../../services/data.service';
import { Unit } from './../../models/weather';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
    $currentUnit: Subscription;
    currentUnit: Unit;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.$currentUnit = this.dataService.currentUnit.subscribe(unit => {
            this.currentUnit = unit;
        });
    }

    changeUnit(newUnit: Unit): void {
        this.dataService.setUnit(newUnit);
    }

    ngOnDestroy(): void {
        this.$currentUnit.unsubscribe();
    }
}