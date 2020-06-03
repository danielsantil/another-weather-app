import { WeatherService } from './services/weather.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unit, WeatherModel } from './models/weather';
import { DataService } from './services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  weatherInfo: WeatherModel;

  // Subscriptions
  $currentUnit: Subscription;
  currentUnit: Unit;

  constructor(private weather: WeatherService, private dataService: DataService) { }

  ngOnInit(): void {
    this.weather.getById('2172797').then(res => {
      this.weatherInfo = res;
    });

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
