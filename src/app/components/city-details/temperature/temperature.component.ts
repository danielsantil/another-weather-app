import { Component } from '@angular/core';
import { WeatherModel } from './../../../models/weather';
import { WeatherBaseComponent } from './../weather-base-component';

@Component({
    templateUrl: './temperature.component.html'
})
export class TemperatureComponent implements WeatherBaseComponent{
    model: WeatherModel;
}
