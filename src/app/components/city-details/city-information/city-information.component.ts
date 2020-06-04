import { Component } from '@angular/core';
import { WeatherModel } from './../../../models/weather';
import { WeatherBaseComponent } from './../weather-base-component';

@Component({
    templateUrl: './city-information.component.html'
})
export class CityInformationComponent implements WeatherBaseComponent{
    model: WeatherModel;
}
