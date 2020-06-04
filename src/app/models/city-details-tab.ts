import { Type } from '@angular/core';
import { WeatherBaseComponent } from './../components/city-details/weather-base-component';

export class CityDetailsTab {
    name: string;
    component: Type<WeatherBaseComponent>;
}
