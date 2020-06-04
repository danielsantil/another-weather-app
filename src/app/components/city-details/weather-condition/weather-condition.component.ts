import { Component } from '@angular/core';
import { WeatherModel } from './../../../models/weather';
import { WeatherBaseComponent } from './../weather-base-component';

@Component({
    templateUrl: './weather-condition.component.html'
})
export class WeatherConditionComponent implements WeatherBaseComponent{
    model: WeatherModel;
}
